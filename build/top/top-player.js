import * as ex from "excalibur";
import Config from "../config";
import Resources from "../resources";
export class TopPlayer extends ex.Actor {
    constructor(engine) {
        super({
            x: engine.drawWidth / 4,
            y: engine.drawHeight / 4,
            acc: new ex.Vector(0, 800),
            width: Config.TopPlayer.Width,
            height: Config.TopPlayer.Height,
            color: ex.Color.Blue,
            collisionType: ex.CollisionType.Active
        });
        this.engine = engine;
        this.canJump = false;
        engine.input.pointers.primary.on("down", this.handleInput.bind(this));
        this.on("precollision", this.handleCollision.bind(this));
    }
    onInitialize() {
        this.addDrawing(Resources.txBike);
    }
    // le-sigh workaround for odd collision tunneling issue
    handleCollision(event) {
        if (event.side === ex.Side.Bottom) {
            this.canJump = true;
        }
    }
    handleInput(event) {
        ex.Logger.getInstance().debug("event:", event);
        if (event.worldPos.y < this.engine.halfDrawHeight) {
            this.jump();
        }
    }
    jump() {
        if (this.canJump) {
            this.vel = this.vel.add(new ex.Vector(0, -400));
            this.acc = new ex.Vector(0, 800);
            this.canJump = false;
        }
    }
    onPostUpdate(engine, delta) {
        if (!this.canJump) {
            let virtualVel = new ex.Vector(-Config.Floor.Speed, ex.Util.clamp(this.vel.y, -50, 50));
            this.rotation = virtualVel.toAngle();
        }
        else {
            this.rotation = 0;
        }
        this.vel.x = 0;
    }
}
//# sourceMappingURL=top-player.js.map