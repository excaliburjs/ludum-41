/// <reference path="top/top.ts" />

class ScnMain extends ex.Scene {
  constructor(engine: ex.Engine) {
    super(engine);
    let top = new Top(engine);

    top.setup(this);
  }

  public onInitialize(engine: ex.Engine) {}
}
