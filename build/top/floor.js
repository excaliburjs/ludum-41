import * as ex from "excalibur";
import Config from "../config";
import { Obstacle } from "./obstacle";
export class Floor extends ex.Actor {
    /**
     *
     */
    constructor(engine) {
        super({
            x: 0,
            y: engine.drawHeight / 2,
            width: engine.drawWidth * 2,
            height: Config.Floor.Height,
            color: ex.Color.Red,
            anchor: new ex.Vector(0, 0.5),
            collisionType: ex.CollisionType.Fixed
        });
    }
    onInitialize(engine) {
        this._spawnTimer = new ex.Timer(() => this.spawnObstacle(engine), 1000, true);
        this.scene.add(this._spawnTimer);
    }
    onPostUpdate(_engine, delta) {
        if (this.x < -this.getWidth() / 2) {
            ex.Logger.getInstance().info("floor reset!");
            this.x = 0;
        }
    }
    spawnObstacle(engine) {
        const x = engine.drawWidth + 200;
        const height = Config.Rand.integer(Obstacle.minHeight, Obstacle.maxHeight);
        const ob = new Obstacle({
            height,
            x,
            y: this.getTop(),
            speed: Config.Floor.Speed
        });
        ex.Logger.getInstance().info("Spawned obstacle", ob);
        this.scene.add(ob);
        const newInterval = Config.Rand.integer(Config.ObstacleSpawnMinInterval, Config.ObstacleSpawnMaxInterval);
        this._spawnTimer.reset(newInterval);
    }
}
//# sourceMappingURL=floor.js.map