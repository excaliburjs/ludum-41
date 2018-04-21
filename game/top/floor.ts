import * as ex from "excalibur";
import Config from "../config";

export class Floor extends ex.Actor {
  /**
   *
   */
  constructor(engine: ex.Engine) {
    super({
      x: 0,
      y: engine.drawHeight / 2, // position half down the screen
      width: engine.drawWidth * 2, // twice as wide as the screen
      height: Config.Floor.Height,
      color: ex.Color.Red,
      anchor: new ex.Vector(0, 0.5),
      collisionType: ex.CollisionType.Fixed,
      vel: new ex.Vector(Config.Floor.Speed, 0) // speed of the runner
    });
  }

  onPostUpdate(_engine: ex.Engine, delta: number) {
    if (this.x < -this.getWidth() / 2) {
      console.log("floor reset!");
      this.x = 0;
    }
  }
}
