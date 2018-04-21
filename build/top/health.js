import * as ex from "excalibur";
import Config from "../config";
export class TopHealth extends ex.Label {
    constructor(engine) {
        super({
            x: Config.Health.Pos.x,
            y: Config.Health.Pos.y + Config.Health.FontSize,
            fontSize: Config.Health.FontSize,
            fontUnit: ex.FontUnit.Px,
            anchor: ex.Vector.Zero.clone(),
            color: ex.Color.Red,
            text: Config.Health.Default.toString()
        });
        this.health = Config.Health.Default;
    }
    onInitialize() {
        this.z = 4;
    }
    onPostUpdate(engine, delta) {
        if (this.health < 1) {
            engine.goToScene("end");
            return;
        }
        this.text = this.health.toString();
    }
}
//# sourceMappingURL=health.js.map