import * as ex from "excalibur";
import { MiniGame } from "../miniGame";
import { Light } from "./light";
import Config from "../../config";
import resources from "../../resources";
export class PrinterGame extends MiniGame {
    constructor(scene, bottomSubscene) {
        super(scene, bottomSubscene);
        this.miniGameActors = [];
        this._lights = [];
        let copier = new ex.Actor({
            x: 0,
            y: scene.engine.halfDrawHeight,
            anchor: ex.Vector.Zero.clone()
        });
        copier.addDrawing(resources.txCopierBackground);
        this.scene = scene;
        this.scene.add(copier);
        copier.z = -2;
    }
    getLight(x, y) {
        let index = x + y * Config.PrinterMiniGame.GridDimension;
        if (index < 0 || index > this._lights.length - 1) {
            return null;
        }
        if (x >= Config.PrinterMiniGame.GridDimension ||
            y >= Config.PrinterMiniGame.GridDimension) {
            return null;
        }
        if (x < 0 || y < 0) {
            return null;
        }
        return this._lights[index];
    }
    isAllLit() {
        return this._lights.reduce((prev, curr) => prev && curr.lit, true);
    }
    isAllDark() {
        return this._lights.reduce((prev, curr) => prev && !curr.lit, true);
    }
    setup() {
        this._lights = [];
        for (let i = 0; i <
            Config.PrinterMiniGame.GridDimension *
                Config.PrinterMiniGame.GridDimension; i++) {
            let x = i % Config.PrinterMiniGame.GridDimension;
            let y = Math.floor(i / Config.PrinterMiniGame.GridDimension);
            this._lights[i] = new Light({
                x: x * Config.PrinterMiniGame.PrinterSpacing +
                    Config.PrinterMiniGame.PrinterStartX,
                y: y * Config.PrinterMiniGame.PrinterSpacing +
                    Config.PrinterMiniGame.PrinterStartY,
                width: 20,
                height: 20,
                color: ex.Color.Violet.clone()
            }, this);
        }
        let width = Config.PrinterMiniGame.GridDimension;
        for (let i = 0; i < this._lights.length; i++) {
            let light = this._lights[i];
            let x = i % Config.PrinterMiniGame.GridDimension;
            let y = Math.floor(i / Config.PrinterMiniGame.GridDimension);
            light.up = this.getLight(x, y - 1);
            light.down = this.getLight(x, y + 1);
            light.left = this.getLight(x - 1, y);
            light.right = this.getLight(x + 1, y);
        }
        let litLight = Config.Rand.pickOne(this._lights);
        litLight.lit = true;
        this.miniGameActors = this._lights;
    }
}
//# sourceMappingURL=printer-game.js.map