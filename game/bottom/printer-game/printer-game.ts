import * as ex from "excalibur";
import { MiniGame } from "../miniGame";
import { Light } from "./light";
import Config from "../../config";
import { BottomSubscene } from "../bottom";

export class PrinterGame extends MiniGame {
  protected miniGameActors: ex.Actor[] = [];

  private _lights: Light[] = [];
  constructor(scene: ex.Scene, bottomSubscene: BottomSubscene) {
    super(scene, bottomSubscene);

    let startX = scene.engine.halfDrawWidth;
    let startY = scene.engine.halfDrawHeight + 100;

    for (
      let i = 0;
      i <
      Config.PrinterMiniGame.GridDimension *
        Config.PrinterMiniGame.GridDimension;
      i++
    ) {
      let x = i % Config.PrinterMiniGame.GridDimension;
      let y = Math.floor(i / Config.PrinterMiniGame.GridDimension);
      this._lights[i] = new Light({
        x: x * 30 + startX,
        y: y * 30 + startY,
        width: 20,
        height: 20,
        color: ex.Color.Violet.clone()
      });
    }

    let width = Config.PrinterMiniGame.GridDimension;
    for (let i = 0; i < this._lights.length; i++) {
      let light = this._lights[i];
      let x = i % Config.PrinterMiniGame.GridDimension;
      let y = Math.floor(i / Config.PrinterMiniGame.GridDimension);

      light.up = this.getLight(x, y - 1);
      light.down = this.getLight(x, y + 1);
      light.left = this.getLight(x - 1, y);
      light.right = this.getLight(x + 1, y);
    }

    let litLight = Config.Rand.pickOne(this._lights);
    litLight.lit = true;
  }

  getLight(x: number, y: number) {
    let index = x + y * Config.PrinterMiniGame.GridDimension;
    if (index < 0 || index > this._lights.length - 1) {
      return null;
    }
    if (
      x >= Config.PrinterMiniGame.GridDimension ||
      y >= Config.PrinterMiniGame.GridDimension
    ) {
      return null;
    }

    if (x < 0 || y < 0) {
      return null;
    }

    return this._lights[index];
  }

  public setup() {
    this.miniGameActors = this._lights;
  }

  public reset() {}
}
