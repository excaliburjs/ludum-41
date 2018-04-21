import { Engine, Scene } from "excalibur";
import { Top } from "./top";
import { Bottom } from "./bottom/bottom";
import { BottomPlayer } from "./bottom/bottomPlayer";

export class ScnMain extends Scene {
  constructor(engine: Engine) {
    super(engine);
    let top = new Top(engine);
    let bottom = new Bottom();

    top.setup(this);
    bottom.setup(this);
  }

  public onInitialize(engine: ex.Engine) {}
}
