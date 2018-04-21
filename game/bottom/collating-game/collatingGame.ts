import { Scene, Label, Color } from "excalibur";
import { MiniGame } from "../../bottom/miniGame";
import { OfficeDocSet, OfficeDoc } from "./officeDoc";
import Config from "../../config";
export class CollatingGame extends MiniGame {
  private _scrambledOfficeDocs: Array<OfficeDoc>;
  private _docLabels: Array<Label> = [];
  private _docSet: OfficeDocSet;

  constructor(scene: Scene) {
    super(scene);
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

      this._scrambledOfficeDocs[i].on("pointerup", evt => {
        var clickedDoc = <OfficeDoc>evt.target;
        console.log("clicked " + clickedDoc.pageNumber);
        if (this._docSet.tryAddToSortedStack(clickedDoc)) {
          //update ui
          if (this._docSet.isComplete()) {
            //you won
          }
        }
      });

      var docLabel = new Label({
        x: this._scrambledOfficeDocs[i].x,
        y: this._scrambledOfficeDocs[i].y + 15,
        color: Color.Red,
        text: (this._scrambledOfficeDocs[i].pageNumber + 1).toString()
      });

      docLabel.fontSize = 16;
      this.scene.add(this._scrambledOfficeDocs[i]);
      this.scene.add(docLabel);
      this._docLabels.push(docLabel);
      this.miniGameActors.push(this._scrambledOfficeDocs[i]);
    }
  }

  //shuffle the pages around visually
  public reset(): void {}
}
