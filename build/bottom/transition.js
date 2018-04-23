import * as ex from "excalibur";
export class Transition extends ex.Actor {
    constructor(scene) {
        super({
            x: scene.engine.drawWidth + scene.engine.drawWidth,
            y: scene.engine.halfDrawHeight,
            width: scene.engine.drawWidth,
            height: scene.engine.halfDrawHeight,
            anchor: new ex.Vector(0.5, 0),
            color: ex.Color.Red
        });
    }
    onInitialize() {
        this.z = 98;
    }
    start() {
        this.pos = new ex.Vector(this.scene.engine.halfDrawWidth, this.scene.engine.halfDrawHeight);
        this.actions.delay(3000);
    }
    transitionIn() {
        return this.actions
            .easeTo(this.scene.engine.halfDrawWidth, this.y, 1000, ex.EasingFunctions.EaseInOutQuad)
            .asPromise();
    }
    transitionOut() {
        return this.actions
            .easeTo(-this.scene.engine.drawWidth, this.y, 1000, ex.EasingFunctions.EaseInOutQuad)
            .callMethod(() => {
            this.x = this.scene.engine.drawWidth + this.scene.engine.drawWidth;
            this.y = this.scene.engine.halfDrawHeight;
        })
            .asPromise();
    }
}
//# sourceMappingURL=transition.js.map