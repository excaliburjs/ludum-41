import * as ex from "excalibur";
import Config from "../config";
import Resources from "../resources";

export class Background extends ex.Actor {
  static Slices = 16;
  static SliceWidth = 50;
  private drawSlices: ex.Sprite[] = new Array(Background.Slices * 2);
  private slices: ex.Sprite[] = new Array(Background.Slices);
  private _offscreen: HTMLCanvasElement;
  private _offscreenCtx: CanvasRenderingContext2D;

  /**
   *
   */
  constructor(engine: ex.Engine) {
    super({
      x: 0,
      y: 0,
      width: engine.canvasWidth * 2,
      height: Config.Floor.Height,
      anchor: ex.Vector.Zero,
      vel: new ex.Vector(Config.Floor.Speed * 1.5, 0)
    });
    this._offscreen = document.createElement("canvas");
    this._offscreen.width = Background.Slices * Background.SliceWidth * 2;
    this._offscreen.height = engine.drawHeight;
    this._offscreenCtx = this._offscreen.getContext("2d");
  }

  onInitialize() {
    const { txBackground } = Resources;

    for (let i = 0; i < Background.Slices; i++) {
      const x = i * Background.SliceWidth;

      this.slices[i] = new ex.Sprite({
        image: txBackground,
        x,
        y: 0,
        width: Background.SliceWidth,
        height: txBackground.height
      });
    }

    this.fillSlices(0, Background.Slices * 2);
    this.drawToOffscreen(0, Background.Slices * 2);
  }

  onPostUpdate(engine: ex.Engine, delta: number) {
    if (this.x <= -engine.halfDrawWidth) {
      // ex.Logger.getInstance().info("Reset background");
      this.x = 0;
      this.drawSlices = this.drawSlices.slice(16);
      this.drawToOffscreen(0, 16);
      this.fillSlices(16, Background.Slices * 2);
    }
  }

  onPostDraw(ctx: CanvasRenderingContext2D, delta: number) {
    ctx.drawImage(this._offscreen, this.x, this.y);
  }

  fillSlices(start, to) {
    for (let i = start; i < to; i++) {
      this.drawSlices[i] = this.slices[
        Config.Rand.integer(0, this.slices.length - 1)
      ];
    }
    this.drawToOffscreen(start, to);
    ex.Logger.getInstance().debug("Picked bg slices", this.drawSlices.length);
  }

  drawToOffscreen(start, to) {
    for (let i = start; i < to; i++) {
      const slice = this.drawSlices[i];
      const x = i * Background.SliceWidth;
      slice && slice.draw(this._offscreenCtx, x, 0);
    }
  }
}
