import * as ex from "excalibur";
import { CollatingGame } from "./collating-game/collatingGame";
import { CoffeeGame } from "./coffee-game/coffeeGame";
export class BottomSubscene {
    constructor() {
        this.miniGames = [];
    }
    setup(scene) {
        this.collatingGame = new CollatingGame(scene);
        this.miniGames.push(this.collatingGame);
        this.coffeeGame = new CoffeeGame(scene);
        this.miniGames.push(this.coffeeGame);
        this.startRandomMiniGame();
    }
    teardown(scene) { }
    startRandomMiniGame() {
        let miniGame = this.miniGames[ex.Util.randomIntInRange(0, this.miniGames.length - 1)];
        miniGame.show();
    }
}
//# sourceMappingURL=bottom.js.map