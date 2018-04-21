/// <reference path="../lib/excalibur-dist/excalibur.d.ts" />
/// <reference path="analytics.ts" />
/// <reference path="config.ts" />
/// <reference path="preferences.ts" />
/// <reference path="resources.ts" />
/// <reference path="scnMain.ts" />
/// <reference path="stats.ts" />

var game = new ex.Engine({
  width: 800,
  height: 600
});

// create an asset loader
var loader = new ex.Loader();

// queue resources for loading
for (var r in Resources) {
  loader.addResource(Resources[r]);
}

var scnMain = new ScnMain(game);
game.addScene("main", scnMain);

// uncomment loader after adding resources
game.start(loader).then(() => {
  game.goToScene("main");

  // TODO: Turn on analytics

  //   Analytics.publish({
  //      commit: 'test',
  //      seed: -1,
  //      started: -1,
  //      date: 'test'
  //   });
});

// TODO remove /////////////////////////////////////////////////////
var gamePaused = false;
game.input.keyboard.on("down", (keyDown?: ex.Input.KeyEvent) => {
  switch (keyDown.key) {
    case ex.Input.Keys.P:
      if (gamePaused) {
        game.start();
        ex.Logger.getInstance().info("game resumed");
      } else {
        game.stop();
        ex.Logger.getInstance().info("game paused");
      }
      gamePaused = !gamePaused;
      break;
    case ex.Input.Keys.Semicolon:
      game.isDebug = !game.isDebug;
      break;
  }
});
////////////////////////////////////////////////////////////////////
