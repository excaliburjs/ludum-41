import * as ex from "excalibur";
import Config from "../config";
import Resources from "../resources";

export class TopPlayer extends ex.Actor {
  public canJump: boolean = false;
  public correcting: boolean = false;
  constructor(private engine: ex.Engine) {
    super({
      x: engine.drawWidth * Config.TopPlayer.StartingXPercent,
      y: engine.drawHeight / 4,
      acc: new ex.Vector(0, 800),
      width: Config.TopPlayer.Width,
      height: Config.TopPlayer.Height,
      color: ex.Color.Blue,
      collisionType: ex.CollisionType.Active
    });

    engine.input.pointers.primary.on("down", this.handleInput.bind(this));

    this.on("precollision", this.handleCollision.bind(this));
  }

  onInitialize() {
    this.z = 5;
    this.addDrawing(Resources.txBike);
  }

  // le-sigh workaround for odd collision tunneling issue
  handleCollision(event: ex.PreCollisionEvent) {
    if (event.side === ex.Side.Bottom) {
      this.canJump = true;
    }
  }

  handleInput(event: ex.Input.PointerEvent) {
    ex.Logger.getInstance().debug("event:", event);
    if (event.worldPos.y < this.engine.halfDrawHeight) {
      this.jump();
    }
  }

  jump() {
    if (this.canJump) {
      this.vel = this.vel.add(new ex.Vector(0, -400));
      this.acc = new ex.Vector(0, 800);
      this.canJump = false;
    }
  }

  onPostUpdate(engine: ex.Engine, delta: number) {
    if (!this.canJump) {
      let virtualVel = new ex.Vector(
        -Config.Floor.Speed,
        ex.Util.clamp(this.vel.y, -50, 50)
      );
      this.rotation = virtualVel.toAngle();
    } else {
      if (this.x < engine.drawWidth * Config.TopPlayer.StartingXPercent) {
        this.vel.x =
          (engine.drawWidth * Config.TopPlayer.StartingXPercent - this.x) / 2;
      } else if (
        this.x >
        engine.drawWidth * Config.TopPlayer.StartingXPercent
      ) {
        this.x = engine.drawWidth * Config.TopPlayer.StartingXPercent;
      }

      this.rotation = 0;
    }
  }
}
