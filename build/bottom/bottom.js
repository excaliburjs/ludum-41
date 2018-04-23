import * as ex from "excalibur";
import { CollatingGame } from "./collating-game/collatingGame";
import { CoffeeGame } from "./coffee-game/coffeeGame";
import Config from "../config";
import { PrinterGame } from "./printer-game/printer-game";
import { Cursor } from "./cursor";
import { Timer } from "excalibur";
import { gameover } from "../session";
import { GameOverReason } from "../stats";
export class BottomSubscene {
    constructor(scene) {
        this.miniGameCount = 0;
        this.miniGames = [];
        this._gameOver = false;
        this._countdownLabel = new ex.Label({
            color: ex.Color.White,
            fontSize: 25,
            x: 700,
            y: 650,
            text: "60"
        });
        scene.add(this._countdownLabel);
        this._countdownLabel.setZIndex(300);
        console.log("bottom");
        this._miniGameTimer = new Timer(() => {
            this._secondsRemaining--;
            this._countdownLabel.text = this._secondsRemaining.toString();
            if (this._secondsRemaining <= 0) {
                if (!this._gameOver) {
                    this._gameOver = true;
                    //game over logic
                    gameover(scene.engine, GameOverReason.minigame);
                }
            }
        }, 1000, true);
        scene.add(this._miniGameTimer);
        this.cursor = new Cursor();
        scene.add(this.cursor);
        this.collatingGame = new CollatingGame(scene, Config.MiniGames.Collating.NumberOfWinsToProceed, this);
        this.miniGames.push(this.collatingGame);
        this.coffeeGame = new CoffeeGame(scene, this);
        this.miniGames.push(this.coffeeGame);
        this.printerGame = new PrinterGame(scene, this);
        this.miniGames.push(this.printerGame);
    }
    setup(scene) {
        this.miniGames = Config.Rand.shuffle(this.miniGames);
        this.startRandomMiniGame();
    }
    teardown(scene) {
        this.currentMiniGame.cleanUp();
        //scene.remove(this._countdownLabel);
    }
    startRandomMiniGame() {
        // if (this.miniGameCount % this.miniGames.length === 0) {
        //   this.miniGames = Config.Rand.shuffle(this.miniGames);
        // }
        this.currentMiniGame = this.miniGames[this.miniGameCount];
        console.log("current game:", this.miniGameCount, this.currentMiniGame);
        this.miniGameCount = (this.miniGameCount + 1) % this.miniGames.length;
        this._secondsRemaining = this.currentMiniGame.secondsToComplete;
        this._countdownLabel.text = this.currentMiniGame.secondsToComplete.toString();
        this._gameOver = false;
        this.currentMiniGame.start();
        this._miniGameTimer.reset(1000, this.currentMiniGame.secondsToComplete);
    }
}
//# sourceMappingURL=bottom.js.map