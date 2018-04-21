import * as ex from "excalibur";
import { CollatingGame } from "./collating-game/collatingGame";
import { CoffeeGame } from "./coffee-game/coffeeGame";
import Config from "../config";

export class BottomSubscene {
  constructor() {}

  public setup(scene: ex.Scene) {
    this.startPaperCollating(scene);
  }

  public teardown(scene: ex.Scene) {}

  public startPaperCollating(scene) {
    // TODO load the paper collating mini-game
    var collatingGame = new CollatingGame(
      scene,
      Config.MiniGames.Collating.NumberOfWinsToProceed
    );
    collatingGame.show();
  }

  public startCoffeeGame(scene) {
    let coffeeGame = new CoffeeGame(scene);
    coffeeGame.show();
  }
}
