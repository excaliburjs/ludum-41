import resources from "./resources";

export default class SoundManager {
  static startActionMusic() {
    resources.topBgMusic.setVolume(0.3);
    resources.topBgMusic.setLoop(true);
    if (!resources.topBgMusic.isPlaying()) {
      resources.topBgMusic.play();
    }
  }

  static startOfficeAmbience() {
    resources.bottomBgMusic.setVolume(0.85);
    resources.bottomBgMusic.setLoop(true);
    if (!resources.bottomBgMusic.isPlaying()) {
      resources.bottomBgMusic.play();
    }
  }

  static pauseActionMusic() {
    resources.topBgMusic.setVolume(0);
  }

  static pauseOfficeAmbience() {
    resources.bottomBgMusic.setVolume(0);
  }

  static stopBackgroundAudio() {
    resources.bottomBgMusic.stop();
    resources.topBgMusic.stop();
  }

  static playHitSound() {
    resources.hitSound.setVolume(0.7);
    resources.hitSound.play();
  }

  static playShortBeep() {
    resources.shortBeep.play();
  }
}
