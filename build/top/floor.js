import * as ex from "excalibur";
import Config from "../config";
import Obstacles from "./obstacles";
export class Floor extends ex.Actor {
    /**
     *
     */
    constructor(engine, topSubscene) {
        super({
            x: 0,
            y: engine.drawHeight / 2,
            width: engine.drawWidth * 2,
            height: Config.Floor.Height,
            color: ex.Color.Black,
            anchor: new ex.Vector(0, 0.5),
            collisionType: ex.CollisionType.Fixed
        });
        this.topSubscene = topSubscene;
    }
    onInitialize(engine) {
        this._spawnTimer = new ex.Timer(() => this.spawnObstacle(engine), 1000, true);
        this.scene.add(this._spawnTimer);
    }
    spawnObstacle(engine) {
        const x = engine.drawWidth + 200;
        const ObstacleDef = Obstacles[Config.Rand.integer(0, Obstacles.length - 1)];
        const ob = new ObstacleDef({
            x,
            y: this.getTop(),
            speed: Config.Floor.Speed,
            topSubscene: this.topSubscene
        });
        ex.Logger.getInstance().debug("Spawned obstacle", ob);
        this.scene.add(ob);
        const newInterval = Config.Rand.integer(Config.ObstacleSpawnMinInterval, Config.ObstacleSpawnMaxInterval);
        this._spawnTimer.reset(newInterval);
    }
}
//# sourceMappingURL=floor.js.map