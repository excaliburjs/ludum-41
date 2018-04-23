export var MiniGameType;
(function (MiniGameType) {
    MiniGameType[MiniGameType["Collate"] = 0] = "Collate";
    MiniGameType[MiniGameType["Coffee"] = 1] = "Coffee";
    MiniGameType[MiniGameType["Printer"] = 2] = "Printer";
})(MiniGameType || (MiniGameType = {}));
export class MiniGame {
    constructor(scene, bottomSubscene) {
        this.miniGameActors = [];
        this.active = false;
        this.scene = scene;
        this.bottomSubscene = bottomSubscene;
    }
    start() {
        this.setup(); //initialize actors and add them to the miniGameActors collection.
        this.active = true;
        for (let i = 0; i < this.miniGameActors.length; i++) {
            this.scene.add(this.miniGameActors[i]);
        }
    }
    cleanUp() {
        for (let i = 0; i < this.miniGameActors.length; i++) {
            this.miniGameActors[i].kill();
            this.scene.remove(this.miniGameActors[i]);
        }
        this.active = false;
    }
    onSucceed() {
        this.cleanUp();
        this.bottomSubscene.startRandomMiniGame();
    }
    onFail() {
        this.cleanUp();
    }
}
//# sourceMappingURL=miniGame.js.map