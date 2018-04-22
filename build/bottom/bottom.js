import * as ex from "excalibur";
import { CollatingGame } from "./collating-game/collatingGame";
import { CoffeeGame } from "./coffee-game/coffeeGame";
import Config from "../config";
import { PrinterGame } from "./printer-game/printer-game";
export class BottomSubscene {
    constructor() {
        this.miniGames = [];
    }
    setup(scene) {
        this.collatingGame = new CollatingGame(scene, Config.MiniGames.Collating.NumberOfWinsToProceed, this);
        this.miniGames.push(this.collatingGame);
        this.coffeeGame = new CoffeeGame(scene, this);
        this.miniGames.push(this.coffeeGame);
        this.printerGame = new PrinterGame(scene, this);
        this.miniGames.push(this.printerGame);
        this.startRandomMiniGame();
    }
    teardown(scene) {
        this.currentMiniGame.cleanUp();
    }
    startRandomMiniGame() {
        this.currentMiniGame = this.miniGames[ex.Util.randomIntInRange(0, this.miniGames.length - 1)];
        this.currentMiniGame.start();
    }
}
//# sourceMappingURL=bottom.js.map