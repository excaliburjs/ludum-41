import { Actor, Color, Vector } from "excalibur";
import { MiniGame } from "../../bottom/miniGame";
import { OfficeDocSet } from "./officeDoc";
import Config from "../../config";
import Resources from "../../resources";
export class CollatingGame extends MiniGame {
    constructor(scene, winsRequired, bottomSubscene) {
        super(scene, bottomSubscene);
        this._docLabels = [];
        this._winsRequired = 0;
        this._currentWins = 0;
        this._winsRequired = winsRequired;
        var numDocs = Config.MiniGames.Collating.NumberOfDocuments;
        const bg = new Actor({
            x: 0,
            y: this.scene.engine.drawHeight / 2,
            anchor: Vector.Zero
        });
        bg.addDrawing(Resources.txCollateBackground);
        this.miniGameActors.push(bg);
        this._docSet = new OfficeDocSet(numDocs);
        this._scrambledOfficeDocs = this._docSet.getScrambledDocumentSet();
        for (let i = 0; i < this._scrambledOfficeDocs.length; i++) {
            //add to the scene here
            // this._scrambledOfficeDocs[i].x = 100 * i + 200;
            this._scrambledOfficeDocs[i].setWidth(100);
            this._scrambledOfficeDocs[i].setHeight(150);
            this._scrambledOfficeDocs[i].y = Config.MiniGames.Collating.OriginalDocY;
            this.wireUpClickEvent(this._scrambledOfficeDocs[i]);
            // var docLabel = new Label({
            //   x: this._scrambledOfficeDocs[i].x,
            //   y: this._scrambledOfficeDocs[i].y + 50,
            //   color: Color.Red,
            //   text: (this._scrambledOfficeDocs[i].pageNumber + 1).toString()
            // });
            // docLabel.fontSize = 16;
            // this._docLabels.push(docLabel);
            // this.miniGameActors.push(docLabel);
            this.miniGameActors.push(this._scrambledOfficeDocs[i]);
        }
    }
    setup() {
        this.resetDocuments();
    }
    reset() { }
    wireUpClickEvent(officeDoc) {
        officeDoc.on("pointerdown", evt => {
            var clickedDoc = evt.target;
            if (this._docSet.tryAddToSortedStack(clickedDoc)) {
                //update ui
                clickedDoc.color = Color.Magenta;
                clickedDoc.actions.moveTo(Config.MiniGames.Collating.OutboxPos.x, Config.MiniGames.Collating.OutboxPos.y, 1500); //3000);
                if (this._docSet.isComplete()) {
                    //you won
                    console.log("you won the collating game");
                    this._currentWins++;
                    if (this._currentWins >= this._winsRequired) {
                        //move on to the next mini game
                        this._currentWins = 0;
                        this.onSucceed();
                    }
                    else {
                        clickedDoc.actions.callMethod(() => {
                            this.resetDocuments();
                        });
                    }
                }
            }
        });
    }
    //shuffle the pages around visually
    resetDocuments() {
        this._docSet.clear();
        this._scrambledOfficeDocs = this._docSet.getScrambledDocumentSet();
        for (let i = 0; i < this._scrambledOfficeDocs.length; i++) {
            this._scrambledOfficeDocs[i].x = Config.MiniGames.Collating.InboxPos.x;
            this._scrambledOfficeDocs[i].y = Config.MiniGames.Collating.InboxPos.y;
            this._scrambledOfficeDocs[i].actions
                .delay(750)
                .moveTo(125 * i + 150, Config.MiniGames.Collating.OriginalDocY, 1500);
            // this._scrambledOfficeDocs[i].x = 125 * i + 150;
            // this._scrambledOfficeDocs[i].y = Config.MiniGames.Collating.OriginalDocY;
            this._scrambledOfficeDocs[i].color = Color.Green;
            // this._docLabels[i].text = (
            //   this._scrambledOfficeDocs[i].pageNumber + 1
            // ).toString();
        }
    }
}
//# sourceMappingURL=collatingGame.js.map