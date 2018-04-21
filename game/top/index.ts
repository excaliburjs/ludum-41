import { Engine, Scene } from "excalibur";
import { Floor } from "./floor";

export class Top {
  floor: Floor;
  constructor(private _engine: Engine) {
    this.floor = new Floor(_engine);
  }

  public setup(scene: Scene) {
    scene.add(this.floor);
  }
}
