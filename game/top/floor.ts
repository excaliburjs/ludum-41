import * as ex from "excalibur";
import Config from "../config";
import Obstacles from "./obstacles";
import { Platform } from "./platform";
import { TopSubscene } from "./top";

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
      color: ex.Color.Black,
      anchor: new ex.Vector(0, 0.5),
      collisionType: ex.CollisionType.Fixed
    });
  }
}
