import * as ex from "excalibur";
import { TopSubscene } from "./top/top";
import { BottomSubscene } from "./bottom/bottom";

export class ScnMain extends ex.Scene {
  constructor(engine: ex.Engine) {
    super(engine);
    let top = new TopSubscene(engine);
    let bottom = new BottomSubscene();

    top.setup(this);
    bottom.setup(this);
  }

  public onInitialize(engine: ex.Engine) {}
}
