import * as ex from "excalibur";
import { CollatingGame } from "./collating-game/collatingGame";
import { CoffeeGame } from "./coffee-game/coffeeGame";
import Config from "../config";
import { MiniGame } from "./miniGame";
import { PrinterGame } from "./printer-game/printer-game";
import { Cursor } from "./cursor";
import { Scene, Label, Timer } from "excalibur";

export class BottomSubscene {
  public miniGameCount: number = 0;
  private miniGames: MiniGame[] = [];
  private currentMiniGame: MiniGame;
  private collatingGame: CollatingGame;
  private coffeeGame: CoffeeGame;
  private printerGame: PrinterGame;
  private cursor: Cursor;
  private _countdownLabel: Label;
  private _miniGameTimer: Timer;

  constructor() {}

  public setup(scene: ex.Scene) {
    this.cursor = new Cursor();
    scene.add(this.cursor);

    this.collatingGame = new CollatingGame(
      scene,
      Config.MiniGames.Collating.NumberOfWinsToProceed,
      this
    );
    this.miniGames.push(this.collatingGame);

    this.coffeeGame = new CoffeeGame(scene, this);
    this.miniGames.push(this.coffeeGame);

    this.printerGame = new PrinterGame(scene, this);
    this.miniGames.push(this.printerGame);

    this.startRandomMiniGame();

    this._countdownLabel = new ex.Label({
      color: ex.Color.White,
      text: "60",
      fontSize: 25,
      x: 700,
      y: 650
    });
    scene.add(this._countdownLabel);
    this._countdownLabel.setZIndex(300);
  }

  public teardown(scene: ex.Scene) {
    this.currentMiniGame.cleanUp();
  }

  public startRandomMiniGame() {
    if (this.miniGameCount % this.miniGames.length === 0) {
      this.miniGames = Config.Rand.shuffle(this.miniGames);
    }

    this.currentMiniGame = this.miniGames[
      this.miniGameCount % this.miniGames.length
    ];
    this.miniGameCount++;
    this.currentMiniGame.start();
  }
}
