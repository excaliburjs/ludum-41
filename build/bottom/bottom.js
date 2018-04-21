import { CollatingGame } from "./collating-game/collatingGame";
export class BottomSubscene {
    constructor() { }
    setup(scene) {
        this.startPaperCollating(scene);
    }
    startPaperCollating(scene) {
        // TODO load the paper collating mini-game
        var collatingGame = new CollatingGame(scene);
        collatingGame.show();
    }
    startTalkToCoworker() {
        // TODO load the coworker conversation mini-game
    }
    startPrinter() {
        // TODO start the printer mini-game
    }
}
//# sourceMappingURL=bottom.js.map