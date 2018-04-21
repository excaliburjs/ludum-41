import * as ex from "excalibur";
import { Top } from "./top/top";
export class ScnMain extends ex.Scene {
    constructor(engine) {
        super(engine);
        let top = new Top(engine);
        top.setup(this);
    }
    onInitialize(engine) { }
}
//# sourceMappingURL=scnMain.js.map