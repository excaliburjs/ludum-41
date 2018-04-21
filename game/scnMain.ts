import { Engine, Scene } from "excalibur";
import { Top } from "./top";

export class ScnMain extends Scene {
  constructor(engine: Engine) {
    super(engine);
    let top = new Top(engine);

    top.setup(this);
  }

  public onInitialize(engine: ex.Engine) {}
}
