import * as ex from "excalibur";
import resources from "../resources";
export class Cursor extends ex.Actor {
    constructor() {
        super({
            x: 0,
            y: 0,
            scale: new ex.Vector(2, 2),
            anchor: new ex.Vector(0.5, 0),
            rotation: -Math.PI / 4
        });
        this.addDrawing(resources.txCursor);
    }
    onInitialize(engine) {
        this.y = engine.drawHeight;
        this.z = 50;
        engine.input.pointers.primary.on("move", (evt) => {
            let cursorPos = evt.worldPos.clone();
            if (cursorPos.y > engine.halfDrawHeight) {
                this.actions.clearActions();
                this.pos = cursorPos;
            }
            else {
                this.actions.easeTo(engine.halfDrawWidth, engine.drawHeight, 1000, ex.EasingFunctions.EaseInOutQuad);
            }
        });
    }
}
//# sourceMappingURL=cursor.js.map