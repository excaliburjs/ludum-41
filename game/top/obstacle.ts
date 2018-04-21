import * as ex from "excalibur";
import Config from "../config";

interface Props {
  height: number;
  x: number;
  y: number;
  speed: number;
}

export class Obstacle extends ex.Actor {
  static minHeight = 10;
  static maxHeight = 50;

  /**
   *
   */
  constructor({ height, x, y, speed }: Props) {
    super({
      x,
      y,
      height,
      width: 10,
      color: ex.Color.Yellow,
      vel: new ex.Vector(speed, 0)
    });

    // Anchor to bottom since
    // we will be placing it on a "floor"
    this.anchor.setTo(0.5, 1);
  }

  onInitialize(engine: ex.Engine) {
    this.on("exitviewport", this.onExitViewPort(engine));
  }

  onExitViewPort = (engine: ex.Engine) => (e: ex.ExitViewPortEvent) => {
    // When obstacle passes out of view to the left,
    // it should be killed
    if (e.target.x < engine.getWorldBounds().left) {
      ex.Logger.getInstance().debug("Obstacle exited stage left", e.target);
      e.target.kill();
    }
  };
}
