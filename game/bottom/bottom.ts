import * as ex from "excalibur";
import { CollatingGame } from "./collating-game/collatingGame";
import { CoffeeGame } from "./coffee-game/coffeeGame";
import Config from "../config";
import { MiniGame } from "./miniGame";
import { PrinterGame } from "./printer-game/printer-game";
import { Scene, Label, Timer } from "excalibur";

export class BottomSubscene {
  private miniGames: MiniGame[] = [];
  private currentMiniGame: MiniGame;
  private collatingGame: CollatingGame;
  private coffeeGame: CoffeeGame;
  private printerGame: PrinterGame;
  private _countdownLabel: Label;
  private _miniGameTimer: Timer;
  private _secondsRemaining: number;
  private _gameOver: boolean = false;

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

    this.printerGame = new PrinterGame(scene, this);
    this.miniGames.push(this.printerGame);

    this._countdownLabel = new ex.Label({
      color: ex.Color.White,
      fontSize: 25,
      x: 700,
      y: 650
    });
    scene.add(this._countdownLabel);
    this._countdownLabel.setZIndex(300);

    this._miniGameTimer = new Timer(
      () => {
        this._secondsRemaining--;
        this._countdownLabel.text = this._secondsRemaining.toString();
        if (this._secondsRemaining <= 0) {
          if (!this._gameOver) {
            this._gameOver = true;
            //game over logic
          }
        }
      },
      1000,
      true
    );

    scene.add(this._miniGameTimer);

    this.startRandomMiniGame();
  }

  public teardown(scene: ex.Scene) {
    this.currentMiniGame.cleanUp();
    scene.remove(this._countdownLabel);
    this._miniGameTimer.cancel();
    scene.remove(this._miniGameTimer);
  }

  public startRandomMiniGame() {
    this.currentMiniGame = this.miniGames[
      Config.Rand.integer(0, this.miniGames.length - 1)
    ];
    this.currentMiniGame.start();
    this._secondsRemaining = 60;
    this._miniGameTimer.reset(1000, 60);
  }
}
