import { Actor } from "excalibur";

export class BottomPlayer extends Actor {
  public onInitialize() {
    this._setUpDrawing();

    // TODO set up player movement (moves to mouse-click location)
  }

  private _setUpDrawing() {
    // TODO set up player sprites, randomly pick one if there are multiple spritesheets
  }
}
