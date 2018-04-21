(function (excalibur) {
    'use strict';

    var Config = {
        AnalyticsEndpoint: "https://ludum41stats.azurewebsites.net/api/HttpLudum41StatsTrigger?code=eumYNdyRh0yfBAk0NLrfrKkXxtGsX7/Jo5gAcYo13k3GcVFNBdG3yw==",
        // Floor config
        FloorSpeed: -100
    };

    class Floor extends excalibur.Actor {
        /**
         *
         */
        constructor(engine) {
            super({
                x: 0,
                y: engine.drawHeight / 2,
                width: engine.drawWidth * 2,
                height: 20,
                color: excalibur.Color.Red,
                anchor: new excalibur.Vector(0, 0.5),
                vel: new excalibur.Vector(Config.FloorSpeed, 0) // speed of the runner
            });
        }
        onPostUpdate(_engine, delta) {
            if (this.x < -this.getWidth() / 2) {
                console.log("floor reset!");
                this.x = 0;
            }
        }
    }

    class Top {
        constructor(_engine) {
            this._engine = _engine;
            this.floor = new Floor(_engine);
        }
        setup(scene) {
            scene.add(this.floor);
        }
    }

    class ScnMain extends excalibur.Scene {
        constructor(engine) {
            super(engine);
            let top = new Top(engine);
            top.setup(this);
        }
        onInitialize(engine) { }
    }

    var Resources = {
        sampleImg: new excalibur.Texture("game/assets/img/sample-image.png"),
        sampleSnd: new excalibur.Sound("game/assets/snd/sample-sound.wav")
    };

    var game = new excalibur.Engine({
        width: 800,
        height: 600
    });
    // create an asset loader
    var loader = new excalibur.Loader();
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
            case excalibur.Input.Keys.P:
                if (gamePaused) {
                    game.start();
                    excalibur.Logger.getInstance().info("game resumed");
                }
                else {
                    game.stop();
                    excalibur.Logger.getInstance().info("game paused");
                }
                gamePaused = !gamePaused;
                break;
            case excalibur.Input.Keys.Semicolon:
                game.isDebug = !game.isDebug;
                break;
        }
    });
    ////////////////////////////////////////////////////////////////////

}(ex));
//# sourceMappingURL=bundle.js.map
