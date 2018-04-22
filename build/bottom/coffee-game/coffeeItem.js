import * as ex from "excalibur";
export class CoffeeItem extends ex.Actor {
    constructor(args) {
        super(args);
        this._isHighlighted = false;
    }
    onInitialize(engine) {
        this.on("pointerup", event => {
            if (this._isHighlighted) {
                // TODO play foley sound effect
                // emit an event for the correct item being clicked
                this.scene.emit("coffeeClick");
                this.unHighlight();
            }
            else {
                // TODO play error sound?
            }
        });
    }
    highlight() {
        this._originalColor = this.color;
        this.color = ex.Color.Green;
        this.setDrawing("highlight");
        this._isHighlighted = true;
    }
    unHighlight() {
        this.color = this._originalColor;
        this.setDrawing("default");
        this._isHighlighted = false;
    }
}
//# sourceMappingURL=coffeeItem.js.map