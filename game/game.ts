import { Engine, Loader, Logger, Input, Physics } from "excalibur";
import { ScnMain } from "./scnMain";
import Resources from "./resources";
import Config from "./config";

var game = new Engine({
  width: Config.GameWidth,
  height: Config.GameHeight
});

// Physics
// ex.Physics.collisionResolutionStrategy = ex.CollisionResolutionStrategy.RigidBody
// ex.Physics.allowRigidBodyRotation = false;
Physics.checkForFastBodies = true;

// create an asset loader
var loader = new Loader();

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
game.input.keyboard.on("down", (keyDown?: Input.KeyEvent) => {
  switch (keyDown.key) {
    case Input.Keys.P:
      if (gamePaused) {
        game.start();
        Logger.getInstance().info("game resumed");
      } else {
        game.stop();
        Logger.getInstance().info("game paused");
      }
      gamePaused = !gamePaused;
      break;
    case Input.Keys.Semicolon:
      game.isDebug = !game.isDebug;
      break;
  }
});
////////////////////////////////////////////////////////////////////
