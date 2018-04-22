import * as ex from "excalibur";
export class Light extends ex.Actor {
    constructor(args, printer) {
        super(args);
        this.printer = printer;
        this.lit = false;
        this.boardX = 0;
        this.boardY = 0;
    }
    onInitialize() {
        this.on("pointerup", (evt) => {
            if (this.up)
                this.up.lit = !this.up.lit;
            if (this.down)
                this.down.lit = !this.down.lit;
            if (this.left)
                this.left.lit = !this.left.lit;
            if (this.right)
                this.right.lit = !this.right.lit;
            this.lit = !this.lit;
        });
    }
    onPostKill() {
        this.off("pointerup");
    }
    onPostUpdate() {
        if (this.lit) {
            this.color = ex.Color.Yellow.clone();
        }
        else {
            this.color = ex.Color.Violet.clone();
        }
        if (this.printer.isAllLit() || this.printer.isAllDark()) {
            console.log("win");
            this.printer.onSucceed();
        }
    }
}
//# sourceMappingURL=light.js.map