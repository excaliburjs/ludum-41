import { CollatingGame } from "./collating-game/collatingGame";
import { CoffeeGame } from "./coffee-game/coffeeGame";
export class BottomSubscene {
    constructor() { }
    setup(scene) {
        this.startPaperCollating(scene);
    }
    teardown(scene) { }
    startPaperCollating(scene) {
        // TODO load the paper collating mini-game
        var collatingGame = new CollatingGame(scene);
        collatingGame.show();
    }
    startCoffeeGame(scene) {
        let coffeeGame = new CoffeeGame(scene);
        coffeeGame.show();
    }
}
//# sourceMappingURL=bottom.js.map