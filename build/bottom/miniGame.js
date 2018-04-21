export class MiniGame {
    show() {
        if (!this._isSetUp) {
            this.setup(); //initialize actors and add them to the scene and miniGameActors collection.
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