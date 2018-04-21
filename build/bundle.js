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
            Height: 5
        },
        // Top Player config
        TopPlayer: {
            Width: 30,
            Height: 50
        },
        Health: {
            Pos: new ex.Vector(10, 10),
            Default: 10,
            FontSize: 50
        },
        /**
         * Obstacles spawn interval
         */
        ObstacleSpawnMinInterval: 1000,
        ObstacleSpawnMaxInterval: 3000,
        Rand: rand
    };

    var Resources = {
        sampleImg: new ex.Texture("game/assets/img/sample-image.png"),
        txBike: new ex.Texture("game/assets/img/bike.png"),
        txCrate: new ex.Texture("game/assets/img/crate.png"),
        sampleSnd: new ex.Sound("game/assets/snd/sample-sound.wav")
    };

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
            this.engine = engine;
            this.canJump = true;
            engine.input.pointers.primary.on("down", this.handleInput.bind(this));
            engine.input.keyboard.on("press", this.handleInput.bind(this));
            this.on("precollision", this.handleCollision.bind(this));
        }
        onInitialize() {
            this.addDrawing(Resources.txBike);
        }
        // le-sigh workaround for odd collision tunneling issue
        handleCollision(event) {
            this.vel.y = 0;
            this.acc = ex.Vector.Zero.clone();
            if (event.side === ex.Side.Bottom) {
                this.canJump = true;
            }
        }
        handleInput(event) {
            ex.Logger.getInstance().debug("event:", event);
            if (event instanceof ex.Input.PointerEvent) {
                if (event.worldY < this.engine.halfDrawHeight) {
                    this.jump();
                }
            }
            if (event instanceof ex.Input.KeyEvent &&
                event.key === ex.Input.Keys.Space) {
                this.jump();
            }
        }
        jump() {
            if (this.canJump) {
                this.vel = this.vel.add(new ex.Vector(0, -400));
                this.acc = new ex.Vector(0, 800);
                this.canJump = false;
            }
        }
        onPostUpdate(engine, delta) {
            // todo postupdate
        }
    }

    var __rest = (window && window.__rest) || function (s, e) {
        var t = {};
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
            t[p] = s[p];
        if (s != null && typeof Object.getOwnPropertySymbols === "function")
            for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
                t[p[i]] = s[p[i]];
        return t;
    };
    class Obstacle extends ex.Actor {
        /**
         *
         */
        constructor(_a) {
            var { x, y, speed, topSubscene } = _a, props = __rest(_a, ["x", "y", "speed", "topSubscene"]);
            super(Object.assign({ x,
                y, collisionType: ex.CollisionType.Passive, vel: new ex.Vector(speed, 0) }, props));
            this.onExitViewPort = (engine) => (e) => {
                // When obstacle passes out of view to the left,
                // it should be killed
                if (e.target.x < engine.getWorldBounds().left) {
                    ex.Logger.getInstance().debug("Obstacle exited stage left", e.target);
                    e.target.kill();
                }
            };
            this.onCollision = (event) => {
                if (event.other instanceof TopPlayer) {
                    this.topSubscene.healthMeter.health--;
                }
            };
            this.topSubscene = topSubscene;
            // Anchor to bottom since
            // we will be placing it on a "floor"
            this.anchor.setTo(0.5, 1);
        }
        onInitialize(engine) {
            this.on("exitviewport", this.onExitViewPort(engine));
            this.on("collisionstart", this.onCollision);
        }
    }

    class Crate extends Obstacle {
        constructor(props) {
            super(Object.assign({}, props, { width: 16, height: 16 }));
        }
        onInitialize(engine) {
            super.onInitialize(engine);
            this.addDrawing(Resources.txCrate);
        }
    }

    class Crates extends Obstacle {
        constructor(props) {
            super(Object.assign({}, props, { width: 16, height: 16 * 3 }));
        }
        onInitialize(engine) {
            super.onInitialize(engine);
            const crateArgs = {
                width: 16,
                height: 16
            };
            const crate1 = new ex.Actor(Object.assign({}, crateArgs, { y: 0 }));
            const crate2 = new ex.Actor(Object.assign({}, crateArgs, { y: -16 }));
            const crate3 = new ex.Actor(Object.assign({}, crateArgs, { y: -32 }));
            crate1.addDrawing(Resources.txCrate);
            crate2.addDrawing(Resources.txCrate);
            crate3.addDrawing(Resources.txCrate);
            this.add(crate1);
            this.add(crate2);
            this.add(crate3);
        }
    }

    const obstacles = [Crate, Crates];

    class Floor extends ex.Actor {
        /**
         *
         */
        constructor(engine, topSubscene) {
            super({
                x: 0,
                y: engine.drawHeight / 2,
                width: engine.drawWidth * 2,
                height: Config.Floor.Height,
                color: ex.Color.Black,
                anchor: new ex.Vector(0, 0.5),
                collisionType: ex.CollisionType.Fixed
            });
            this.topSubscene = topSubscene;
        }
        onInitialize(engine) {
            this._spawnTimer = new ex.Timer(() => this.spawnObstacle(engine), 1000, true);
            this.scene.add(this._spawnTimer);
        }
        spawnObstacle(engine) {
            const x = engine.drawWidth + 200;
            const ObstacleDef = obstacles[Config.Rand.integer(0, obstacles.length - 1)];
            const ob = new ObstacleDef({
                x,
                y: this.getTop(),
                speed: Config.Floor.Speed,
                topSubscene: this.topSubscene
            });
            ex.Logger.getInstance().debug("Spawned obstacle", ob);
            this.scene.add(ob);
            const newInterval = Config.Rand.integer(Config.ObstacleSpawnMinInterval, Config.ObstacleSpawnMaxInterval);
            this._spawnTimer.reset(newInterval);
        }
    }

    class TopHealth extends ex.Label {
        constructor(engine) {
            super({
                x: Config.Health.Pos.x,
                y: Config.Health.Pos.y + Config.Health.FontSize,
                fontSize: Config.Health.FontSize,
                fontUnit: ex.FontUnit.Px,
                anchor: ex.Vector.Zero.clone(),
                color: ex.Color.Red,
                text: Config.Health.Default.toString()
            });
            this.health = Config.Health.Default;
        }
        onPostUpdate(engine, delta) {
            if (this.health < 1) {
                // todo trigger endgame
            }
            this.text = this.health.toString();
        }
    }

    class TopSubscene {
        constructor(_engine) {
            this._engine = _engine;
            this.floor = new Floor(_engine, this);
            this.player = new TopPlayer(_engine);
            this.healthMeter = new TopHealth(_engine);
        }
        setup(scene) {
            scene.add(this.floor);
            scene.add(this.player);
            scene.add(this.healthMeter);
        }
    }

    class BottomSubscene {
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
            let top = new TopSubscene(engine);
            let bottom = new BottomSubscene();
            top.setup(this);
            bottom.setup(this);
        }
        onInitialize(engine) { }
    }

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
