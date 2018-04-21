import * as ex from "excalibur";
import { Top } from "./top/top";

export class ScnMain extends ex.Scene {
  constructor(engine: ex.Engine) {
    super(engine);
    let top = new Top(engine);

    top.setup(this);
  }

  public onInitialize(engine: ex.Engine) {}
}
