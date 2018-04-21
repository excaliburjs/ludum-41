import * as ex from "excalibur";
import Config from "../../config";
import Resources from "../../resources";
import { TopSubscene } from "../top";
import { TopPlayer } from "../top-player";

export interface Props {
  speed: number;
  topSubscene: TopSubscene;
}

export abstract class Obstacle extends ex.Actor {
  private topSubscene: TopSubscene;

  /**
   *
   */
  constructor({ x, y, speed, topSubscene }: ex.IActorArgs & Props) {
    super({
      x,
      y,
      vel: new ex.Vector(speed, 0)
    });

    this.topSubscene = topSubscene;

    // Anchor to bottom since
    // we will be placing it on a "floor"
    this.anchor.setTo(0.5, 1);
  }

  onInitialize(engine: ex.Engine) {
    this.on("exitviewport", this.onExitViewPort(engine));
    this.on("collisionstart", this.onCollision);
  }

  onExitViewPort = (engine: ex.Engine) => (e: ex.ExitViewPortEvent) => {
    // When obstacle passes out of view to the left,
    // it should be killed
    if (e.target.x < engine.getWorldBounds().left) {
      ex.Logger.getInstance().debug("Obstacle exited stage left", e.target);
      e.target.kill();
    }
  };

  onCollision = (event: ex.CollisionStartEvent) => {
    if (event.other instanceof TopPlayer) {
      this.topSubscene.healthMeter.health--;
    }
  };
}
