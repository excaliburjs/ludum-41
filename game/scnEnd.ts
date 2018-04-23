import * as ex from "excalibur";
import { newgame, getStats } from "./session";
import { GameOverReason } from "./stats";
import Resources from "./resources";

const gameOverMessages = {
  [GameOverReason.daydream]: "You gave up on your dreams. Game over.",
  [GameOverReason.minigame]: "Your boss caught you daydreaming. Game over.",
  [GameOverReason.debug]: "You program dreams."
};

export class ScnEnd extends ex.Scene {
  gameOverLabel: ex.Label;
  hoursDoneLabel: ex.Label;
  bgActor: ex.Actor;

  onInitialize(engine: ex.Engine) {
    this.gameOverLabel = new ex.Label({
      x: this.engine.drawWidth / 2,
      y: this.engine.drawHeight / 2,
      textAlign: ex.TextAlign.Center,
      fontSize: 36,
      fontFamily: "Arial",
      color: ex.Color.White
    });

    this.hoursDoneLabel = new ex.Label({
      x: this.engine.drawWidth / 2,
      y: this.engine.drawHeight / 2 + 50,
      textAlign: ex.TextAlign.Center,
      fontSize: 36,
      fontFamily: "Arial",
      color: ex.Color.White
    });

    this.bgActor = new ex.Actor(engine.drawWidth / 2, engine.drawHeight / 2);
    this.bgActor.addDrawing(Resources.txGameOverScreen);
    this.add(this.bgActor);

    this.add(this.gameOverLabel);
    this.add(this.hoursDoneLabel);

    const resetButton = new ResetButton({
      x: engine.drawWidth / 2,
      y: engine.drawHeight / 2 + 100
    });

    this.add(resetButton);
  }

  onActivate() {
    const { gameOverReason } = getStats();
    const { miniGamesCompleted } = getStats();
    this.gameOverLabel.text = gameOverMessages[gameOverReason];
    this.hoursDoneLabel.text =
      "You made it " + 2 * miniGamesCompleted + " hours through your workday";
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

  reset(game: ex.Engine) {
    newgame(game);
  }
}
