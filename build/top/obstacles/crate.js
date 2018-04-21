import Resources from "../../resources";
import { Obstacle } from "./obstacle";
export class Crate extends Obstacle {
    constructor(props) {
        super(Object.assign({}, props, { width: 16, height: 16 }));
    }
    onInitialize(engine) {
        super.onInitialize(engine);
        this.addDrawing(Resources.txCrate);
    }
}
//# sourceMappingURL=crate.js.map