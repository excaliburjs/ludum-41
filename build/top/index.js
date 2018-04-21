import { Floor } from "./floor";
export class Top {
    constructor(_engine) {
        this._engine = _engine;
        this.floor = new Floor(_engine);
    }
    setup(scene) {
        scene.add(this.floor);
    }
}
//# sourceMappingURL=index.js.map