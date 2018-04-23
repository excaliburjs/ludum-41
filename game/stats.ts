export enum GameOverReason {
  daydream,
  minigame,
  workdayComplete,
  debug
}

export class Stats {
  protected startTime = Date.now();
  public get start() {
    return this.startTime;
  }
  public gameOverReason: GameOverReason;
  public topHealth: number;
  public get duration() {
    return Date.now() - this.startTime;
  }
  public miniGamesCompleted = 0;
}
