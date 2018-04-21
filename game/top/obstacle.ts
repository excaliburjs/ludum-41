import * as ex from "excalibur";
import Config from "../config";
import { TopSubscene } from "./top";
import { TopPlayer } from "./top-player";

interface Props {
  height: number;
  x: number;
  y: number;
  speed: number;
  topSubscene: TopSubscene;
}

export class Obstacle extends ex.Actor {
  static minHeight = 10;
  static maxHeight = 50;

  private topSubscene: TopSubscene;
  /**
   *
   */
  constructor({ height, x, y, speed, topSubscene }: Props) {
    super({
      x,
      y,
      height,
      width: 10,
      color: ex.Color.Yellow,
      collisionType: ex.CollisionType.Passive,
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
