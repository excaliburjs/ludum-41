import * as ex from "excalibur";
import Config from "../config";
import { gameover } from "../session";
import { GameOverReason } from "../stats";

export class TopHealth extends ex.Label {
  public health: number = Config.Health.Default;
  constructor(engine: ex.Engine) {
    super({
      x: Config.Health.Pos.x,
      y: Config.Health.Pos.y + Config.Health.FontSize,
      fontSize: Config.Health.FontSize,
      fontUnit: ex.FontUnit.Px,
      anchor: ex.Vector.Zero.clone(),
      color: ex.Color.Red,
      text: Config.Health.Default.toString()
    });
  }

  onInitialize() {
    this.z = 4;
  }

  onPostUpdate(engine: ex.Engine, delta: number) {
    if (this.health < 1) {
      gameover(engine, GameOverReason.daydream);
      return;
    }

    this.text = this.health.toString();
  }
}
