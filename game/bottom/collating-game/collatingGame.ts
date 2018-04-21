import { Scene, Label, Color } from "excalibur";
import { MiniGame } from "../../bottom/miniGame";
import { OfficeDocSet, OfficeDoc } from "./officeDoc";
import Config from "../../config";
export class CollatingGame extends MiniGame {
  private _scrambledOfficeDocs: Array<OfficeDoc>;
  private _docLabels: Array<Label> = [];

  constructor(scene: Scene) {
    super(scene);
  }

  protected setup(): void {
    var numDocs = Config.MiniGames.Collating.NumberOfDocuments;
    var docSet = new OfficeDocSet(numDocs);
    this._scrambledOfficeDocs = docSet.getScrambledDocumentSet();
    for (let i = 0; i < this._scrambledOfficeDocs.length; i++) {
      //add to the scene here
      this._scrambledOfficeDocs[i].x = 100 * i + 200;
      this._scrambledOfficeDocs[i].setWidth(50);
      this._scrambledOfficeDocs[i].setHeight(50);
      this._scrambledOfficeDocs[i].y = 500;
      var docLabel = new Label({
        x: this._scrambledOfficeDocs[i].x,
        y: this._scrambledOfficeDocs[i].y + 15,
        color: Color.Red,
        text: this._scrambledOfficeDocs[i].pageNumber.toString()
      });
      docLabel.fontSize = 16;
      this.scene.add(this._scrambledOfficeDocs[i]);
      this.scene.add(docLabel);
      this._docLabels.push(docLabel);
      this.miniGameActors.push(this._scrambledOfficeDocs[i]);
    }
  }

  //shuffle the pages around visually
  public reset(): void {
    for (let i = 0; i < this._scrambledOfficeDocs.length; i++) {
      if (this._scrambledOfficeDocs[i] instanceof OfficeDoc) {
        this._scrambledOfficeDocs[i].x = 100 * i + 200;
        var label = this._scrambledOfficeDocs[i].pageNumber + 1;
        this._docLabels[i].text = label.toString();
      }
    }
  }
}
