abstract class MiniGame {
  protected abstract setup(): void;

  public show(): void {}

  public hide(): void {}

  public onSucceed(): void {
    this.hide();
  }

  public onFail(): void {
    this.hide();
  }
}
