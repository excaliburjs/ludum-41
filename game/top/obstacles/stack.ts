import * as ex from "excalibur";
import Resources from "../../resources";
import { Obstacle, Props } from "./obstacle";

export class Stack extends Obstacle {
  constructor(props: ex.IActorArgs & Props) {
    super({ ...props, width: 18 * 2, height: 18 * 2 * 2 });
  }

  onInitialize(engine: ex.Engine) {
    super.onInitialize(engine);
    let ss = new ex.SpriteSheet({
      image: Resources.txTNTSpriteSheet,
      rows: 1,
      columns: 2,
      spWidth: 18,
      spHeight: 18
    });
    let anim = ss.getAnimationForAll(engine, 300);

    let width = 18 * 2;
    let height = 18 * 2;

    const crateArgs = {
      anchor: ex.Vector.Zero,
      width: width,
      height: height
    };

    const crate1 = new ex.Actor({ ...crateArgs, y: -height });
    const crate2 = new ex.Actor({ ...crateArgs, y: -height * 2 });
    // const crate3 = new ex.Actor({ ...crateArgs, y: -96 });
    crate1.addDrawing("default", anim);
    crate1.currentDrawing.scale.setTo(2, 2);
    crate2.addDrawing("default", anim);
    crate2.currentDrawing.scale.setTo(2, 2);
    // crate3.addDrawing('default', anim);
    // crate3.currentDrawing.scale.setTo(2, 2);

    this.add(crate1);
    this.add(crate2);
    // this.add(crate3);
  }
}
