import { Floor } from "./floor";
import { TopPlayer } from "./top-player";
import { TopHealth } from "./health";
export class Top {
    constructor(_engine) {
        this._engine = _engine;
        this.floor = new Floor(_engine);
        this.player = new TopPlayer(_engine);
        this.health = new TopHealth(_engine);
    }
    setup(scene) {
        scene.add(this.floor);
        scene.add(this.player);
        scene.add(this.health);
    }
}
//# sourceMappingURL=top.js.map