import * as ex from "excalibur";
import { Floor } from "./floor";
import { TopPlayer } from "./top-player";
import { TopHealth } from "./health";

export class TopSubscene {
  floor: Floor;
  player: TopPlayer;
  healthMeter: TopHealth;

  constructor(private _engine: ex.Engine) {}

  public setup(scene: ex.Scene) {
    this.floor = new Floor(this._engine, this);
    this.player = new TopPlayer(this._engine);
    this.healthMeter = new TopHealth(this._engine);

    scene.add(this.floor);
    scene.add(this.player);
    scene.add(this.healthMeter);
  }

  public teardown(scene: ex.Scene) {
    scene.remove(this.floor);
    scene.remove(this.player);
    scene.remove(this.healthMeter);
  }
}
