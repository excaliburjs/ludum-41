import { Stats } from "./stats";
import { createRand } from "./config";
var stats;
export function getStats() {
    return stats;
}
export function newgame(game) {
    // clear stats
    stats = new Stats();
    // New random
    createRand();
    // begin main scene
    game.goToScene("main");
}
export function gameover(game, reason) {
    // TODO record stats
    stats.gameOverReason = reason;
    game.goToScene("end");
}
//# sourceMappingURL=session.js.map