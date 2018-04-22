import * as ex from "excalibur";
import resources from "./resources";

export class Overlay extends ex.Actor {
  constructor(engine: ex.Engine, scene: ex.Scene) {
    super({
      x: 0,
      y: 0,
      width: engine.drawWidth,
      height: engine.drawHeight,
      anchor: ex.Vector.Zero.clone()
    });

    scene.add(this);

    this.z = 99;

    this.addDrawing(resources.txOverlay);
  }
}
