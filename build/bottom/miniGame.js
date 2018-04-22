export class MiniGame {
    constructor(scene, bottomSubscene) {
        this.miniGameActors = [];
        this.scene = scene;
        this.bottomSubscene = bottomSubscene;
    }
    start() {
        this.miniGameActors = [];
        if (!this._isSetUp) {
            this.setup(); //initialize actors and add them to the miniGameActors collection.
            for (let i = 0; i < this.miniGameActors.length; i++) {
                this.scene.add(this.miniGameActors[i]);
            }
        }
        this._isSetUp = true;
    }
    cleanUp() {
        for (let i = 0; i < this.miniGameActors.length; i++) {
            this.scene.remove(this.miniGameActors[i]);
            this._isSetUp = false;
        }
        this.miniGameActors = [];
    }
    onSucceed() {
        this.cleanUp();
        this.bottomSubscene.startRandomMiniGame();
    }
    onFail() {
        this.cleanUp();
        //lose the game
    }
}
//# sourceMappingURL=miniGame.js.map