import * as ex from "excalibur";
import Config from "../config";
import Obstacles from "./obstacles";
import { Floor } from "./floor";
import { TopPlayer } from "./top-player";
import { TopHealth } from "./health";
import { Platform } from "./platform";
import { Background } from "./background";
export class TopSubscene {
    constructor(_engine) {
        this._engine = _engine;
        this.onPlayerHitObstacle = () => {
            this.healthMeter.health--;
        };
    }
    setup(scene) {
        this.scene = scene;
        this.floor = new Floor(this._engine);
        this.player = new TopPlayer(this._engine);
        this.healthMeter = new TopHealth(this._engine);
        this.background = new Background(this._engine);
        this.spawnTimer = new ex.Timer(() => {
            this.spawnObstacle(this._engine, scene);
        }, 1000, true);
        this.platformTimer = new ex.Timer(() => {
            this.spawnPlatform(this._engine, scene);
        }, 2000, true);
        scene.add(this.spawnTimer);
        scene.add(this.platformTimer);
        scene.add(this.platformTimer2);
        scene.add(this.floor);
        scene.add(this.player);
        scene.add(this.healthMeter);
        scene.add(this.background);
    }
    teardown(scene) {
        scene.remove(this.floor);
        scene.remove(this.player);
        scene.remove(this.healthMeter);
        scene.remove(this.spawnTimer);
        scene.remove(this.background);
    }
    spawnObstacle(engine, scene) {
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
        const newInterval = Config.Rand.integer(Config.ObstacleSpawnMinInterval, Config.ObstacleSpawnMaxInterval);
        this.spawnTimer.reset(newInterval);
    }
    spawnPlatform(engine, scene) {
        const x = engine.drawWidth + 100;
        const level = Config.Rand.integer(2, 3);
        const shouldSpawnAboveLevelOne = Config.Rand.next() > 0.7;
        const platform = new Platform({
            x,
            y: this.floor.getTop() -
                Config.Platform.HeightAboveFloor *
                    (shouldSpawnAboveLevelOne ? level : 1),
            speed: Config.Floor.Speed
        });
        ex.Logger.getInstance().debug("Spawned platform", platform);
        scene.add(platform);
        const newInterval = Config.Rand.integer(Config.Platform.MinSpawnInterval, Config.Platform.MaxSpawnInterval);
        this.platformTimer.reset(newInterval);
    }
}
//# sourceMappingURL=top.js.map