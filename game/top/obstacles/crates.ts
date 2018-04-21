import * as ex from "excalibur";
import Resources from "../../resources";
import { Obstacle, Props } from "./obstacle";

export class Crates extends Obstacle {
  constructor(props: ex.IActorArgs & Props) {
    super({ ...props, width: 16, height: 16 * 3 });
  }

  onInitialize(engine: ex.Engine) {
    super.onInitialize(engine);

    const crateArgs = {
      anchor: ex.Vector.Zero,
      width: 16,
      height: 16
    };

    const crate1 = new ex.Actor({ ...crateArgs, y: -16 });
    const crate2 = new ex.Actor({ ...crateArgs, y: -32 });
    const crate3 = new ex.Actor({ ...crateArgs, y: -48 });
    crate1.addDrawing(Resources.txCrate);
    crate2.addDrawing(Resources.txCrate);
    crate3.addDrawing(Resources.txCrate);

    this.add(crate1);
    this.add(crate2);
    this.add(crate3);
  }
}
