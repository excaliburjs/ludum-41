import { Actor, Scene } from "excalibur";
export abstract class MiniGame {
  protected miniGameActors: Array<Actor> = [];
  private _isSetUp: boolean;
  protected scene: Scene;

  constructor(scene: Scene) {
    this.scene = scene;
  }

  protected abstract setup(): void;
  protected abstract reset(): void;

  public show(): void {
    if (!this._isSetUp) {
      this.setup(); //initialize actors and add them to the miniGameActors collection.
      for (let i = 0; i < this.miniGameActors.length; i++) {
        this.scene.add(this.miniGameActors[i]);
      }
    }
    this._isSetUp = true;
    this.reset();
    for (let i = 0; i < this.miniGameActors.length; i++) {
      this.miniGameActors[i].visible = true;
    }
  }

  public hide(): void {
    for (let i = 0; i < this.miniGameActors.length; i++) {
      this.miniGameActors[i].visible = false;
    }
  }

  public onSucceed(): void {
    this.hide();
  }

  public onFail(): void {
    this.hide();
  }
}
