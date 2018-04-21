import * as ex from "excalibur";
import Config from "../config";
import Resources from "../resources";

export class TopPlayer extends ex.Actor {
  constructor(engine: ex.Engine) {
    super({
      x: engine.drawWidth / 4,
      y: engine.drawHeight / 4,
      acc: new ex.Vector(0, 800),
      width: Config.TopPlayer.Width,
      height: Config.TopPlayer.Height,
      color: ex.Color.Blue,
      collisionType: ex.CollisionType.Active
    });

    engine.input.pointers.primary.on("down", this.handleInput.bind(this));
    engine.input.keyboard.on("press", this.handleInput.bind(this));

    this.on("precollision", this.handleCollision.bind(this));
  }

  onInitialize() {
    this.addDrawing(Resources.txBike);
  }

  // le-sigh workaround for odd collision tunneling issue
  handleCollision(event: ex.PreCollisionEvent) {
    this.vel.y = 0;
    this.acc = ex.Vector.Zero.clone();
  }

  handleInput(event: ex.Input.PointerEvent | ex.Input.KeyEvent) {
    ex.Logger.getInstance().debug("event:", event);
    this.jump();
  }

  jump() {
    this.vel = this.vel.add(new ex.Vector(0, -400));
    this.acc = new ex.Vector(0, 800);
  }

  onPostUpdate(engine: ex.Engine, delta: number) {
    // todo postupdate
  }
}
