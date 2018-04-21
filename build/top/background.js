import * as ex from "excalibur";
import Config from "../config";
import Resources from "../resources";
export class Background extends ex.Actor {
    /**
     *
     */
    constructor(engine) {
        super({
            x: 0,
            y: 0,
            width: engine.canvasWidth * 2,
            height: Config.Floor.Height,
            anchor: ex.Vector.Zero,
            vel: new ex.Vector(Config.Floor.Speed, 0)
        });
        this.drawSlices = new Array(Background.Slices * 2);
        this.slices = new Array(Background.Slices);
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
    onPostUpdate(engine, delta) {
        if (this.x <= -engine.halfDrawWidth) {
            ex.Logger.getInstance().info("Reset background");
            this.x = 0;
            this.drawSlices = this.drawSlices.slice(16);
            this.fillSlices(16, Background.Slices * 2);
        }
    }
    onPostDraw(ctx, delta) {
        for (let i = 0; i < this.drawSlices.length; i++) {
            const slice = this.drawSlices[i];
            const x = Math.floor(this.x + i * Background.SliceWidth);
            slice && slice.draw(ctx, x, this.y);
        }
    }
    fillSlices(start, to) {
        for (let i = start; i < to; i++) {
            this.drawSlices[i] = this.slices[Config.Rand.integer(0, this.slices.length - 1)];
        }
        ex.Logger.getInstance().info("Picked bg slices", this.drawSlices.length);
    }
}
Background.Slices = 16;
Background.SliceWidth = 50;
//# sourceMappingURL=background.js.map