import * as ex from "excalibur";
import { TopSubscene } from "./top/top";
import { BottomSubscene } from "./bottom/bottom";
export class ScnMain extends ex.Scene {
    onInitialize(engine) {
        this._top = new TopSubscene(this.engine);
        this._bottom = new BottomSubscene();
    }
    onActivate() {
        this._top.setup(this);
        this._bottom.setup(this);
    }
    onDeactivate() {
        this._top.teardown(this);
        this._bottom.teardown(this);
    }
}
//# sourceMappingURL=scnMain.js.map