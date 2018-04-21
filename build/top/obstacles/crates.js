import * as ex from "excalibur";
import Resources from "../../resources";
import { Obstacle } from "./obstacle";
export class Crates extends Obstacle {
    constructor(props) {
        super(Object.assign({}, props, { width: 16, height: 16 * 3 }));
    }
    onInitialize(engine) {
        super.onInitialize(engine);
        const crateArgs = {
            width: 16,
            height: 16
        };
        const crate1 = new ex.Actor(Object.assign({}, crateArgs, { y: 0 }));
        const crate2 = new ex.Actor(Object.assign({}, crateArgs, { y: -16 }));
        const crate3 = new ex.Actor(Object.assign({}, crateArgs, { y: -32 }));
        crate1.addDrawing(Resources.txCrate);
        crate2.addDrawing(Resources.txCrate);
        crate3.addDrawing(Resources.txCrate);
        this.add(crate1);
        this.add(crate2);
        this.add(crate3);
    }
}
//# sourceMappingURL=crates.js.map