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
import Config from "../config";
export class Platform extends ex.Actor {
    constructor(_a) {
        var { x, y, speed } = _a, props = __rest(_a, ["x", "y", "speed"]);
        super({
            x,
            y,
            height: Config.Platform.Height,
            width: Config.Platform.Width,
            color: ex.Color.Gray,
            collisionType: ex.CollisionType.Fixed,
            vel: new ex.Vector(speed, 0)
            // Anchor to bottom since
            // we will be placing it on a "floor"
        });
        this.onExitViewPort = (engine) => (e) => {
            // When obstacle passes out of view to the left, NOT from the right ;)
            // it should be killed
            if (e.target.x < engine.getWorldBounds().left) {
                ex.Logger.getInstance().debug("Obstacle exited stage left", e.target);
                e.target.kill();
            }
        };
    }
    onInitialize(engine) {
        this.on("exitviewport", this.onExitViewPort(engine));
        this.scene.on("deactivate", () => this.kill());
    }
}
//# sourceMappingURL=platform.js.map