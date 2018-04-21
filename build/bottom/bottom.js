import { BottomPlayer } from "./bottomPlayer";
import * as ex from "excalibur";
export class Bottom {
    constructor() {
        this.bottomPlayer = new BottomPlayer({
            x: 400,
            y: 400,
            width: 50,
            height: 50,
            color: ex.Color.Blue
        });
    }
    setup(scene) {
        // TODO add the bottom player
        scene.add(this.bottomPlayer);
    }
    startPaperCollating() {
        // TODO open the paper collating window
    }
}
//# sourceMappingURL=bottom.js.map