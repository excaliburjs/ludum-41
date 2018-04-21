import { Scene } from "excalibur";
import { MiniGame } from "../../bottom/miniGame";
import { OfficeDocSet, OfficeDoc } from "./officeDoc";
import Config from "../../config";
export class CollatingGame extends MiniGame {
  private _scrambledOfficeDocs: Array<OfficeDoc>;

  constructor(scene: Scene) {
    super(scene);
  }

  protected setup(): void {
    var numDocs = Config.MiniGames.Collating.NumberOfDocuments;
    var docSet = new OfficeDocSet(numDocs);
    this._scrambledOfficeDocs = docSet.getScrambledDocumentSet();
    for (let i = 0; i < this._scrambledOfficeDocs.length; i++) {
      //add to the scene here
      this.scene.add(this._scrambledOfficeDocs[i]);
      this.miniGameActors.push(this._scrambledOfficeDocs[i]);
    }
  }

  public reset(): void {}

  public start(): void {}

  public finish(): void {}
}
