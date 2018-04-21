/// <reference path="../../lib/excalibur-dist/excalibur.d.ts" />
/// <reference path="floor.ts" />

class Top {
  floor: Floor;
  constructor(private _engine: ex.Engine) {
    this.floor = new Floor(_engine);
  }

  public setup(scene: ex.Scene) {
    scene.add(this.floor);
  }
}
