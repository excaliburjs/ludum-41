import * as ex from "excalibur";
import { CollatingGame } from "./collating-game/collatingGame";
import { CoffeeGame } from "./coffee-game/coffeeGame";
import { MiniGame } from "./miniGame";

export class BottomSubscene {
  private miniGames: MiniGame[] = [];
  private collatingGame: CollatingGame;
  private coffeeGame: CoffeeGame;

  constructor() {}

  public setup(scene: ex.Scene) {
    this.collatingGame = new CollatingGame(scene);
    this.miniGames.push(this.collatingGame);

    this.coffeeGame = new CoffeeGame(scene);
    this.miniGames.push(this.coffeeGame);

    this.startRandomMiniGame();
  }

  public teardown(scene: ex.Scene) {}

  public startRandomMiniGame() {
    let miniGame = this.miniGames[
      ex.Util.randomIntInRange(0, this.miniGames.length - 1)
    ];
    miniGame.show();
  }
}
