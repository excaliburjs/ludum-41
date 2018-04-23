import resources from "./resources";

export default class SoundManager {
  static startActionMusic() {
    if (!resources.topBgMusic.isPlaying()) {
      resources.topBgMusic.play();
    }
    resources.topBgMusic.setVolume(0.5);
  }

  static startOfficeAmbience() {
    if (!resources.bottomBgMusic.isPlaying()) {
      resources.bottomBgMusic.play();
    }
    resources.bottomBgMusic.setVolume(0.75);
  }

  static pauseActionMusic() {
    resources.topBgMusic.setVolume(0);
  }

  static pauseOfficeAmbience() {
    resources.bottomBgMusic.setVolume(0);
  }
}
