var __extends =
  (this && this.__extends) ||
  (function() {
    var extendStatics =
      Object.setPrototypeOf ||
      ({ __proto__: [] } instanceof Array &&
        function(d, b) {
          d.__proto__ = b;
        }) ||
      function(d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
      };
    return function(d, b) {
      extendStatics(d, b);
      function __() {
        this.constructor = d;
      }
      d.prototype =
        b === null
          ? Object.create(b)
          : ((__.prototype = b.prototype), new __());
    };
  })();
var Stats = /** @class */ (function() {
  function Stats() {}
  return Stats;
})();
/// <reference path="../../lib/excalibur-dist/excalibur.d.ts" />
var Floor = /** @class */ (function(_super) {
  __extends(Floor, _super);
  /**
   *
   */
  function Floor(engine) {
    return (
      _super.call(this, {
        x: 0,
        y: engine.drawHeight / 2,
        width: engine.drawWidth * 2,
        height: 20,
        color: ex.Color.Red,
        anchor: new ex.Vector(0, 0.5),
        vel: new ex.Vector(Config.FloorSpeed, 0) // speed of the runner
      }) || this
    );
  }
  Floor.prototype.onPostUpdate = function(_engine, delta) {
    if (this.x < -this.getWidth() / 2) {
      console.log("floor reset!");
      this.x = 0;
    }
  };
  return Floor;
})(ex.Actor);
/// <reference path="../../lib/excalibur-dist/excalibur.d.ts" />
/// <reference path="floor.ts" />
var Top = /** @class */ (function() {
  function Top(_engine) {
    this._engine = _engine;
    this.floor = new Floor(_engine);
  }
  Top.prototype.setup = function(scene) {
    scene.add(this.floor);
  };
  return Top;
})();
//# sourceMappingURL=game.js.map
