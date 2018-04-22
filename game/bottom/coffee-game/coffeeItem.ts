import * as ex from "excalibur";
import { GameEvent } from "excalibur";

export class CoffeeItem extends ex.Actor {
  private _originalColor: ex.Color;
  private _isHighlighted: boolean = false;

  constructor(args: ex.IActorArgs) {
    super(args);
  }

  public onInitialize(engine: ex.Engine) {
    this.on("pointerup", event => {
      if (this._isHighlighted) {
        // TODO play foley sound effect

        // emit an event for the correct item being clicked
        this.scene.emit("coffeeClick");

        this.unHighlight();
      } else {
        // TODO play error sound?
      }
    });
  }

  public highlight() {
    this._originalColor = this.color;
    this.color = ex.Color.Green;
    this.setDrawing("highlight");
    this._isHighlighted = true;
  }

  public unHighlight() {
    this.color = this._originalColor;
    this.setDrawing("default");
    this._isHighlighted = false;
  }
}
