import * as ex from "excalibur";
import { PrinterGame } from "./printer-game";
import soundManager from "../../soundManager";
import Config from "../../config";

export class Light extends ex.Actor {
  public up: Light;
  public down: Light;
  public left: Light;
  public right: Light;
  public lit: boolean = false;
  public boardX: number = 0;
  public boardY: number = 0;

  constructor(args: ex.IActorArgs, private printer: PrinterGame) {
    super(args);
  }

  onInitialize() {
    this.on("pointerdown", (evt: ex.Input.PointerEvent) => {
      if (Config.PrinterMiniGame.HardMode) {
        if (this.up) this.up.lit = !this.up.lit;
        if (this.down) this.down.lit = !this.down.lit;
        if (this.left) this.left.lit = !this.left.lit;
        if (this.right) this.right.lit = !this.right.lit;
      }
      this.lit = !this.lit;
      soundManager.playShortBeep();
    });
  }

  onPostUpdate() {
    if (this.lit) {
      this.color = ex.Color.White.clone();
    } else {
      this.color = ex.Color.Black.clone();
    }
    if (this.printer.active) {
      if (this.printer.isAllLit() || this.printer.isAllDark()) {
        console.log("win");
        this.printer.onSucceed();
      }
    }
  }
}
