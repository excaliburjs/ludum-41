/// <reference path="../../lib/excalibur-dist/excalibur.d.ts" />

class Floor extends ex.Actor {
  /**
   *
   */
  constructor(engine: ex.Engine) {
    super({
      x: 0,
      y: engine.drawHeight / 2, // position half down the screen
      width: engine.drawWidth * 2, // twice as wide as the screen
      height: 20,
      color: ex.Color.Red,
      anchor: new ex.Vector(0, 0.5),
      vel: new ex.Vector(Config.FloorSpeed, 0) // speed of the runner
    });
  }

  onPostUpdate(_engine: ex.Engine, delta: number) {
    if (this.x < -this.getWidth() / 2) {
      console.log("floor reset!");
      this.x = 0;
    }
  }
}
