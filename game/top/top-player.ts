import * as ex from "excalibur";
import Config from "../config";
import Resources from "../resources";
import { GameOverReason } from "../stats";
import { gameover } from "../session";
import { BaseCamera } from "excalibur";
import soundManager from "../soundManager";

export class TopPlayer extends ex.Actor {
  public canJump: boolean = false;
  public correcting: boolean = false;

  private dustEmitter: ex.ParticleEmitter;
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

    this.on("precollision", this.handleCollision.bind(this));
  }

  onInitialize(engine: ex.Engine) {
    this.z = 5;
    let ss = new ex.SpriteSheet({
      image: Resources.txBike,
      rows: 1,
      columns: 2,
      spHeight: 50,
      spWidth: 60
    });

    let anim = ss.getAnimationForAll(engine, 100);
    this.addDrawing("default", anim);

    // dust
    const dustEmitter = new ex.ParticleEmitter(
      -(this.getWidth() / 2) - 8,
      Config.TopPlayer.Height / 2 - 2,
      5,
      2
    );
    dustEmitter.isEmitting = false;
    dustEmitter.emitterType = ex.EmitterType.Rectangle;
    dustEmitter.radius = 5;
    dustEmitter.minVel = 327;
    dustEmitter.maxVel = 296;
    dustEmitter.minAngle = 3.5;
    dustEmitter.maxAngle = 3.4;
    dustEmitter.emitRate = 118;
    dustEmitter.opacity = 0.5;
    dustEmitter.fadeFlag = true;
    dustEmitter.particleLife = 200;
    dustEmitter.maxSize = 1;
    dustEmitter.minSize = 1;
    dustEmitter.startSize = 0;
    dustEmitter.endSize = 0;
    dustEmitter.acceleration = new ex.Vector(-69, 484);
    dustEmitter.beginColor = ex.Color.Transparent;
    dustEmitter.endColor = ex.Color.Black;

    this.add(dustEmitter);
    this.dustEmitter = dustEmitter;

    this.on("exitviewport", this.onExitViewport);
  }

  onExitViewport = () => {
    gameover(this.engine, GameOverReason.daydream);
  };

  // le-sigh workaround for odd collision tunneling issue
  handleCollision(event: ex.PreCollisionEvent) {
    if (event.side === ex.Side.Bottom) {
      this.canJump = true;
    }
  }

  jump() {
    if (this.canJump) {
      this.vel = new ex.Vector(this.vel.x, -400);
      this.acc = new ex.Vector(0, 800);
      soundManager.playJumpSound();
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
      this.dustEmitter.isEmitting = false;
    } else {
      this.dustEmitter.isEmitting = true;
      if (this.x < engine.drawWidth * Config.TopPlayer.StartingXPercent) {
        this.vel.x =
          engine.drawWidth * Config.TopPlayer.StartingXPercent - this.x;
      } else if (
        this.x >
        engine.drawWidth * Config.TopPlayer.StartingXPercent
      ) {
        this.vel.x =
          engine.drawWidth * Config.TopPlayer.StartingXPercent - this.x;
      }

      this.rotation = 0;
    }

    if (this.y > engine.halfDrawHeight) {
      this.y = engine.halfDrawHeight - 40;
    }
  }
}
