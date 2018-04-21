import * as ex from "excalibur";
import { TopPlayer } from "../top-player";
export class Obstacle extends ex.Actor {
    /**
     *
     */
    constructor({ x, y, speed, topSubscene }) {
        super({
            x,
            y,
            vel: new ex.Vector(speed, 0)
        });
        this.onExitViewPort = (engine) => (e) => {
            // When obstacle passes out of view to the left,
            // it should be killed
            if (e.target.x < engine.getWorldBounds().left) {
                ex.Logger.getInstance().debug("Obstacle exited stage left", e.target);
                e.target.kill();
            }
        };
        this.onCollision = (event) => {
            if (event.other instanceof TopPlayer) {
                this.topSubscene.healthMeter.health--;
            }
        };
        this.topSubscene = topSubscene;
        // Anchor to bottom since
        // we will be placing it on a "floor"
        this.anchor.setTo(0.5, 1);
    }
    onInitialize(engine) {
        this.on("exitviewport", this.onExitViewPort(engine));
        this.on("collisionstart", this.onCollision);
    }
}
//# sourceMappingURL=obstacle.js.map