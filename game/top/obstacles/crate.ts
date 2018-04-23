import * as ex from "excalibur";
import Resources from "../../resources";
import { Obstacle, Props } from "./obstacle";

export class Crate extends Obstacle {
  constructor(props: ex.IActorArgs & Props) {
    super({ ...props, width: 32, height: 32 });
  }

  onInitialize(engine: ex.Engine) {
    super.onInitialize(engine);

    let ss = new ex.SpriteSheet({
      image: Resources.txBombSpriteSheet,
      rows: 1,
      columns: 2,
      spWidth: 18,
      spHeight: 18
    });
    let anim = ss.getAnimationForAll(engine, 300);
    this.addDrawing("default", anim);
    this.currentDrawing.scale.setTo(2, 2);
  }
}
