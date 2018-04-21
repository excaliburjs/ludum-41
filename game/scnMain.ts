import * as ex from "excalibur";
import { Top } from "./top/top";
import { Bottom } from "./bottom/bottom";

export class ScnMain extends ex.Scene {
  constructor(engine: ex.Engine) {
    super(engine);
    let top = new Top(engine);
    let bottom = new Bottom();

    top.setup(this);
    bottom.setup(this);
  }

  public onInitialize(engine: ex.Engine) {}
}
