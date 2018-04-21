import * as ex from "excalibur";
import { CoffeeGame } from "./coffee-game/coffeeGame";

export class BottomSubscene {
  private _coffeeGame: CoffeeGame;

  constructor() {}

  public setup(scene: ex.Scene) {
    this._coffeeGame = new CoffeeGame(scene);
    this._coffeeGame.show();
  }
}
