import * as ex from "excalibur";
import Config from "../config";
import Obstacles from "./obstacles";
import { Floor } from "./floor";
import { TopPlayer } from "./top-player";
import { TopHealth } from "./health";
import { Platform } from "./platform";
import { Background } from "./background";
import soundManager from "../soundManager";

export class TopSubscene {
  scene: ex.Scene;
  floor: Floor;
  player: TopPlayer;
  healthMeter: TopHealth;
  spawnTimer: ex.Timer;
  background: Background;
  platformTimer: ex.Timer;
  platformTimer2: ex.Timer;

  constructor(private _engine: ex.Engine, scene: ex.Scene) {
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

    this._engine.input.pointers.primary.on("down", this.handleInput.bind(this));
  }

  public setup(scene: ex.Scene) {
    this.player.vel = ex.Vector.Zero.clone();
    this.player.pos = new ex.Vector(
      scene.engine.drawWidth * Config.TopPlayer.StartingXPercent,
      scene.engine.drawHeight / 3
    );

    this.player.unkill();

    scene.add(this.spawnTimer);
    scene.add(this.platformTimer);
    scene.add(this.platformTimer2);
    scene.add(this.floor);
    scene.add(this.player);
    scene.add(this.healthMeter);
    scene.add(this.background);
  }

  public teardown(scene: ex.Scene) {
    this.player.kill();
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
    const level = Config.Rand.integer(2, 3);
    const shouldSpawnAboveLevelOne = Config.Rand.next() > 0.7;
    const platform = new Platform({
      x,
      y:
        this.floor.getTop() -
        Config.Platform.HeightAboveFloor *
          (shouldSpawnAboveLevelOne ? level : 1),
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

  onPlayerHitObstacle = () => {
    if (this.healthMeter.health > 0) {
      soundManager.playHitSound();
      this.healthMeter.health--;
    }
  };

  handleInput(event: ex.Input.PointerEvent) {
    //let camera = this.scene.camera;
    ex.Logger.getInstance().debug("event:", event);
    if (
      event.worldPos.y < this._engine.halfDrawHeight &&
      this._engine.currentScene == this.scene
    ) {
      this.player.jump();
      soundManager.pauseOfficeAmbience();
      soundManager.startActionMusic();
      //camera.move(new ex.Vector(this.engine.halfDrawWidth, this.engine.halfDrawHeight-200), 1000, ex.EasingFunctions.EaseInOutCubic);
    } else {
      if (this._engine.currentScene == this.scene) {
        soundManager.pauseActionMusic();
        soundManager.startOfficeAmbience();
      }
      //camera.move(new ex.Vector(this.engine.halfDrawWidth, this.engine.halfDrawHeight), 1000, ex.EasingFunctions.EaseInOutCubic);
    }
  }
}
