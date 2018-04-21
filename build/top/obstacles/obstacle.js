var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
            t[p[i]] = s[p[i]];
    return t;
};
import * as ex from "excalibur";
import { TopPlayer } from "../top-player";
export class Obstacle extends ex.Actor {
    /**
     *
     */
    constructor(_a) {
        var { x, y, speed, topSubscene } = _a, props = __rest(_a, ["x", "y", "speed", "topSubscene"]);
        super(Object.assign({ x,
            y, collisionType: ex.CollisionType.Passive, vel: new ex.Vector(speed, 0) }, props));
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