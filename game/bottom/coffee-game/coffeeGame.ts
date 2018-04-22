import * as ex from "excalibur";
import { MiniGame } from "../miniGame";
import { CoffeeItem } from "./coffeeItem";
import { BottomSubscene } from "../bottom";
import Resources from "../../resources";
import Config from "../../config";

export class CoffeeGame extends MiniGame {
  private _stepCount = 0;
  private _coffeeMaker: CoffeeItem;

  constructor(scene: ex.Scene, bottomSubscene: BottomSubscene) {
    super(scene, bottomSubscene);
  }

  public setup() {
    this._stepCount = 0;
    let coffeeFilter = new CoffeeItem({
      x: 200,
      y: 500,
      width: 140,
      height: 140,
      color: ex.Color.White
    });
    let coffeeFilterSpriteSheet = new ex.SpriteSheet(
      Resources.txCoffeeFilter,
      2,
      1,
      120,
      120
    );
    this.miniGameActors.push(coffeeFilter);
    coffeeFilter.addDrawing("default", coffeeFilterSpriteSheet.getSprite(0));
    coffeeFilter.addDrawing("highlight", coffeeFilterSpriteSheet.getSprite(1));
    coffeeFilter.highlight();

    let coffeeGrounds = new CoffeeItem({
      x: 300,
      y: 500,
      width: 150,
      height: 160,
      color: ex.Color.Red
    });
    let coffeeGroundsSpritesheet = new ex.SpriteSheet(
      Resources.txCoffeeGrounds,
      2,
      1,
      150,
      160
    );
    coffeeGrounds.addDrawing("default", coffeeGroundsSpritesheet.getSprite(0));
    coffeeGrounds.addDrawing(
      "highlight",
      coffeeGroundsSpritesheet.getSprite(1)
    );
    this.miniGameActors.push(coffeeGrounds);

    // let waterPitcher = new CoffeeItem({
    //   x: 100,
    //   y: 500,
    //   width: 100,
    //   height: 150,
    //   color: ex.Color.Cyan
    // });
    // this.miniGameActors.push(waterPitcher);

    this._coffeeMaker = new CoffeeItem({
      x: 400,
      y: 600,
      width: 160,
      height: 260,
      color: ex.Color.Black
    });
    let coffeeMakerSpritesheet = new ex.SpriteSheet(
      Resources.txCoffeeMaker,
      2,
      1,
      160,
      260
    );
    this._coffeeMaker.addDrawing(
      "default",
      coffeeMakerSpritesheet.getSprite(0)
    );
    this._coffeeMaker.addDrawing(
      "highlight",
      coffeeMakerSpritesheet.getSprite(1)
    );
    this.miniGameActors.push(this._coffeeMaker);

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
        this._coffeeMaker.actions
          .callMethod(() => {
            // TODO play coffee brewing animation
            // TODO ramp up the music/difficulty in the top runner?
            ex.Logger.getInstance().info("brewing coffee...");
          })
          .delay(Config.MiniGames.Coffee.BrewTime)
          .callMethod(() => {
            ex.Logger.getInstance().info("coffee complete...");
            this.onSucceed();
          });
      } else {
        let coffeeItem = <CoffeeItem>this.miniGameActors[this._stepCount];
        coffeeItem.highlight();
      }
    });
  }
}
