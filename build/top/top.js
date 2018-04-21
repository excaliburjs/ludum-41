import * as ex from "excalibur";
import Config from "../config";
import Obstacles from "./obstacles";
import { Floor } from "./floor";
import { TopPlayer } from "./top-player";
import { TopHealth } from "./health";
import { Platform } from "./platform";
export class TopSubscene {
    constructor(_engine) {
        this._engine = _engine;
        this.onPlayerHitObstacle = () => {
            this.healthMeter.health--;
        };
    }
    setup(scene) {
        this.floor = new Floor(this._engine);
        this.player = new TopPlayer(this._engine);
        this.healthMeter = new TopHealth(this._engine);
        this.spawnTimer = new ex.Timer(() => {
            this.spawnObstacle(this._engine, scene);
            this.spawnPlatform(this._engine, scene);
        }, 1000, true);
        scene.add(this.spawnTimer);
        scene.add(this.floor);
        scene.add(this.player);
        scene.add(this.healthMeter);
    }
    teardown(scene) {
        scene.remove(this.floor);
        scene.remove(this.player);
        scene.remove(this.healthMeter);
        scene.remove(this.spawnTimer);
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
        const platform = new Platform({
            x,
            y: this.floor.getTop() - Config.Platform.Height / 2,
            speed: Config.Floor.Speed
        });
        ex.Logger.getInstance().debug("Spawned platform", platform);
        scene.add(platform);
    }
}
//# sourceMappingURL=top.js.map