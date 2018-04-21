import * as ex from "excalibur";

export class ScnEnd extends ex.Scene {
  onInitialize(engine: ex.Engine) {
    const gameOverLabel = new ex.Label({
      x: this.engine.drawWidth / 2,
      y: this.engine.drawHeight / 2,
      text: "Your boss caught you daydreaming. Game over.",
      textAlign: ex.TextAlign.Center,
      fontSize: 36,
      fontFamily: "Arial"
    });

    this.add(gameOverLabel);

    const resetButton = new ResetButton({
      x: engine.drawWidth / 2,
      y: engine.drawHeight / 2 + 100
    });

    this.add(resetButton);
  }
}

class ResetButton extends ex.Actor {
  /**
   *
   */
  constructor({ x, y }: { x: number; y: number }) {
    super({ x, y, width: 100, height: 50, color: ex.Color.Blue });
  }

  onInitialize(engine: ex.Engine) {
    this.on("pointerup", () => this.reset(engine));

    const resetLabel = new ex.Label({
      x: 0,
      y: 15,
      text: "Restart",
      textAlign: ex.TextAlign.Center,
      fontSize: 24,
      color: ex.Color.White
    });

    this.add(resetLabel);
  }

  reset(engine: ex.Engine) {
    engine.goToScene("main");
  }
}
