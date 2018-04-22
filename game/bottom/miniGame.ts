import { Actor, Scene, Timer, Label, Color } from "excalibur";
import { BottomSubscene } from "./bottom";
export abstract class MiniGame {
  protected miniGameActors: Array<Actor> = [];
  protected bottomSubscene: BottomSubscene;
  protected scene: Scene;
  private _timeLimit: number;

  constructor(scene: Scene, bottomSubscene: BottomSubscene) {
    this.scene = scene;
    this.bottomSubscene = bottomSubscene;
  }

  protected abstract setup(): void;

  public start(): void {
    this.setup(); //initialize actors and add them to the miniGameActors collection.
    for (let i = 0; i < this.miniGameActors.length; i++) {
      this.scene.add(this.miniGameActors[i]);
    }
  }

  public cleanUp(): void {
    for (let i = 0; i < this.miniGameActors.length; i++) {
      this.scene.remove(this.miniGameActors[i]);
    }
  }

  public onSucceed(): void {
    this.cleanUp();
    this.bottomSubscene.startRandomMiniGame();
  }

  public onFail(): void {
    this.cleanUp();
  }
}
