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
    // this.addDrawing(resources.txCursor);
    let spriteSheet = new ex.SpriteSheet(resources.txCursor, 10, 1, 100, 400);
    for (let i = 0; i < 10; i++) {
      this.addDrawing("hand_" + i, spriteSheet.getSprite(i));
    }
  }

  onInitialize(engine: ex.Engine) {
    this.y = engine.drawHeight;
    this.z = 50;
    engine.input.pointers.primary.on("move", (evt: ex.Input.PointerEvent) => {
      let cursorPos = evt.worldPos.clone();
      if (
        cursorPos.y > engine.halfDrawHeight + 30 &&
        cursorPos.x < engine.drawWidth &&
        cursorPos.x > 0
      ) {
        this.actions.clearActions();
        this.pos = cursorPos;
        this.rotation = ex.EasingFunctions.Linear(
          evt.worldPos.x,
          -Math.PI / 4,
          Math.PI / 4,
          engine.drawWidth
        );
        this.rx = 0;
      } else {
        this.rx = -this.rotation;
        this.actions
          .easeTo(
            engine.halfDrawWidth,
            engine.drawHeight,
            1000,
            ex.EasingFunctions.EaseInOutQuad
          )
          .callMethod(() => {
            this.rotation = 0;
            this.rx = 0;
          });
      }
    });
  }
}
