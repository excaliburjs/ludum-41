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
            color: ex.Color.Black,
            anchor: new ex.Vector(0, 0.25),
            collisionType: ex.CollisionType.Fixed
        });
    }
}
//# sourceMappingURL=floor.js.map