import { Texture, Sound } from "excalibur";

export default {
  txBike: new Texture("game/assets/img/bike.png"),
  txTNTSpriteSheet: new Texture("game/assets/img/tnt.png"),
  txBombSpriteSheet: new Texture("game/assets/img/bomb.png"),
  txBackground: new Texture("game/assets/img/top-bg.png"),
  txGurter: new Texture("game/assets/img/gurter.png"),
  txHeartSpriteSheet: new Texture("game/assets/img/heart.png"),

  txCollateBackground: new Texture("game/assets/img/collate-bg.png"),
  txDocPieChart: new Texture("game/assets/img/pieChartSubmit.png"),
  txDocBarGraph: new Texture("game/assets/img/barGraphSubmit.png"),
  txDocLineGraph: new Texture("game/assets/img/lineGraphSubmit.png"),
  txDocVennDiagram: new Texture("game/assets/img/vennDiagramSubmit.png"),
  txDocMoney: new Texture("game/assets/img/moneySubmit.png"),

  txCoffeeMaker: new Texture("game/assets/img/coffee-maker.png"),
  txCoffeeGrounds: new Texture("game/assets/img/coffee-grounds.png"),
  txCoffeeFilter: new Texture("game/assets/img/coffee-filters.png"),
  txCoffeeCup: new Texture("game/assets/img/coffee-cup.png"),
  txCoffeeBackground: new Texture("game/assets/img/coffee-game-bg.png"),

  txCopier: new Texture("game/assets/img/printer.png"),
  txCopierBackground: new Texture("game/assets/img/copy-game-bg.png"),

  txOverlay: new Texture("game/assets/img/office-overlay.png"),
  txCursor: new Texture("game/assets/img/thehand.png"),
  txTimerBg: new Texture("game/assets/img/timerbg.png"),

  txGameOverScreen: new Texture("game/assets/img/game-end-bg.png"),

  topBgMusic: new Sound(
    "game/assets/snd/extremeaction.mp3",
    "game/assets/snd/extremeaction.wav"
  ),
  bottomBgMusic: new Sound(
    "game/assets/snd/office-ambience.mp3",
    "game/assets/snd/office-ambience.wav"
  ),

  hitSound: new Sound(
    "game/assets/snd/hitSound.mp3",
    "game/assets/snd/hitSound.wav"
  ),

  shortBeep: new Sound(
    "game/assets/snd/shortBeep.mp3",
    "game/assets/snd/shortBeep.wav"
  ),

  coffeePour: new Sound(
    "game/assets/snd/coffeePour.mp3",
    "game/assets/snd/coffeePour.wav"
  )
  //sampleSnd: new Sound("game/assets/snd/sample-sound.wav")
};
