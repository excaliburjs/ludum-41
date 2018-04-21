(function (ex) {
    'use strict';

    const rand = new ex.Random(12345678910);
    var Config = {
        AnalyticsEndpoint: "https://ludum41stats.azurewebsites.net/api/HttpLudum41StatsTrigger?code=eumYNdyRh0yfBAk0NLrfrKkXxtGsX7/Jo5gAcYo13k3GcVFNBdG3yw==",
        GameWidth: 800,
        GameHeight: 600,
        // Top Floor config
        Floor: {
            Speed: -100,
            Height: 20
        },
        // Top Player config
        TopPlayer: {
            Width: 30,
            Height: 50
        },
        /**
         * Obstacles spawn interval
         */
        ObstacleSpawnMinInterval: 1000,
        ObstacleSpawnMaxInterval: 3000,
        Rand: rand
    };

    class Obstacle extends ex.Actor {
        /**
         *
         */
        constructor({ height, x, y, speed }) {
            super({
                x,
                y,
                height,
                width: 10,
                color: ex.Color.Yellow,
                vel: new ex.Vector(speed, 0)
            });
            this.onExitViewPort = (engine) => (e) => {
                // When obstacle passes out of view to the left,
                // it should be killed
                if (e.target.x < engine.getWorldBounds().left) {
                    ex.Logger.getInstance().info("Obstacle exited stage left", e.target);
                    e.target.kill();
                }
            };
            // Anchor to bottom since
            // we will be placing it on a "floor"
            this.anchor.setTo(0.5, 1);
        }
        onInitialize(engine) {
            this.on("exitviewport", this.onExitViewPort(engine));
        }
    }
    Obstacle.minHeight = 10;
    Obstacle.maxHeight = 50;

    class Floor extends ex.Actor {
        /**
         *
         */
        constructor(engine) {
            super({
                x: 0,
                y: engine.drawHeight / 2,
                width: engine.drawWidth * 2,
                height: Config.Floor.Height,
                color: ex.Color.Red,
                anchor: new ex.Vector(0, 0.5),
                collisionType: ex.CollisionType.Fixed
            });
        }
        onInitialize(engine) {
            this._spawnTimer = new ex.Timer(() => this.spawnObstacle(engine), 1000, true);
            this.scene.add(this._spawnTimer);
        }
        onPostUpdate(_engine, delta) {
            if (this.x < -this.getWidth() / 2) {
                ex.Logger.getInstance().info("floor reset!");
                this.x = 0;
            }
        }
        spawnObstacle(engine) {
            const x = engine.drawWidth + 200;
            const height = Config.Rand.integer(Obstacle.minHeight, Obstacle.maxHeight);
            const ob = new Obstacle({
                height,
                x,
                y: this.getTop(),
                speed: Config.Floor.Speed
            });
            ex.Logger.getInstance().info("Spawned obstacle", ob);
            this.scene.add(ob);
            const newInterval = Config.Rand.integer(Config.ObstacleSpawnMinInterval, Config.ObstacleSpawnMaxInterval);
            this._spawnTimer.reset(newInterval);
        }
    }

    class TopPlayer extends ex.Actor {
        constructor(engine) {
            super({
                x: engine.drawWidth / 4,
                y: engine.drawHeight / 4,
                acc: new ex.Vector(0, 800),
                width: Config.TopPlayer.Width,
                height: Config.TopPlayer.Height,
                color: ex.Color.Blue,
                collisionType: ex.CollisionType.Active
            });
            engine.input.pointers.primary.on("down", this.handleInput.bind(this));
            engine.input.keyboard.on("press", this.handleInput.bind(this));
            this.on("precollision", this.handleCollision.bind(this));
        }
        // le-sigh workaround for odd collision tunneling issue
        handleCollision(event) {
            this.vel.y = 0;
            this.acc = ex.Vector.Zero.clone();
        }
        handleInput(event) {
            console.log("event:", event);
            this.jump();
        }
        jump() {
            this.vel = this.vel.add(new ex.Vector(0, -400));
            this.acc = new ex.Vector(0, 800);
        }
        onPostUpdate(engine, delta) {
            // todo postupdate
        }
    }

    class Top {
        constructor(_engine) {
            this._engine = _engine;
            this.floor = new Floor(_engine);
            this.player = new TopPlayer(_engine);
        }
        setup(scene) {
            scene.add(this.floor);
            scene.add(this.player);
        }
    }

    class Bottom {
        constructor() { }
        setup(scene) { }
        startPaperCollating() {
            // TODO load the paper collating mini-game
        }
        startTalkToCoworker() {
            // TODO load the coworker conversation mini-game
        }
        startPrinter() {
            // TODO start the printer mini-game
        }
    }

    class ScnMain extends ex.Scene {
        constructor(engine) {
            super(engine);
            let top = new Top(engine);
            let bottom = new Bottom();
            top.setup(this);
            bottom.setup(this);
        }
        onInitialize(engine) { }
    }

    var Resources = {
        sampleImg: new ex.Texture("game/assets/img/sample-image.png"),
        sampleSnd: new ex.Sound("game/assets/snd/sample-sound.wav")
    };

    var game = new ex.Engine({
        width: Config.GameWidth,
        height: Config.GameHeight
    });
    // Physics
    // ex.Physics.collisionResolutionStrategy = ex.CollisionResolutionStrategy.RigidBody
    // ex.Physics.allowRigidBodyRotation = false;
    ex.Physics.checkForFastBodies = true;
    // create an asset loader
    var loader = new ex.Loader();
    // queue resources for loading
    for (var r in Resources) {
        loader.addResource(Resources[r]);
    }
    var scnMain = new ScnMain(game);
    game.addScene("main", scnMain);
    // uncomment loader after adding resources
    game.start(loader).then(() => {
        game.goToScene("main");
        // TODO: Turn on analytics
        //   Analytics.publish({
        //      commit: 'test',
        //      seed: -1,
        //      started: -1,
        //      date: 'test'
        //   });
    });
    // TODO remove /////////////////////////////////////////////////////
    var gamePaused = false;
    game.input.keyboard.on("down", (keyDown) => {
        switch (keyDown.key) {
            case ex.Input.Keys.P:
                if (gamePaused) {
                    game.start();
                    ex.Logger.getInstance().info("game resumed");
                }
                else {
                    game.stop();
                    ex.Logger.getInstance().info("game paused");
                }
                gamePaused = !gamePaused;
                break;
            case ex.Input.Keys.Semicolon:
                game.isDebug = !game.isDebug;
                break;
        }
    });
    ////////////////////////////////////////////////////////////////////

}(ex));
//# sourceMappingURL=bundle.js.map
