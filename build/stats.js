export var GameOverReason;
(function (GameOverReason) {
    GameOverReason[GameOverReason["daydream"] = 0] = "daydream";
    GameOverReason[GameOverReason["minigame"] = 1] = "minigame";
    GameOverReason[GameOverReason["workdayComplete"] = 2] = "workdayComplete";
    GameOverReason[GameOverReason["debug"] = 3] = "debug";
})(GameOverReason || (GameOverReason = {}));
export class Stats {
    constructor() {
        this.startTime = Date.now();
        this.miniGamesCompleted = 0;
    }
    get duration() {
        return this.startTime - Date.now();
    }
}
//# sourceMappingURL=stats.js.map