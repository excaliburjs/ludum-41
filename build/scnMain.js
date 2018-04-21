import * as ex from "excalibur";
import { Top } from "./top/top";
import { Bottom } from "./bottom/bottom";
export class ScnMain extends ex.Scene {
    constructor(engine) {
        super(engine);
        let top = new Top(engine);
        let bottom = new Bottom();
        top.setup(this);
        bottom.setup(this);
    }
    onInitialize(engine) { }
}
//# sourceMappingURL=scnMain.js.map