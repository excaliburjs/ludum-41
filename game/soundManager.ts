import resources from "./resources";
import * as ex from "excalibur";
import { Sound } from "excalibur";

export default class SoundManager {
  static allMuted: boolean = false;
  static musicMuted: boolean = false;
  static init() {
    document.getElementById("mute-music").addEventListener("click", () => {
      if (this.musicMuted) {
        this.unmuteMusic();
      } else {
        this.muteMusic();
      }
      SoundManager._updateMusicButton();
    });

    document.getElementById("mute-all").addEventListener("click", () => {
      if (this.allMuted) {
        this.unmuteAll();
      } else {
        this.muteAll();
      }
    });
  }

  private static _updateMusicButton() {
    document.querySelector("#mute-music i").classList.toggle("fa-music");
    document.querySelector("#mute-music i").classList.toggle("fa-play");
  }

  private static _updateMuteAllButton() {
    document.querySelector("#mute-all i").classList.toggle("fa-volume-off");
    document.querySelector("#mute-all i").classList.toggle("fa-volume-up");
  }

  static muteMusic() {
    SoundManager.musicMuted = true;
    this.pauseActionMusic();
    this.pauseOfficeAmbience();
  }

  static unmuteMusic() {
    SoundManager.musicMuted = false;
    this.startOfficeAmbience();
  }

  static muteAll() {
    SoundManager.allMuted = true;
    SoundManager.musicMuted = true;

    for (let r in resources) {
      let snd = resources[r];
      if (snd instanceof ex.Sound) {
        snd.setVolume(0);
      }
    }
    // SoundManager.muteBackgroundMusic();
    SoundManager._updateMuteAllButton();
  }

  static unmuteAll() {
    SoundManager.allMuted = false;
    SoundManager.musicMuted = false;

    for (let r in resources) {
      let snd = resources[r];
      if (snd instanceof ex.Sound) {
        snd.setVolume(1);
      }
    }
    this.startOfficeAmbience();
    SoundManager._updateMuteAllButton();
  }

  static startActionMusic() {
    if (this.allMuted || this.musicMuted) return;
    resources.topBgMusic.setVolume(0.3);
    resources.topBgMusic.setLoop(true);
    if (!resources.topBgMusic.isPlaying()) {
      resources.topBgMusic.play();
    }
  }

  static startOfficeAmbience() {
    if (this.allMuted || this.musicMuted) return;
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
