import * as ex from "excalibur";
import { MiniGame } from "../miniGame";
import { CoffeeItem } from "./coffeeItem";
import Resources from "../../resources";
export class CoffeeGame extends MiniGame {
    constructor(scene, bottomSubscene) {
        super(scene, bottomSubscene);
        this._stepCount = 0;
    }
    setup() {
        this._stepCount = 0;
        let coffeeFilter = new CoffeeItem({
            x: 200,
            y: 500,
            width: 50,
            height: 50,
            color: ex.Color.White
        });
        this.miniGameActors.push(coffeeFilter);
        coffeeFilter.highlight();
        let coffeeGrounds = new CoffeeItem({
            x: 300,
            y: 500,
            width: 150,
            height: 160,
            color: ex.Color.Red
        });
        let coffeeGroundsSpritesheet = new ex.SpriteSheet(Resources.txCoffeeGrounds, 2, 1, 150, 160);
        coffeeGrounds.addDrawing("default", coffeeGroundsSpritesheet.getSprite(0));
        coffeeGrounds.addDrawing("highlight", coffeeGroundsSpritesheet.getSprite(1));
        this.miniGameActors.push(coffeeGrounds);
        let waterPitcher = new CoffeeItem({
            x: 100,
            y: 500,
            width: 100,
            height: 150,
            color: ex.Color.Cyan
        });
        this.miniGameActors.push(waterPitcher);
        let coffeeMaker = new CoffeeItem({
            x: 400,
            y: 600,
            width: 160,
            height: 260,
            color: ex.Color.Black
        });
        let coffeeMakerSpritesheet = new ex.SpriteSheet(Resources.txCoffeeMaker, 2, 1, 160, 260);
        coffeeMaker.addDrawing("default", coffeeMakerSpritesheet.getSprite(0));
        coffeeMaker.addDrawing("highlight", coffeeMakerSpritesheet.getSprite(1));
        this.miniGameActors.push(coffeeMaker);
        let coffeeCup = new CoffeeItem({
            x: 550,
            y: 500,
            width: 50,
            height: 50,
            color: ex.Color.Orange
        });
        this.miniGameActors.push(coffeeCup);
        this.scene.on("coffeeClick", () => {
            console.log("coffee click");
            this._stepCount++;
            if (this._stepCount >= this.miniGameActors.length) {
                // TODO play coffee brewing animation
                // TODO ramp up the music/difficulty in the top runner
                // TODO hiding the actors isn't enough, they need their input disabled
                // maybe we should remove them from the scene?
                this.onSucceed();
            }
            else {
                let coffeeItem = this.miniGameActors[this._stepCount];
                coffeeItem.highlight();
            }
        });
    }
}
//# sourceMappingURL=coffeeGame.js.map