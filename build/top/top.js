import { Floor } from "./floor";
import { TopPlayer } from "./top-player";
export class Top {
    constructor(_engine) {
        this._engine = _engine;
        this.floor = new Floor(_engine);
        this.player = new TopPlayer(_engine);
    }
    setup(scene) {
        scene.add(this.floor);
        scene.add(this.player);
    }
}
//# sourceMappingURL=top.js.map