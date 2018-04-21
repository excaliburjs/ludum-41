import { MiniGame } from "../../bottom/miniGame";
import { OfficeDocSet } from "./officeDoc";
import Config from "../../config";
export class CollatingGame extends MiniGame {
    constructor(scene) {
        super(scene);
    }
    setup() {
        var numDocs = Config.MiniGames.Collating.NumberOfDocuments;
        var docSet = new OfficeDocSet(numDocs);
        this._scrambledOfficeDocs = docSet.getScrambledDocumentSet();
        for (let i = 0; i < this._scrambledOfficeDocs.length; i++) {
            //add to the scene here
            this.scene.add(this._scrambledOfficeDocs[i]);
            this.miniGameActors.push(this._scrambledOfficeDocs[i]);
        }
    }
    reset() { }
    start() { }
    finish() { }
}
//# sourceMappingURL=collatingGame.js.map