import * as ex from "excalibur";
import Resources from "../../resources";
import { Obstacle, Props } from "./obstacle";

export class Crate extends Obstacle {
  constructor(props: ex.IActorArgs & Props) {
    super({ ...props, width: 16, height: 16 });
  }

  onInitialize(engine: ex.Engine) {
    super.onInitialize(engine);

    this.addDrawing(Resources.txCrate);
  }
}
