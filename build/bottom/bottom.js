import { CollatingGame } from "./collating-game/collatingGame";
import { CoffeeGame } from "./coffee-game/coffeeGame";
import Config from "../config";
import { MiniGameType } from "./miniGame";
import { PrinterGame } from "./printer-game/printer-game";
import { Cursor } from "./cursor";
import { Timer } from "excalibur";
import { gameover } from "../session";
import { GameOverReason } from "../stats";
import { CountDown } from "./countdown";
export class BottomSubscene {
    constructor(scene) {
        this.miniGameCount = 0;
        this.miniGames = [];
        this._gameOver = false;
        this._countdown = new CountDown(scene.engine);
        scene.add(this._countdown);
        console.log("bottom");
        this._miniGameTimer = new Timer(() => {
            this._secondsRemaining--;
            this._countdown.timeRemaining = this._secondsRemaining;
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
        //this.miniGames.push(this.collatingGame);
        this.coffeeGame = new CoffeeGame(scene, this);
        //this.miniGames.push(this.coffeeGame);
        this.printerGame = new PrinterGame(scene, this);
        //this.miniGames.push(this.printerGame);
    }
    setup(scene) {
        var keys = Object.keys(MiniGameType).filter(key => typeof MiniGameType[key] === "number");
        this.miniGames = keys.map(key => MiniGameType[key]);
        console.log(this.miniGames);
        this.startRandomMiniGame();
    }
    teardown(scene) {
        this.currentMiniGame.cleanUp();
        this.miniGameCount = 0;
        //scene.remove(this._countdownLabel);
    }
    startMiniGame(miniGameType, secondsToComplete) {
        switch (miniGameType) {
            case MiniGameType.Coffee:
                this.currentMiniGame = this.coffeeGame;
                break;
            case MiniGameType.Collate:
                this.currentMiniGame = this.collatingGame;
                break;
            case MiniGameType.Printer:
                this.currentMiniGame = this.printerGame;
                break;
        }
        this._secondsRemaining =
            secondsToComplete || this.currentMiniGame.secondsToComplete;
        this._gameOver = false;
        this.currentMiniGame.start();
        this._miniGameTimer.reset(1000, this._secondsRemaining);
        this._countdown.maxTime = this._secondsRemaining;
        this._countdown.timeRemaining = this._secondsRemaining;
    }
    startRandomMiniGame() {
        // if (this.miniGameCount % this.miniGames.length === 0) {
        //   this.miniGames = Config.Rand.shuffle(this.miniGames);
        // }
        this.miniGameCount = (this.miniGameCount + 1) % this.miniGames.length;
        this.startMiniGame(this.miniGames[this.miniGameCount]);
        console.log("current game:", this.miniGameCount, this.currentMiniGame);
    }
}
//# sourceMappingURL=bottom.js.map