import { GameOverReason, Stats } from "./stats";

var stats: Stats;

export function getStats() {
  return stats;
}

export function newgame(game: ex.Engine) {
  // clear stats
  stats = new Stats();

  // begin main scene
  game.goToScene("main");
}

export function gameover(game: ex.Engine, reason: GameOverReason) {
  // TODO record stats
  stats.gameOverReason = reason;
  game.goToScene("end");
}
