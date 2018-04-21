export class MiniGame {
    constructor(scene) {
        this.miniGameActors = [];
        this.scene = scene;
    }
    show() {
        if (!this._isSetUp) {
            this.setup(); //initialize actors and add them to the miniGameActors collection.
            for (let i = 0; i < this.miniGameActors.length; i++) {
                this.scene.add(this.miniGameActors[i]);
            }
        }
        this._isSetUp = true;
        this.reset();
        for (let i = 0; i < this.miniGameActors.length; i++) {
            this.miniGameActors[i].visible = true;
        }
    }
    hide() {
        for (let i = 0; i < this.miniGameActors.length; i++) {
            this.miniGameActors[i].visible = false;
        }
    }
    onSucceed() {
        this.hide();
    }
    onFail() {
        this.hide();
    }
}
//# sourceMappingURL=miniGame.js.map