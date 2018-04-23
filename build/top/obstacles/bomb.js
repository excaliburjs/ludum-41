import * as ex from "excalibur";
import Resources from "../../resources";
import { Obstacle } from "./obstacle";
export class Bomb extends Obstacle {
    constructor(props) {
        super(Object.assign({}, props, { width: 32, height: 32 }));
    }
    onInitialize(engine) {
        super.onInitialize(engine);
        let ss = new ex.SpriteSheet({
            image: Resources.txBombSpriteSheet,
            rows: 1,
            columns: 2,
            spWidth: 18,
            spHeight: 18
        });
        let anim = ss.getAnimationForAll(engine, 300);
        this.addDrawing("default", anim);
        this.currentDrawing.scale.setTo(2, 2);
    }
}
//# sourceMappingURL=bomb.js.map