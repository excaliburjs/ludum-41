var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Analytics = /** @class */ (function () {
    function Analytics() {
    }
    Analytics.publish = function (payload) {
        return fetch(Config.AnalyticsEndpoint, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(payload)
        });
    };
    return Analytics;
}());
var Config = {
    // Analytics config
    AnalyticsEndpoint: "https://ludum41stats.azurewebsites.net/api/HttpLudum41StatsTrigger?code=eumYNdyRh0yfBAk0NLrfrKkXxtGsX7/Jo5gAcYo13k3GcVFNBdG3yw==",
    // Floor config
    FloorSpeed: -100
};
var Preferences = /** @class */ (function () {
    function Preferences() {
    }
    return Preferences;
}());
var Resources = {
    sampleImg: new ex.Texture("game/assets/img/sample-image.png"),
    sampleSnd: new ex.Sound("game/assets/snd/sample-sound.wav")
};
/// <reference path="../../lib/excalibur-dist/excalibur.d.ts" />
var Floor = /** @class */ (function (_super) {
    __extends(Floor, _super);
    /**
     *
     */
    function Floor(engine) {
        return _super.call(this, {
            x: 0,
            y: engine.drawHeight / 2,
            width: engine.drawWidth * 2,
            height: 20,
            color: ex.Color.Red,
            anchor: new ex.Vector(0, 0.5),
            vel: new ex.Vector(Config.FloorSpeed, 0) // speed of the runner
        }) || this;
    }
    Floor.prototype.onPostUpdate = function (_engine, delta) {
        if (this.x < -this.getWidth() / 2) {
            console.log("floor reset!");
            this.x = 0;
        }
    };
    return Floor;
}(ex.Actor));
/// <reference path="../../lib/excalibur-dist/excalibur.d.ts" />
/// <reference path="floor.ts" />
var Top = /** @class */ (function () {
    function Top(_engine) {
        this._engine = _engine;
        this.floor = new Floor(_engine);
    }
    Top.prototype.setup = function (scene) {
        scene.add(this.floor);
    };
    return Top;
}());
/// <reference path="top/top.ts" />
var ScnMain = /** @class */ (function (_super) {
    __extends(ScnMain, _super);
    function ScnMain(engine) {
        var _this = _super.call(this, engine) || this;
        var top = new Top(engine);
        top.setup(_this);
        return _this;
    }
    ScnMain.prototype.onInitialize = function (engine) { };
    return ScnMain;
}(ex.Scene));
var Stats = /** @class */ (function () {
    function Stats() {
    }
    return Stats;
}());
/// <reference path="../lib/excalibur-dist/excalibur.d.ts" />
/// <reference path="analytics.ts" />
/// <reference path="config.ts" />
/// <reference path="preferences.ts" />
/// <reference path="resources.ts" />
/// <reference path="scnMain.ts" />
/// <reference path="stats.ts" />
var game = new ex.Engine({
    width: 800,
    height: 600
});
// create an asset loader
var loader = new ex.Loader();
// queue resources for loading
for (var r in Resources) {
    loader.addResource(Resources[r]);
}
var scnMain = new ScnMain(game);
game.addScene("main", scnMain);
// uncomment loader after adding resources
game.start(loader).then(function () {
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
game.input.keyboard.on("down", function (keyDown) {
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
//# sourceMappingURL=game.js.map