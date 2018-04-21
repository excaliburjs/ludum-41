import { BottomPlayer } from "./bottomPlayer";
import * as ex from "excalibur";

export class Bottom {
  private bottomPlayer: BottomPlayer;

  constructor() {
    this.bottomPlayer = new BottomPlayer({
      x: 400,
      y: 400,
      width: 50,
      height: 50,
      color: ex.Color.Blue
    });
  }
  public setup(scene: ex.Scene) {
    // TODO add the bottom player
    scene.add(this.bottomPlayer);
  }

  public startPaperCollating() {
    // TODO open the paper collating window
  }
}
