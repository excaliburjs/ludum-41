import * as ex from "excalibur";
import resources from "../resources";

export class CountDown extends ex.Actor {
  public sprite: ex.Sprite;
  public maxTime: number = 100;
  public timeRemaining: number = 0;
  constructor(engine: ex.Engine) {
    super({
      x: 70,
      y: engine.halfDrawHeight + 60,
      width: 40,
      height: 40
      // color: ex.Color.Red
    });
  }

  onInitialize() {
    this.z = 100;
    this.sprite = resources.txTimerBg.asSprite();
    this.sprite.anchor = ex.Vector.Half.clone();
  }

  onPostDraw(ctx: CanvasRenderingContext2D, delta: number) {
    ctx.fillStyle = ex.Color.Black.toRGBA();
    ctx.beginPath();
    ctx.arc(0, 0, 24, 0, Math.PI * 2);
    ctx.closePath();
    ctx.fill();

    let percentLeft = this.timeRemaining / this.maxTime;
    let timeLeftRadian = Math.PI * 2 * percentLeft;

    ctx.fillStyle = ex.Color.Green.toRGBA();
    if (percentLeft < 0.75) {
      ctx.fillStyle = ex.Color.Yellow.toRGBA();
    }
    if (percentLeft < 0.5) {
      ctx.fillStyle = ex.Color.Orange.toRGBA();
    }
    if (percentLeft < 0.25) {
      ctx.fillStyle = ex.Color.Red.toRGBA();
    }

    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.arc(0, 0, 24, -Math.PI / 2, -Math.PI / 2 + timeLeftRadian, false);
    ctx.closePath();
    ctx.fill();
    this.sprite.draw(ctx, 0, 0);
  }
}
