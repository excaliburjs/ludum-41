import * as ex from "excalibur";
import { MiniGame } from "../miniGame";
import { CoffeeItem } from "./coffeeItem";
import Resources from "../../resources";
import Config from "../../config";
export class CoffeeGame extends MiniGame {
    constructor(scene, bottomSubscene) {
        super(scene, bottomSubscene);
        this._stepCount = 0;
        this.secondsToComplete = 15;
        this._coffeeFilter = new CoffeeItem({
            x: 200,
            y: 500
        });
        this._stepCount = 1; // set to 1 to avoid the first element of the array, which is the background
        this._background = new ex.Actor({
            x: 400,
            y: 600,
            width: 1,
            height: 1
        });
        let bgSpriteSheet = new ex.SpriteSheet(Resources.txCoffeeBackground, 1, 1, 800, 400);
        this._background.addDrawing(bgSpriteSheet.getSprite(0));
        this._coffeeFilter = new CoffeeItem({
            x: 600,
            y: 510,
            width: 140,
            height: 140,
            color: ex.Color.White
        });
        let coffeeFilterSpriteSheet = new ex.SpriteSheet(Resources.txCoffeeFilter, 2, 1, 120, 120);
        this._coffeeFilter.addDrawing("default", coffeeFilterSpriteSheet.getSprite(0));
        this._coffeeFilter.addDrawing("highlight", coffeeFilterSpriteSheet.getSprite(1));
        this._coffeeGrounds = new CoffeeItem({
            x: 200,
            y: 500,
            width: 150,
            height: 160,
            color: ex.Color.Red
        });
        let coffeeGroundsSpritesheet = new ex.SpriteSheet(Resources.txCoffeeGrounds, 2, 1, 150, 160);
        this._coffeeGrounds.addDrawing("default", coffeeGroundsSpritesheet.getSprite(0));
        this._coffeeGrounds.addDrawing("highlight", coffeeGroundsSpritesheet.getSprite(1));
        this._coffeeMaker = new CoffeeItem({
            x: 400,
            y: 600,
            width: 160,
            height: 260,
            color: ex.Color.Black
        });
        let coffeeMakerSpritesheet = new ex.SpriteSheet(Resources.txCoffeeMaker, 24, 1, 160, 260);
        this._coffeeMaker.addDrawing("default", coffeeMakerSpritesheet.getSprite(0));
        this._coffeeMaker.addDrawing("highlight", coffeeMakerSpritesheet.getSprite(1));
        let coffeeMakeAnim = coffeeMakerSpritesheet.getAnimationBetween(this.scene.engine, 2, 24, 250);
        coffeeMakeAnim.loop = false;
        this._coffeeMaker.addDrawing("animate", coffeeMakeAnim);
        this._coffeeCup = new CoffeeItem({
            x: 650,
            y: 687,
            width: 100,
            height: 100,
            color: ex.Color.Orange
        });
        let coffeeCupSpritesheet = new ex.SpriteSheet(Resources.txCoffeeCup, 2, 1, 100, 100);
        this._coffeeCup.addDrawing("default", coffeeCupSpritesheet.getSprite(0));
        this._coffeeCup.addDrawing("highlight", coffeeCupSpritesheet.getSprite(1));
        this.miniGameActors.push(this._background);
        this.miniGameActors.push(this._coffeeFilter);
        this.miniGameActors.push(this._coffeeGrounds);
        this.miniGameActors.push(this._coffeeMaker);
        this.miniGameActors.push(this._coffeeCup);
        this.scene.on("coffeeClick", () => {
            this._stepCount++;
            if (this.miniGameActors[this._stepCount - 1] == this._coffeeMaker) {
                this._coffeeMaker.actions
                    .callMethod(() => {
                    // TODO play coffee brewing animation
                    this._coffeeMaker.setDrawing("animate");
                    // TODO ramp up the music/difficulty in the top runner?
                    ex.Logger.getInstance().info("brewing coffee...");
                })
                    .delay(Config.MiniGames.Coffee.BrewTime)
                    .callMethod(() => {
                    ex.Logger.getInstance().info("coffee complete...");
                    let coffeeItem = this.miniGameActors[this._stepCount];
                    coffeeItem.highlight();
                });
            }
            else if (this._stepCount >= this.miniGameActors.length) {
                this.onSucceed();
            }
            else {
                let coffeeItem = this.miniGameActors[this._stepCount];
                coffeeItem.highlight();
            }
        });
    }
    setup() {
        this._coffeeFilter.highlight();
        this._coffeeCup.unHighlight();
        this._coffeeGrounds.unHighlight();
        this._coffeeMaker.unHighlight();
        this._coffeeMaker.setDrawing("default");
        this._stepCount = 1;
    }
}
//# sourceMappingURL=coffeeGame.js.map