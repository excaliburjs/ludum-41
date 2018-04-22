import * as ex from "excalibur";
import { TopSubscene } from "./top/top";
import { BottomSubscene } from "./bottom/bottom";
import { Overlay } from "./overlay";
import Config from "./config";

export class ScnMain extends ex.Scene {
  private _top: TopSubscene;
  private _bottom: BottomSubscene;
  private _overlay: Overlay;

  onInitialize(engine: ex.Engine) {
    this._top = new TopSubscene(this.engine, this);
    this._bottom = new BottomSubscene(this);
    this._overlay = new Overlay(this.engine, this);
  }

  onActivate() {
    this._top.setup(this);
    this._top.healthMeter.health = Config.Health.Default;
    this._bottom.setup(this);
  }

  onDeactivate() {
    this._top.teardown(this);
    this._bottom.teardown(this);
  }
}
