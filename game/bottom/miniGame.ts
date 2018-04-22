import { Actor, Scene, Timer, Label, Color } from "excalibur";
import { BottomSubscene } from "./bottom";
export abstract class MiniGame {
  protected miniGameActors: Array<Actor> = [];
  private _isSetUp: boolean;
  protected bottomSubscene: BottomSubscene;
  protected scene: Scene;

  constructor(scene: Scene, bottomSubscene: BottomSubscene) {
    this.scene = scene;
    this.bottomSubscene = bottomSubscene;
  }

  protected abstract setup(): void;

  public start(): void {
    this.miniGameActors = [];
    if (!this._isSetUp) {
      this.setup(); //initialize actors and add them to the miniGameActors collection.
      for (let i = 0; i < this.miniGameActors.length; i++) {
        this.scene.add(this.miniGameActors[i]);
      }
    }
    this._isSetUp = true;
  }

  public cleanUp(): void {
    for (let i = 0; i < this.miniGameActors.length; i++) {
      this.scene.remove(this.miniGameActors[i]);
      this._isSetUp = false;
    }
    this.miniGameActors = [];
  }

  public onSucceed(): void {
    this.cleanUp();
    this.bottomSubscene.startRandomMiniGame();
  }

  public onFail(): void {
    this.cleanUp();
  }
}
