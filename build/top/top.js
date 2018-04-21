import { Floor } from "./floor";
import { TopPlayer } from "./top-player";
import { TopHealth } from "./health";
export class TopSubscene {
    constructor(_engine) {
        this._engine = _engine;
    }
    setup(scene) {
        this.floor = new Floor(this._engine, this);
        this.player = new TopPlayer(this._engine);
        this.healthMeter = new TopHealth(this._engine);
        scene.add(this.floor);
        scene.add(this.player);
        scene.add(this.healthMeter);
    }
    teardown(scene) {
        scene.remove(this.floor);
        scene.remove(this.player);
        scene.remove(this.healthMeter);
    }
}
//# sourceMappingURL=top.js.map