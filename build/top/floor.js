import * as ex from "excalibur";
import Config from "../config";
export class Floor extends ex.Actor {
    /**
     *
     */
    constructor(engine) {
        super({
            x: 0,
            y: engine.drawHeight / 2,
            width: engine.drawWidth * 2,
            height: Config.Floor.Height,
            color: ex.Color.Red,
            anchor: new ex.Vector(0, 0.5),
            collisionType: ex.CollisionType.Fixed
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