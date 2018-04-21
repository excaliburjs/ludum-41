import * as ex from "excalibur";
import { Props } from "./obstacles/obstacle";
import { TopSubscene } from "./top";
import Config from '../config';

export class Platform extends ex.Actor {
  private topSubscene: TopSubscene;

  constructor({ x, y, speed, topSubscene, ...props }: ex.IActorArgs & Props) {
    super({
      x,
      y,
      height: Config.Platform.Height,
      width: Config.Platform.Width,
      color: ex.Color.Green,
      collisionType: ex.CollisionType.Fixed,
      vel: new ex.Vector(speed, 0)
      // Anchor to bottom since
      // we will be placing it on a "floor"
    });

    this.topSubscene = topSubscene;
  }

  onInitialize(engine: ex.Engine) {
    this.on("exitviewport", this.onExitViewPort(engine));
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
