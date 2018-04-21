import * as ex from "excalibur";
import { CollatingGame } from "./collating-game/collatingGame";
import { CoffeeGame } from "./coffee-game/coffeeGame";
import Config from "../config";
import { MiniGame } from "./miniGame";
import { PrinterGame } from "./printer-game/printer-game";

export class BottomSubscene {
  private miniGames: MiniGame[] = [];
  private collatingGame: CollatingGame;
  private coffeeGame: CoffeeGame;
  private printerGame: PrinterGame;

  constructor() {}

  public setup(scene: ex.Scene) {
    this.collatingGame = new CollatingGame(
      scene,
      Config.MiniGames.Collating.NumberOfWinsToProceed,
      this
    );
    this.miniGames.push(this.collatingGame);

    this.coffeeGame = new CoffeeGame(scene, this);
    this.miniGames.push(this.coffeeGame);

    this.printerGame = new PrinterGame(scene);
    this.miniGames.push(this.printerGame);

    this.startRandomMiniGame();
  }

  public teardown(scene: ex.Scene) {}

  public startRandomMiniGame() {
    let miniGame = this.miniGames[
      ex.Util.randomIntInRange(0, this.miniGames.length - 1)
    ];
    miniGame.start();
  }
}
