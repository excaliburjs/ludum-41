import * as ex from "excalibur";
import Config from "../config";
import Obstacles from "./obstacles";
import { Floor } from "./floor";
import { TopPlayer } from "./top-player";
import { TopHealth } from "./health";
import { Platform } from "./platform";
import { Background } from "./background";

export class TopSubscene {
  scene: ex.Scene;
  floor: Floor;
  player: TopPlayer;
  healthMeter: TopHealth;
  spawnTimer: ex.Timer;
  background: Background;
  platformTimer: ex.Timer;
  platformTimer2: ex.Timer;

  constructor(private _engine: ex.Engine) {}

  public setup(scene: ex.Scene) {
    this.scene = scene;
    this.floor = new Floor(this._engine);
    this.player = new TopPlayer(this._engine);
    this.healthMeter = new TopHealth(this._engine);
    this.background = new Background(this._engine);
    this.spawnTimer = new ex.Timer(
      () => {
        this.spawnObstacle(this._engine, scene);
      },
      1000,
      true
    );

    this.platformTimer = new ex.Timer(
      () => {
        this.spawnPlatform(this._engine, scene);
      },
      2000,
      true
    );

    this.platformTimer2 = new ex.Timer(
      () => {
        this.spawnPlatform2(this._engine, scene);
      },
      3000,
      true
    );
    
    scene.add(this.spawnTimer);
    scene.add(this.platformTimer);
    scene.add(this.platformTimer2);
    scene.add(this.floor);
    scene.add(this.player);
    scene.add(this.healthMeter);
    scene.add(this.background);
  }

  public teardown(scene: ex.Scene) {
    scene.remove(this.floor);
    scene.remove(this.player);
    scene.remove(this.healthMeter);
    scene.remove(this.spawnTimer);
    scene.remove(this.background);
  }

  spawnObstacle(engine: ex.Engine, scene: ex.Scene) {
    const x = engine.drawWidth + 200;
    const ObstacleDef = Obstacles[Config.Rand.integer(0, Obstacles.length - 1)];
    const ob = new ObstacleDef({
      x,
      y: this.floor.getTop(),
      speed: Config.Floor.Speed,
      onHitPlayer: this.onPlayerHitObstacle
    });

    ex.Logger.getInstance().debug("Spawned obstacle", ob);

    scene.add(ob);

    const newInterval = Config.Rand.integer(
      Config.ObstacleSpawnMinInterval,
      Config.ObstacleSpawnMaxInterval
    );
    this.spawnTimer.reset(newInterval);
  }

  spawnPlatform(engine: ex.Engine, scene: ex.Scene) {
    const x = engine.drawWidth + 100;
    const platform = new Platform({
      x,
      y: this.floor.getTop() - Config.Platform.HeightAboveFloor,
      speed: Config.Floor.Speed
    });

    ex.Logger.getInstance().debug("Spawned platform", platform);

    scene.add(platform);

    const newInterval = Config.Rand.integer(
      Config.Platform.MinSpawnInterval,
      Config.Platform.MaxSpawnInterval
    );
    this.platformTimer.reset(newInterval);
  }

  spawnPlatform2(engine: ex.Engine, scene: ex.Scene, ) {
    const x = engine.drawWidth + 100;
    const platform = new Platform({
      x,
      y: this.floor.getTop() - Config.Platform.HeightAboveFloor * 2,
      speed: Config.Floor.Speed
    });

    ex.Logger.getInstance().debug("Spawned platform", platform);

    this.scene.add(platform);

    const newInterval = Config.Rand.integer(
      Config.Platform.MinSpawnInterval * 2,
      Config.Platform.MaxSpawnInterval * 2
    );
    this.platformTimer2.reset(newInterval);
  }

  onPlayerHitObstacle = () => {
    this.healthMeter.health--;
  };
}
