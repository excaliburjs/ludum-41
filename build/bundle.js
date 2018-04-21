(function (ex) {
    'use strict';

    var Config = {
        AnalyticsEndpoint: "https://ludum41stats.azurewebsites.net/api/HttpLudum41StatsTrigger?code=eumYNdyRh0yfBAk0NLrfrKkXxtGsX7/Jo5gAcYo13k3GcVFNBdG3yw==",
        // Top Floor config
        Floor: {
            Speed: -100,
            Height: 20
        },
        // Top Player config
        TopPlayer: {
            Width: 30,
            Height: 50
        }
    };

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
                collisionType: ex.CollisionType.Fixed,
                vel: new ex.Vector(Config.Floor.Speed, 0) // speed of the runner
            });
        }
        onPostUpdate(_engine, delta) {
            if (this.x < -this.getWidth() / 2) {
                console.log("floor reset!");
                this.x = 0;
            }
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
            console.log(this.vel);
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

    class ScnMain extends ex.Scene {
        constructor(engine) {
            super(engine);
            let top = new Top(engine);
            top.setup(this);
        }
        onInitialize(engine) { }
    }

    var Resources = {
        sampleImg: new ex.Texture("game/assets/img/sample-image.png"),
        sampleSnd: new ex.Sound("game/assets/snd/sample-sound.wav")
    };

    var game = new ex.Engine({
        width: 800,
        height: 600
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
