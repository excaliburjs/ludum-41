import * as ex from "excalibur";
import Config from "../config";
import { Obstacle } from "./obstacle";
import { TopSubscene } from "./top";

export class Floor extends ex.Actor {
  protected _spawnTimer: ex.Timer;

  /**
   *
   */
  constructor(engine: ex.Engine, private topSubscene: TopSubscene) {
    super({
      x: 0,
      y: engine.drawHeight / 2, // position half down the screen
      width: engine.drawWidth * 2, // twice as wide as the screen
      height: Config.Floor.Height,
      color: ex.Color.Black,
      anchor: new ex.Vector(0, 0.5),
      collisionType: ex.CollisionType.Fixed
    });
  }

  onInitialize(engine: ex.Engine) {
    this._spawnTimer = new ex.Timer(
      () => this.spawnObstacle(engine),
      1000,
      true
    );
    this.scene.add(this._spawnTimer);
  }

  spawnObstacle(engine: ex.Engine) {
    const x = engine.drawWidth + 200;
    const height = Config.Rand.integer(Obstacle.minHeight, Obstacle.maxHeight);
    const ob = new Obstacle({
      height,
      x,
      y: this.getTop(),
      speed: Config.Floor.Speed,
      topSubscene: this.topSubscene
    });

    ex.Logger.getInstance().debug("Spawned obstacle", ob);

    this.scene.add(ob);

    const newInterval = Config.Rand.integer(
      Config.ObstacleSpawnMinInterval,
      Config.ObstacleSpawnMaxInterval
    );
    this._spawnTimer.reset(newInterval);
  }
}
