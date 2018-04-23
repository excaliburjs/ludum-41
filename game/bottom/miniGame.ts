import { Actor, Scene, Timer, Label, Color } from "excalibur";
import { BottomSubscene } from "./bottom";

export enum MiniGameType {
  Collate,
  Coffee,
  Printer
}
export abstract class MiniGame {
  protected miniGameActors: Array<Actor> = [];
  protected bottomSubscene: BottomSubscene;
  protected scene: Scene;
  private _timeLimit: number;
  public active: boolean = false;
  public abstract secondsToComplete: number;
  public abstract miniGameType: MiniGameType;

  constructor(scene: Scene, bottomSubscene: BottomSubscene) {
    this.scene = scene;
    this.bottomSubscene = bottomSubscene;
  }

  protected abstract setup(): void;

  public start(): void {
    this.setup(); //initialize actors and add them to the miniGameActors collection.
    this.active = true;
    for (let i = 0; i < this.miniGameActors.length; i++) {
      this.scene.add(this.miniGameActors[i]);
    }
  }

  public cleanUp(): void {
    for (let i = 0; i < this.miniGameActors.length; i++) {
      this.miniGameActors[i].kill();
      this.scene.remove(this.miniGameActors[i]);
    }
    this.active = false;
  }

  public onSucceed(): void {
    this.cleanUp();
    this.bottomSubscene.startRandomMiniGame();
  }

  public onFail(): void {
    this.cleanUp();
  }
}
