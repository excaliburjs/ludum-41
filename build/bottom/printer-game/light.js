import * as ex from "excalibur";
export class Light extends ex.Actor {
    constructor(args) {
        super(args);
        this.lit = false;
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
    onPostUpdate() {
        if (this.lit) {
            this.color = ex.Color.Yellow.clone();
        }
        else {
            this.color = ex.Color.Violet.clone();
        }
    }
}
//# sourceMappingURL=light.js.map