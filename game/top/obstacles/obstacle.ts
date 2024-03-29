import * as ex from "excalibur";
import Config from "../../config";
import Resources from "../../resources";
import { TopSubscene } from "../top";
import { TopPlayer } from "../top-player";

export interface Props {
  speed: number;
  onHitPlayer: () => void;
}

export abstract class Obstacle extends ex.Actor {
  private onHitPlayer: () => void;

  /**
   *
   */
  constructor({ x, y, speed, onHitPlayer, ...props }: ex.IActorArgs & Props) {
    super({
      x,
      y,
      collisionType: ex.CollisionType.Passive,
      vel: new ex.Vector(speed, 0),
      ...props
    });

    this.onHitPlayer = onHitPlayer;

    // Anchor to bottom since
    // we will be placing it on a "floor"
    this.anchor.setTo(0.5, 1);
  }

  onInitialize(engine: ex.Engine) {
    this.on("exitviewport", this.onExitViewPort(engine));
    this.on("collisionstart", this.onCollision);
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

  onCollision = (event: ex.CollisionStartEvent) => {
    if (event.other instanceof TopPlayer) {
      this.onHitPlayer();
      event.other.actions.blink(200, 100, 5);
      this.collisionType = ex.CollisionType.PreventCollision;
      this.acc = new ex.Vector(0, 900);
      this.rx = Config.Rand.floating(Math.PI, Math.PI * 2);
      this.vel = new ex.Vector(
        Config.Rand.floating(50, 100),
        Config.Rand.floating(-400, -800)
      );
    }
  };
}
