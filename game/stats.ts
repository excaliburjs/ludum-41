export enum GameOverReason {
  daydream,
  minigame,
  debug
}

export class Stats {
  protected startTime = Date.now();
  public gameOverReason: GameOverReason;
  public topHealth: number;
  public get duration() {
    return this.startTime - Date.now();
  }
  public miniGamesCompleted = 0;
}
