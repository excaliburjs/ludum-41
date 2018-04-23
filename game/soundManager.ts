import resources from "./resources";

export class SoundManager {
  static startActionMusic() {
    resources.topBgMusic.play();
  }

  static startOfficeAmbience() {
    resources.bottomBgMusic.play();
  }

  static pauseActionMusic() {
    resources.topBgMusic.pause();
  }

  static pauseOfficeAmbience() {
    resources.bottomBgMusic.pause();
  }
}
