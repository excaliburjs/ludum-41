import resources from "./resources";
export default class SoundManager {
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
//# sourceMappingURL=soundManager.js.map