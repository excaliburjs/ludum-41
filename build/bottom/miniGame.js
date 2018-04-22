export class MiniGame {
    constructor(scene, bottomSubscene) {
        this.miniGameActors = [];
        this.scene = scene;
        this.bottomSubscene = bottomSubscene;
    }
    start() {
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
        console.log("Actors:", this.scene.actors.length);
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