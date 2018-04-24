import * as ex from "excalibur";
import { MiniGame, MiniGameType } from "../miniGame";
import { Light } from "./light";
import Config from "../../config";
import resources from "../../resources";
export class PrinterGame extends MiniGame {
    constructor(scene, bottomSubscene) {
        super(scene, bottomSubscene);
        this.miniGameActors = [];
        this.secondsToComplete = 20;
        this.miniGameType = MiniGameType.Printer;
        this._lights = [];
        let copier = new ex.Actor({
            x: 0,
            y: scene.engine.halfDrawHeight,
            anchor: ex.Vector.Zero.clone()
        });
        copier.addDrawing(resources.txCopier);
        this._background = new ex.Actor({
            x: 400,
            y: 600,
            width: 1,
            height: 1
        });
        this._background.addDrawing(resources.txCopierBackground);
        this.scene = scene;
        this._copier = copier;
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
                color: ex.Color.Black.clone()
            }, this);
            this._lights[i].boardX = x;
            this._lights[i].boardY = y;
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
        this.miniGameActors.push(this._background);
        this.miniGameActors.push(this._copier);
        this._lights.forEach(l => this.miniGameActors.push(l));
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
        this._lights.forEach(l => (l.lit = false));
        let litLight = Config.Rand.pickOne(this._lights);
        this.createSolution(litLight);
    }
    createSolution(light) {
        let x = light.boardX;
        let y = light.boardY;
        light.lit = true;
        if (light.up)
            light.up.lit = true;
        if (light.down)
            light.down.lit = true;
        if (light.left)
            light.left.lit = true;
        if (light.right)
            light.right.lit = true;
    }
}
//# sourceMappingURL=printer-game.js.map