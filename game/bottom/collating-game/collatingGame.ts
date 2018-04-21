import { Scene, Label, Color } from "excalibur";
import { MiniGame } from "../../bottom/miniGame";
import { OfficeDocSet, OfficeDoc } from "./officeDoc";
import Config from "../../config";
import { BottomSubscene } from "../bottom";

export class CollatingGame extends MiniGame {
  private _scrambledOfficeDocs: Array<OfficeDoc>;
  private _docLabels: Array<Label> = [];
  private _docSet: OfficeDocSet;
  private _winsRequired: number = 0;
  private _currentWins: number = 0;

  constructor(
    scene: Scene,
    winsRequired: number,
    bottomSubscene: BottomSubscene
  ) {
    super(scene, bottomSubscene);
    this._winsRequired = winsRequired;
  }

  protected setup(): void {
    var numDocs = Config.MiniGames.Collating.NumberOfDocuments;
    this._docSet = new OfficeDocSet(numDocs);
    this._scrambledOfficeDocs = this._docSet.getScrambledDocumentSet();
    //this.reset();
    for (let i = 0; i < this._scrambledOfficeDocs.length; i++) {
      //add to the scene here
      this._scrambledOfficeDocs[i].x = 100 * i + 200;
      this._scrambledOfficeDocs[i].setWidth(50);
      this._scrambledOfficeDocs[i].setHeight(50);
      this._scrambledOfficeDocs[i].y = 500;

      this.wireUpClickEvent(this._scrambledOfficeDocs[i]);

      var docLabel = new Label({
        x: this._scrambledOfficeDocs[i].x,
        y: this._scrambledOfficeDocs[i].y + 50,
        color: Color.Red,
        text: (this._scrambledOfficeDocs[i].pageNumber + 1).toString()
      });

      docLabel.fontSize = 16;
      this._docLabels.push(docLabel);
      this.miniGameActors.push(docLabel);
      this.miniGameActors.push(this._scrambledOfficeDocs[i]);
    }
  }

  public reset(): void {}

  private wireUpClickEvent(officeDoc: OfficeDoc) {
    officeDoc.on("pointerup", evt => {
      var clickedDoc = <OfficeDoc>evt.target;
      if (this._docSet.tryAddToSortedStack(clickedDoc)) {
        //update ui
        clickedDoc.color = Color.Magenta;
        if (this._docSet.isComplete()) {
          //you won
          console.log("you won the collating game");
          this._currentWins++;
          if (this._currentWins >= this._winsRequired) {
            //move on to the next mini game
            this._currentWins = 0;
            this.onSucceed();
          } else {
            this.resetDocuments();
          }
        }
      }
    });
  }

  //shuffle the pages around visually
  private resetDocuments(): void {
    this._docSet.clear();
    this._scrambledOfficeDocs = this._docSet.getScrambledDocumentSet();
    for (let i = 0; i < this._scrambledOfficeDocs.length; i++) {
      this._scrambledOfficeDocs[i].x = 100 * i + 200;
      this._scrambledOfficeDocs[i].color = Color.Green;
      this._docLabels[i].text = (
        this._scrambledOfficeDocs[i].pageNumber + 1
      ).toString();
    }
  }
}
