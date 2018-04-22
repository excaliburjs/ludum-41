import * as ex from "excalibur";
import { CollatingGame } from "./collating-game/collatingGame";
import { CoffeeGame } from "./coffee-game/coffeeGame";
import Config from "../config";
import { PrinterGame } from "./printer-game/printer-game";
import { Cursor } from "./cursor";
export class BottomSubscene {
    constructor() {
        this.miniGameCount = 0;
        this.miniGames = [];
    }
    setup(scene) {
        this.cursor = new Cursor();
        scene.add(this.cursor);
        this.collatingGame = new CollatingGame(scene, Config.MiniGames.Collating.NumberOfWinsToProceed, this);
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
    teardown(scene) {
        this.currentMiniGame.cleanUp();
    }
    startRandomMiniGame() {
        if (this.miniGameCount % this.miniGames.length === 0) {
            this.miniGames = Config.Rand.shuffle(this.miniGames);
        }
        this.currentMiniGame = this.miniGames[(this.miniGameCount + 1) % this.miniGames.length];
        this.currentMiniGame.start();
    }
}
//# sourceMappingURL=bottom.js.map