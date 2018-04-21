import { Scene } from "excalibur";
import { Top } from "./top";
export class ScnMain extends Scene {
    constructor(engine) {
        super(engine);
        let top = new Top(engine);
        top.setup(this);
    }
    onInitialize(engine) { }
}
//# sourceMappingURL=scnMain.js.map