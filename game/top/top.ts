import * as ex from "excalibur";
import { Floor } from "./floor";
import { TopPlayer } from "./top-player";

export class Top {
  floor: Floor;
  player: TopPlayer;
  constructor(private _engine: ex.Engine) {
    this.floor = new Floor(_engine);
    this.player = new TopPlayer(_engine);
  }

  public setup(scene: ex.Scene) {
    scene.add(this.floor);
    scene.add(this.player);
  }
}
