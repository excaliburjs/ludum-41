import * as ex from "excalibur";
import resources from "./resources";
export class Overlay extends ex.Actor {
    constructor(engine, scene) {
        super({
            x: 0,
            y: 0,
            width: engine.drawWidth,
            height: engine.drawHeight,
            anchor: ex.Vector.Zero.clone()
        });
        scene.add(this);
        this.z = 99;
        // this.addDrawing(resources.txOverlay);
        let spriteSheet = new ex.SpriteSheet(resources.txOverlay, 10, 1, 800, 800);
        for (let i = 0; i < 10; i++) {
            this.addDrawing("head_" + i, spriteSheet.getSprite(i));
        }
    }
}
//# sourceMappingURL=overlay.js.map