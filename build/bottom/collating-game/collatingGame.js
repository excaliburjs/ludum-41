import { Actor, Color, Vector, SpriteSheet, EasingFunctions } from "excalibur";
import { MiniGame, MiniGameType } from "../../bottom/miniGame";
import { OfficeDocSet } from "./officeDoc";
import Config from "../../config";
import Resources from "../../resources";
import soundManager from "../../soundManager";
export class CollatingGame extends MiniGame {
    constructor(scene, winsRequired, bottomSubscene) {
        super(scene, bottomSubscene);
        this._docLabels = [];
        this._winsRequired = 0;
        this._currentWins = 0;
        this.secondsToComplete = 30;
        this.miniGameType = MiniGameType.Collate;
        this._art = [];
        this._winsRequired = winsRequired;
        var numDocs = Config.MiniGames.Collating.NumberOfDocuments;
        this.setupDocDrawings();
        const bg = new Actor({
            x: 0,
            y: this.scene.engine.drawHeight / 2,
            anchor: Vector.Zero
        });
        bg.addDrawing(Resources.txCollateBackground);
        this.miniGameActors.push(bg);
        this._docSet = new OfficeDocSet(numDocs, this._art);
        this._scrambledOfficeDocs = this._docSet.getScrambledDocumentSet();
        for (let i = 0; i < this._scrambledOfficeDocs.length; i++) {
            //add to the scene here
            // this._scrambledOfficeDocs[i].x = 100 * i + 200;
            this._scrambledOfficeDocs[i].setWidth(100);
            this._scrambledOfficeDocs[i].setHeight(150);
            this._scrambledOfficeDocs[i].y = Config.MiniGames.Collating.OriginalDocY;
            this.wireUpClickEvent(this._scrambledOfficeDocs[i]);
            this.miniGameActors.push(this._scrambledOfficeDocs[i]);
        }
    }
    setup() {
        this.resetDocuments(true);
    }
    reset() { }
    wireUpClickEvent(officeDoc) {
        officeDoc.on("pointerdown", evt => {
            var clickedDoc = evt.target;
            if (this._docSet.tryAddToSortedStack(clickedDoc)) {
                //update ui
                clickedDoc.color = Color.Magenta;
                clickedDoc.actions
                    .callMethod(() => {
                    clickedDoc.setDrawing("default");
                    soundManager.playPageFlipSound();
                })
                    .easeTo(Config.MiniGames.Collating.OutboxPos.x, Config.MiniGames.Collating.OutboxPos.y, 500, EasingFunctions.EaseInOutQuad);
                if (this._docSet.isComplete()) {
                    //you won
                    console.log("you won the collating game");
                    this._currentWins++;
                    if (this._currentWins >= this._winsRequired) {
                        //move on to the next mini game
                        this._currentWins = 0;
                        clickedDoc.actions.callMethod(() => {
                            this.onSucceed();
                        });
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
    resetDocuments(initial) {
        this._docSet.clear();
        this._scrambledOfficeDocs = this._docSet.getScrambledDocumentSet();
        for (let i = 0; i < this._scrambledOfficeDocs.length; i++) {
            if (!initial) {
                this._scrambledOfficeDocs[i].actions.easeTo(Config.MiniGames.Collating.OutboxPos.x + 200, Config.MiniGames.Collating.OutboxPos.y, 500, EasingFunctions.EaseInOutQuad);
            }
            this._scrambledOfficeDocs[i].actions
                .callMethod(() => {
                this._scrambledOfficeDocs[i].x =
                    Config.MiniGames.Collating.InboxPos.x - 300;
                this._scrambledOfficeDocs[i].y =
                    Config.MiniGames.Collating.InboxPos.y;
            })
                .easeTo(Config.MiniGames.Collating.InboxPos.x, Config.MiniGames.Collating.InboxPos.y, 500, EasingFunctions.EaseInOutQuad)
                .delay(250)
                .easeTo(125 * i + 150, Config.MiniGames.Collating.OriginalDocY, 500, EasingFunctions.EaseInOutQuad)
                .callMethod(() => {
                this._scrambledOfficeDocs[i].setDrawing("numbered");
            });
            this._scrambledOfficeDocs[i].color = Color.Green;
        }
    }
    setupDocDrawings() {
        // 0 pie chart
        this._art[0] = new SpriteSheet(Resources.txDocPieChart, 2, 1, 100, 150);
        // 1 bar graph
        this._art[1] = new SpriteSheet(Resources.txDocBarGraph, 2, 1, 100, 150);
        // 2 line graph
        this._art[2] = new SpriteSheet(Resources.txDocLineGraph, 2, 1, 100, 150);
        // 3 venn diagram
        this._art[3] = new SpriteSheet(Resources.txDocVennDiagram, 2, 1, 100, 150);
        // 4 money diagram
        this._art[4] = new SpriteSheet(Resources.txDocMoney, 2, 1, 100, 150);
    }
}
//# sourceMappingURL=collatingGame.js.map