import * as ex from "excalibur";
import { MiniGame } from "./../MiniGame";
import { CoffeeItem } from "./coffeeItem";
export class CoffeeGame extends MiniGame {
    constructor() {
        super(...arguments);
        this._stepCount = 0;
        // constructor(scene: ex.Scene){
        // }
    }
    setup() {
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
            width: 60,
            height: 90,
            color: ex.Color.Red
        });
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
            y: 500,
            width: 100,
            height: 200,
            color: ex.Color.Black
        });
        this.miniGameActors.push(coffeeMaker);
        let coffeeCup = new CoffeeItem({
            x: 550,
            y: 500,
            width: 50,
            height: 50,
            color: ex.Color.Orange
        });
        this.miniGameActors.push(coffeeCup);
        this._scene.on("coffeeClick", () => {
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
    reset() {
        this._stepCount = 0;
    }
}
//# sourceMappingURL=coffeeGame.js.map