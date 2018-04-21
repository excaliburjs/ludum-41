import * as ex from "excalibur";
import Config from "../config";
import Resources from "../resources";

export class Background extends ex.Actor {
  static Slices = 16;
  static SliceWidth = 50;
  private drawSlices: ex.Sprite[] = new Array(Background.Slices * 2);
  private slices: ex.Sprite[] = new Array(Background.Slices);

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
      vel: new ex.Vector(Config.Floor.Speed, 0)
    });
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
  }

  onPostUpdate(engine: ex.Engine, delta: number) {
    if (this.x <= -engine.halfCanvasWidth) {
      ex.Logger.getInstance().info("Reset background");
      this.x = 0;
      this.drawSlices = this.drawSlices.slice(16);
      this.fillSlices(16, Background.Slices * 2);
    }
  }

  onPostDraw(ctx: CanvasRenderingContext2D, delta: number) {
    for (let i = 0; i < this.drawSlices.length; i++) {
      const slice = this.drawSlices[i];
      const x = Math.floor(this.x + i * Background.SliceWidth);
      slice && slice.draw(ctx, x, this.y);
    }
  }

  fillSlices(start, to) {
    for (let i = start; i < to; i++) {
      this.drawSlices[i] = this.slices[
        Config.Rand.integer(0, this.slices.length - 1)
      ];
    }
    ex.Logger.getInstance().info("Picked bg slices", this.drawSlices.length);
  }
}
