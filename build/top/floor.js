import { Actor, Color, Vector } from "excalibur";
import Config from "../config";
export class Floor extends Actor {
    /**
     *
     */
    constructor(engine) {
        super({
            x: 0,
            y: engine.drawHeight / 2,
            width: engine.drawWidth * 2,
            height: 20,
            color: Color.Red,
            anchor: new Vector(0, 0.5),
            vel: new Vector(Config.FloorSpeed, 0) // speed of the runner
        });
    }
    onPostUpdate(_engine, delta) {
        if (this.x < -this.getWidth() / 2) {
            console.log("floor reset!");
            this.x = 0;
        }
    }
}
//# sourceMappingURL=floor.js.map