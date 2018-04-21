(function (ex) {
    'use strict';

    class ScnEnd extends ex.Scene {
        onInitialize(engine) {
            const gameOverLabel = new ex.Label({
                x: this.engine.drawWidth / 2,
                y: this.engine.drawHeight / 2,
                text: "Your boss caught you daydreaming. Game over.",
                textAlign: ex.TextAlign.Center,
                fontSize: 36,
                fontFamily: "Arial"
            });
            this.add(gameOverLabel);
            const resetButton = new ResetButton({
                x: engine.drawWidth / 2,
                y: engine.drawHeight / 2 + 100
            });
            this.add(resetButton);
        }
    }
    class ResetButton extends ex.Actor {
        /**
         *
         */
        constructor({ x, y }) {
            super({ x, y, width: 100, height: 50, color: ex.Color.Blue });
        }
        onInitialize(engine) {
            this.on("pointerup", () => this.reset(engine));
            const resetLabel = new ex.Label({
                x: 0,
                y: 15,
                text: "Restart",
                textAlign: ex.TextAlign.Center,
                fontSize: 24,
                color: ex.Color.White
            });
            this.add(resetLabel);
        }
        reset(engine) {
            engine.goToScene("main");
        }
    }

    const rand = new ex.Random(12345678910);
    var Config = {
        AnalyticsEndpoint: "https://ludum41stats.azurewebsites.net/api/HttpLudum41StatsTrigger?code=eumYNdyRh0yfBAk0NLrfrKkXxtGsX7/Jo5gAcYo13k3GcVFNBdG3yw==",
        GameWidth: 800,
        GameHeight: 600,
        // Top Floor config
        Floor: {
            Speed: -100,
            Height: 5
        },
        // Top Player config
        TopPlayer: {
            Width: 30,
            Height: 50
        },
        Health: {
            Pos: new ex.Vector(10, 10),
            Default: 10,
            FontSize: 50
        },
        MiniGames: {
            Collating: {
                NumberOfDocuments: 5
            }
        },
        Platform: {
            Width: 40,
            Height: 40
        },
        /**
         * Obstacles spawn interval
         */
        ObstacleSpawnMinInterval: 1000,
        ObstacleSpawnMaxInterval: 3000,
        Rand: rand
    };

    var Resources = {
        sampleImg: new ex.Texture("game/assets/img/sample-image.png"),
        txBike: new ex.Texture("game/assets/img/bike.png"),
        txCrate: new ex.Texture("game/assets/img/crate.png"),
        sampleSnd: new ex.Sound("game/assets/snd/sample-sound.wav")
    };

    class TopPlayer extends ex.Actor {
        constructor(engine) {
            super({
                x: engine.drawWidth / 4,
                y: engine.drawHeight / 4,
                acc: new ex.Vector(0, 800),
                width: Config.TopPlayer.Width,
                height: Config.TopPlayer.Height,
                color: ex.Color.Blue,
                collisionType: ex.CollisionType.Active
            });
            this.engine = engine;
            this.canJump = false;
            engine.input.pointers.primary.on("down", this.handleInput.bind(this));
            this.on("precollision", this.handleCollision.bind(this));
        }
        onInitialize() {
            this.addDrawing(Resources.txBike);
        }
        // le-sigh workaround for odd collision tunneling issue
        handleCollision(event) {
            if (event.side === ex.Side.Bottom) {
                this.canJump = true;
            }
        }
        handleInput(event) {
            ex.Logger.getInstance().debug("event:", event);
            if (event.worldPos.y < this.engine.halfDrawHeight) {
                this.jump();
            }
        }
        jump() {
            if (this.canJump) {
                this.vel = this.vel.add(new ex.Vector(0, -400));
                this.acc = new ex.Vector(0, 800);
                this.canJump = false;
            }
        }
        onPostUpdate(engine, delta) {
            if (!this.canJump) {
                let virtualVel = new ex.Vector(-Config.Floor.Speed, ex.Util.clamp(this.vel.y, -50, 50));
                this.rotation = virtualVel.toAngle();
            }
            else {
                this.rotation = 0;
            }
            this.vel.x = 0;
        }
    }

    var __rest = (window && window.__rest) || function (s, e) {
        var t = {};
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
            t[p] = s[p];
        if (s != null && typeof Object.getOwnPropertySymbols === "function")
            for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
                t[p[i]] = s[p[i]];
        return t;
    };
    class Obstacle extends ex.Actor {
        /**
         *
         */
        constructor(_a) {
            var { x, y, speed, topSubscene } = _a, props = __rest(_a, ["x", "y", "speed", "topSubscene"]);
            super(Object.assign({ x,
                y, collisionType: ex.CollisionType.Passive, vel: new ex.Vector(speed, 0) }, props));
            this.onExitViewPort = (engine) => (e) => {
                // When obstacle passes out of view to the left, NOT from the right ;)
                // it should be killed
                if (e.target.x < engine.getWorldBounds().left) {
                    ex.Logger.getInstance().debug("Obstacle exited stage left", e.target);
                    e.target.kill();
                }
            };
            this.onCollision = (event) => {
                if (event.other instanceof TopPlayer) {
                    this.topSubscene.healthMeter.health--;
                }
            };
            this.topSubscene = topSubscene;
            // Anchor to bottom since
            // we will be placing it on a "floor"
            this.anchor.setTo(0.5, 1);
        }
        onInitialize(engine) {
            this.on("exitviewport", this.onExitViewPort(engine));
            this.on("collisionstart", this.onCollision);
        }
    }

    class Crate extends Obstacle {
        constructor(props) {
            super(Object.assign({}, props, { width: 16, height: 16 }));
        }
        onInitialize(engine) {
            super.onInitialize(engine);
            this.addDrawing(Resources.txCrate);
        }
    }

    class Crates extends Obstacle {
        constructor(props) {
            super(Object.assign({}, props, { width: 16, height: 16 * 3 }));
        }
        onInitialize(engine) {
            super.onInitialize(engine);
            const crateArgs = {
                width: 16,
                height: 16
            };
            const crate1 = new ex.Actor(Object.assign({}, crateArgs, { y: 0 }));
            const crate2 = new ex.Actor(Object.assign({}, crateArgs, { y: -16 }));
            const crate3 = new ex.Actor(Object.assign({}, crateArgs, { y: -32 }));
            crate1.addDrawing(Resources.txCrate);
            crate2.addDrawing(Resources.txCrate);
            crate3.addDrawing(Resources.txCrate);
            this.add(crate1);
            this.add(crate2);
            this.add(crate3);
        }
    }

    const obstacles = [Crate, Crates];

    var __rest$1 = (window && window.__rest) || function (s, e) {
        var t = {};
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
            t[p] = s[p];
        if (s != null && typeof Object.getOwnPropertySymbols === "function")
            for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
                t[p[i]] = s[p[i]];
        return t;
    };
    class Platform extends ex.Actor {
        constructor(_a) {
            var { x, y, speed, topSubscene } = _a, props = __rest$1(_a, ["x", "y", "speed", "topSubscene"]);
            super({
                x,
                y,
                height: Config.Platform.Height,
                width: Config.Platform.Width,
                color: ex.Color.Green,
                collisionType: ex.CollisionType.Fixed,
                vel: new ex.Vector(speed, 0)
                // Anchor to bottom since
                // we will be placing it on a "floor"
            });
            this.onExitViewPort = (engine) => (e) => {
                // When obstacle passes out of view to the left, NOT from the right ;)
                // it should be killed
                if (e.target.x < engine.getWorldBounds().left) {
                    ex.Logger.getInstance().debug("Obstacle exited stage left", e.target);
                    e.target.kill();
                }
            };
            this.topSubscene = topSubscene;
        }
        onInitialize(engine) {
            this.on("exitviewport", this.onExitViewPort(engine));
        }
    }

    class Floor extends ex.Actor {
        /**
         *
         */
        constructor(engine, topSubscene) {
            super({
                x: 0,
                y: engine.drawHeight / 2,
                width: engine.drawWidth * 2,
                height: Config.Floor.Height,
                color: ex.Color.Black,
                anchor: new ex.Vector(0, 0.5),
                collisionType: ex.CollisionType.Fixed
            });
            this.topSubscene = topSubscene;
        }
        onInitialize(engine) {
            this._spawnTimer = new ex.Timer(() => {
                this.spawnObstacle(engine);
                this.spawnPlatform(engine);
            }, 1000, true);
            this.scene.add(this._spawnTimer);
        }
        spawnObstacle(engine) {
            const x = engine.drawWidth + 200;
            const ObstacleDef = obstacles[Config.Rand.integer(0, obstacles.length - 1)];
            const ob = new ObstacleDef({
                x,
                y: this.getTop(),
                speed: Config.Floor.Speed,
                topSubscene: this.topSubscene
            });
            ex.Logger.getInstance().debug("Spawned obstacle", ob);
            this.scene.add(ob);
            const newInterval = Config.Rand.integer(Config.ObstacleSpawnMinInterval, Config.ObstacleSpawnMaxInterval);
            this._spawnTimer.reset(newInterval);
        }
        spawnPlatform(engine) {
            const x = engine.drawWidth + 100;
            const platform = new Platform({
                x,
                y: this.getTop() - Config.Platform.Height / 2,
                speed: Config.Floor.Speed,
                topSubscene: this.topSubscene
            });
            ex.Logger.getInstance().debug("Spawned platform", platform);
            this.scene.add(platform);
        }
    }

    class TopHealth extends ex.Label {
        constructor(engine) {
            super({
                x: Config.Health.Pos.x,
                y: Config.Health.Pos.y + Config.Health.FontSize,
                fontSize: Config.Health.FontSize,
                fontUnit: ex.FontUnit.Px,
                anchor: ex.Vector.Zero.clone(),
                color: ex.Color.Red,
                text: Config.Health.Default.toString()
            });
            this.health = Config.Health.Default;
        }
        onPostUpdate(engine, delta) {
            if (this.health < 1) {
                engine.goToScene("end");
                return;
            }
            this.text = this.health.toString();
        }
    }

    class TopSubscene {
        constructor(_engine) {
            this._engine = _engine;
        }
        setup(scene) {
            this.floor = new Floor(this._engine, this);
            this.player = new TopPlayer(this._engine);
            this.healthMeter = new TopHealth(this._engine);
            scene.add(this.floor);
            scene.add(this.player);
            scene.add(this.healthMeter);
        }
        teardown(scene) {
            scene.remove(this.floor);
            scene.remove(this.player);
            scene.remove(this.healthMeter);
        }
    }

    class MiniGame {
        constructor(scene) {
            this.miniGameActors = [];
            this.scene = scene;
        }
        show() {
            if (!this._isSetUp) {
                this.setup(); //initialize actors and add them to the scene and miniGameActors collection.
            }
            this._isSetUp = true;
            this.reset();
            for (let i = 0; i < this.miniGameActors.length; i++) {
                this.miniGameActors[i].visible = true;
            }
        }
        hide() {
            for (let i = 0; i < this.miniGameActors.length; i++) {
                this.miniGameActors[i].visible = false;
            }
        }
        onSucceed() {
            this.hide();
        }
        onFail() {
            this.hide();
        }
    }

    class OfficeDoc extends ex.Actor {
        constructor(pageNumber) {
            super({ x: 100 * pageNumber + 200, width: 50, height: 50, y: 500 });
            this._pageNumber = pageNumber;
            this.color = ex.Color.Green;
        }
        get pageNumber() {
            return this._pageNumber;
        }
    }
    class OfficeDocSet {
        constructor(numDocuments) {
            this._documents = [];
            this._playerSortedStack = [];
            this._numDocuments = numDocuments;
            for (var i = 0; i < this._numDocuments; i++) {
                this._documents.push(new OfficeDoc(i));
            }
        }
        //attempt to add this document to the sorted stack
        tryAddToSortedStack(documentIn) {
            if (documentIn.pageNumber === this._playerSortedStack.length) {
                this._playerSortedStack.push(documentIn);
                return true;
            }
            else {
                return false;
            }
        }
        isComplete() {
            return this._playerSortedStack.length === this._numDocuments;
        }
        getScrambledDocumentSet() {
            var docsArr = this._documents;
            var currentIndex = docsArr.length, temporaryValue, randomIndex;
            while (0 !== currentIndex) {
                randomIndex = Math.floor(Math.random() * currentIndex);
                currentIndex -= 1;
                temporaryValue = docsArr[currentIndex];
                docsArr[currentIndex] = docsArr[randomIndex];
                docsArr[randomIndex] = temporaryValue;
            }
            return docsArr;
        }
    }

    class CollatingGame extends MiniGame {
        constructor(scene) {
            super(scene);
        }
        setup() {
            var numDocs = Config.MiniGames.Collating.NumberOfDocuments;
            var docSet = new OfficeDocSet(numDocs);
            this._scrambledOfficeDocs = docSet.getScrambledDocumentSet();
            for (let i = 0; i < this._scrambledOfficeDocs.length; i++) {
                //add to the scene here
                this.scene.add(this._scrambledOfficeDocs[i]);
                this.miniGameActors.push(this._scrambledOfficeDocs[i]);
            }
        }
        reset() { }
        start() { }
        finish() { }
    }

    class BottomSubscene {
        constructor() { }
        setup(scene) {
            this.startPaperCollating(scene);
        }
        teardown(scene) { }
        startPaperCollating(scene) {
            // TODO load the paper collating mini-game
            var collatingGame = new CollatingGame(scene);
            collatingGame.show();
        }
        startTalkToCoworker() {
            // TODO load the coworker conversation mini-game
        }
        startPrinter() {
            // TODO start the printer mini-game
        }
    }

    class ScnMain extends ex.Scene {
        onInitialize(engine) {
            this._top = new TopSubscene(this.engine);
            this._bottom = new BottomSubscene();
        }
        onActivate() {
            this._top.setup(this);
            this._bottom.setup(this);
        }
        onDeactivate() {
            this._top.teardown(this);
            this._bottom.teardown(this);
        }
    }

    var game = new ex.Engine({
        width: Config.GameWidth,
        height: Config.GameHeight
    });
    // Physics
    // ex.Physics.collisionResolutionStrategy = ex.CollisionResolutionStrategy.RigidBody
    // ex.Physics.allowRigidBodyRotation = false;
    ex.Physics.checkForFastBodies = true;
    // create an asset loader
    var loader = new ex.Loader();
    // queue resources for loading
    for (var r in Resources) {
        loader.addResource(Resources[r]);
    }
    game.addScene("main", new ScnMain(game));
    game.addScene("end", new ScnEnd(game));
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
    game.input.keyboard.on("down", (keyDown) => {
        switch (keyDown.key) {
            case ex.Input.Keys.P:
                if (gamePaused) {
                    game.start();
                    ex.Logger.getInstance().info("game resumed");
                }
                else {
                    game.stop();
                    ex.Logger.getInstance().info("game paused");
                }
                gamePaused = !gamePaused;
                break;
            case ex.Input.Keys.Semicolon:
                game.isDebug = !game.isDebug;
                break;
            case ex.Input.Keys.Esc:
                game.goToScene("end");
                break;
        }
    });
    ////////////////////////////////////////////////////////////////////

}(ex));
//# sourceMappingURL=bundle.js.map
