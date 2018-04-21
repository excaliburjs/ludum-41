import * as ex from "excalibur";
import { Floor } from "./floor";
import { TopPlayer } from "./top-player";
import { TopHealth } from "./health";

export class TopSubscene {
  floor: Floor;
  player: TopPlayer;
  healthMeter: TopHealth;
  constructor(private _engine: ex.Engine) {
    this.floor = new Floor(_engine, this);
    this.player = new TopPlayer(_engine);
    this.healthMeter = new TopHealth(_engine);
  }

  public setup(scene: ex.Scene) {
    scene.add(this.floor);
    scene.add(this.player);
    scene.add(this.healthMeter);
  }
}
