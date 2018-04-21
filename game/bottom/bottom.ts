import * as ex from "excalibur";
import { CollatingGame } from "./collating-game/collatingGame";

export class BottomSubscene {
  constructor() {}

  public setup(scene: ex.Scene) {
    this.startPaperCollating(scene);
  }

  public teardown(scene: ex.Scene) {}

  public startPaperCollating(scene) {
    // TODO load the paper collating mini-game
    var collatingGame = new CollatingGame(scene);
    collatingGame.show();
  }

  public startTalkToCoworker() {
    // TODO load the coworker conversation mini-game
  }

  public startPrinter() {
    // TODO start the printer mini-game
  }
}
