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
    AnalyticsEndpoint: "https://ludum41stats.azurewebsites.net/api/HttpLudum41StatsTrigger?code=eumYNdyRh0yfBAk0NLrfrKkXxtGsX7/Jo5gAcYo13k3GcVFNBdG3yw=="
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
var ScnMain = /** @class */ (function (_super) {
    __extends(ScnMain, _super);
    function ScnMain() {
        return _super !== null && _super.apply(this, arguments) || this;
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
//# sourceMappingURL=game.js.map