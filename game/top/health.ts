import * as ex from "excalibur";
import Config from "../config";
import { gameover } from "../session";
import { GameOverReason } from "../stats";
import resources from "../resources";

export class TopHealth extends ex.Actor {
  public health: number = Config.Health.Default;
  public heartSpriteSheet: ex.SpriteSheet;
  constructor(engine: ex.Engine) {
    super({
      x: 20,
      y: engine.halfDrawHeight - 20,
      anchor: new ex.Vector(0, 1),
      color: ex.Color.Red
    });
  }

  onInitialize() {
    this.z = 4;
    this.heartSpriteSheet = new ex.SpriteSheet({
      image: resources.txHeartSpriteSheet,
      columns: 3,
      rows: 1,
      spWidth: 19,
      spHeight: 18
    });
  }

  onPostUpdate(engine: ex.Engine, delta: number) {
    if (this.health < 1) {
      gameover(engine, GameOverReason.daydream);
      return;
    }
  }

  onPostDraw(ctx: CanvasRenderingContext2D) {
    let fullHealth = Math.floor(this.health / 2);
    let halfHealth = this.health % 2;
    let i = 0;
    for (; i < fullHealth; i++) {
      this.heartSpriteSheet.getSprite(0).draw(ctx, 20 * i, 0);
    }

    if (halfHealth) {
      this.heartSpriteSheet.getSprite(1).draw(ctx, 20 * i, 0);
      i++;
    }
    // no health
    for (
      let j = 0;
      j < Config.Health.Default / 2 - fullHealth - halfHealth;
      j++
    ) {
      this.heartSpriteSheet.getSprite(2).draw(ctx, 20 * (j + i), 0);
    }
  }
}
