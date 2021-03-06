import * as ex from "excalibur";
import { newgame, getStats } from "./session";
import { GameOverReason } from "./stats";
import Resources from "./resources";
import { Analytics } from "./analytics";
import Config from "./config";

const gameOverMessages = {
  [GameOverReason.daydream]: "You gave up on your dreams",
  [GameOverReason.minigame]: "Your boss caught you daydreaming.",
  [GameOverReason.workdayComplete]: "Congratulations! You're free to dream",
  [GameOverReason.debug]: "DEBUG: You program dreams"
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
    // this.bgActor.addDrawing(Resources.txGameOverScreen);
    this.add(this.bgActor);

    let bgSpriteSheet = new ex.SpriteSheet(
      Resources.txGameOverScreen,
      2,
      1,
      800,
      800
    );

    this.bgActor.addDrawing("defeat", bgSpriteSheet.getSprite(0));
    this.bgActor.addDrawing("victory", bgSpriteSheet.getSprite(1));

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
    if (gameOverReason != GameOverReason.workdayComplete) {
      this.bgActor.setDrawing("defeat");
      this.hoursDoneLabel.text =
        "You made it " + 2 * miniGamesCompleted + " hours through your workday";
      // this.hoursDoneLabel.visible = true;
    } else {
      this.hoursDoneLabel.text = "";
      this.bgActor.setDrawing("victory");
    }

    let stats = getStats();

    let commit = document.getElementById("commit-number").innerText;

    Analytics.publish({
      commit: commit,
      seed: Config.Rand.seed,
      started: stats.start,
      duration: stats.duration,
      reason: stats.gameOverReason,
      miniGamesCompleted: stats.miniGamesCompleted,
      date: new Date().toISOString()
    });
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
