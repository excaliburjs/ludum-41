import * as ex from "excalibur";
import { TopSubscene } from "./top";
import Config from "../config";

interface Props {
  x: number;
  y: number;
  speed: number;
}

export class Platform extends ex.Actor {
  constructor({ x, y, speed, ...props }: ex.IActorArgs & Props) {
    super({
      x,
      y,
      height: Config.Platform.Height,
      width: Config.Platform.Width,
      color: ex.Color.Gray,
      collisionType: ex.CollisionType.Fixed,
      vel: new ex.Vector(speed, 0)
      // Anchor to bottom since
      // we will be placing it on a "floor"
    });
  }

  onInitialize(engine: ex.Engine) {
    this.on("exitviewport", this.onExitViewPort(engine));
    this.scene.on("deactivate", () => this.kill());
  }

  onExitViewPort = (engine: ex.Engine) => (e: ex.ExitViewPortEvent) => {
    // When obstacle passes out of view to the left, NOT from the right ;)
    // it should be killed
    if (e.target.x < engine.getWorldBounds().left) {
      ex.Logger.getInstance().debug("Obstacle exited stage left", e.target);
      e.target.kill();
    }
  };
}
