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
        GameHeight: 800,
        // Top Floor config
        Floor: {
            Speed: -200,
            Height: 5
        },
        // Top Player config
        TopPlayer: {
            StartingXPercent: 0.25,
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
                NumberOfDocuments: 5,
                NumberOfWinsToProceed: 3
            }
        },
        Platform: {
            Width: 100,
            Height: 10,
            HeightAboveFloor: 60,
            MinSpawnInterval: 2000,
            MaxSpawnInterval: 3000
        },
        PrinterMiniGame: {
            GridDimension: 4
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
        txBackground: new ex.Texture("game/assets/img/top-bg.png"),
        sampleSnd: new ex.Sound("game/assets/snd/sample-sound.wav")
    };

    class TopPlayer extends ex.Actor {
        constructor(engine) {
            super({
                x: engine.drawWidth * Config.TopPlayer.StartingXPercent,
                y: engine.drawHeight / 4,
                acc: new ex.Vector(0, 800),
                width: Config.TopPlayer.Width,
                height: Config.TopPlayer.Height,
                color: ex.Color.Blue,
                collisionType: ex.CollisionType.Active
            });
            this.engine = engine;
            this.canJump = false;
            this.correcting = false;
            engine.input.pointers.primary.on("down", this.handleInput.bind(this));
            this.on("precollision", this.handleCollision.bind(this));
        }
        onInitialize() {
            this.z = 5;
            this.addDrawing(Resources.txBike);
            // dust
            const dustEmitter = new ex.ParticleEmitter(-(this.getWidth() / 2) - 8, Config.TopPlayer.Height / 2 - 2, 5, 2);
            dustEmitter.isEmitting = false;
            dustEmitter.emitterType = ex.EmitterType.Rectangle;
            dustEmitter.radius = 5;
            dustEmitter.minVel = 327;
            dustEmitter.maxVel = 296;
            dustEmitter.minAngle = 3.5;
            dustEmitter.maxAngle = 3.4;
            dustEmitter.emitRate = 118;
            dustEmitter.opacity = 0.5;
            dustEmitter.fadeFlag = true;
            dustEmitter.particleLife = 200;
            dustEmitter.maxSize = 1;
            dustEmitter.minSize = 1;
            dustEmitter.startSize = 0;
            dustEmitter.endSize = 0;
            dustEmitter.acceleration = new ex.Vector(-69, 484);
            dustEmitter.beginColor = ex.Color.Transparent;
            dustEmitter.endColor = ex.Color.Black;
            this.add(dustEmitter);
            this.dustEmitter = dustEmitter;
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
                this.dustEmitter.isEmitting = false;
            }
            else {
                this.dustEmitter.isEmitting = true;
                if (this.x < engine.drawWidth * Config.TopPlayer.StartingXPercent) {
                    this.vel.x =
                        (engine.drawWidth * Config.TopPlayer.StartingXPercent - this.x) / 2;
                }
                else if (this.x >
                    engine.drawWidth * Config.TopPlayer.StartingXPercent) {
                    this.x = engine.drawWidth * Config.TopPlayer.StartingXPercent;
                }
                this.rotation = 0;
            }
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
            var { x, y, speed, onHitPlayer } = _a, props = __rest(_a, ["x", "y", "speed", "onHitPlayer"]);
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
                    this.onHitPlayer();
                    this.kill();
                }
            };
            this.onHitPlayer = onHitPlayer;
            // Anchor to bottom since
            // we will be placing it on a "floor"
            this.anchor.setTo(0.5, 1);
        }
        onInitialize(engine) {
            this.on("exitviewport", this.onExitViewPort(engine));
            this.on("collisionstart", this.onCollision);
            this.scene.on("deactivate", () => this.kill());
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
                anchor: ex.Vector.Zero,
                width: 16,
                height: 16
            };
            const crate1 = new ex.Actor(Object.assign({}, crateArgs, { y: -16 }));
            const crate2 = new ex.Actor(Object.assign({}, crateArgs, { y: -32 }));
            const crate3 = new ex.Actor(Object.assign({}, crateArgs, { y: -48 }));
            crate1.addDrawing(Resources.txCrate);
            crate2.addDrawing(Resources.txCrate);
            crate3.addDrawing(Resources.txCrate);
            this.add(crate1);
            this.add(crate2);
            this.add(crate3);
        }
    }

    const obstacles = [Crate, Crates];

    class Floor extends ex.Actor {
        /**
         *
         */
        constructor(engine) {
            super({
                x: 0,
                y: engine.drawHeight / 2,
                width: engine.drawWidth * 2,
                height: Config.Floor.Height,
                color: ex.Color.Black,
                anchor: new ex.Vector(0, 0.5),
                collisionType: ex.CollisionType.Fixed
            });
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
        onInitialize() {
            this.z = 4;
        }
        onPostUpdate(engine, delta) {
            if (this.health < 1) {
                engine.goToScene("end");
                return;
            }
            this.text = this.health.toString();
        }
    }

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
            var { x, y, speed } = _a, props = __rest$1(_a, ["x", "y", "speed"]);
            super({
                x,
                y,
                height: Config.Platform.Height,
                width: Config.Platform.Width,
                color: ex.Color.Gray,
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
        }
        onInitialize(engine) {
            this.on("exitviewport", this.onExitViewPort(engine));
            this.scene.on("deactivate", () => this.kill());
        }
    }

    class Background extends ex.Actor {
        /**
         *
         */
        constructor(engine) {
            super({
                x: 0,
                y: 0,
                width: engine.canvasWidth * 2,
                height: Config.Floor.Height,
                anchor: ex.Vector.Zero,
                vel: new ex.Vector(Config.Floor.Speed * 1.5, 0)
            });
            this.drawSlices = new Array(Background.Slices * 2);
            this.slices = new Array(Background.Slices);
            this._offscreen = document.createElement("canvas");
            this._offscreen.width = Background.Slices * Background.SliceWidth * 2;
            this._offscreen.height = engine.drawHeight;
            this._offscreenCtx = this._offscreen.getContext("2d");
        }
        onInitialize() {
            const { txBackground } = Resources;
            for (let i = 0; i < Background.Slices; i++) {
                const x = i * Background.SliceWidth;
                this.slices[i] = new ex.Sprite({
                    image: txBackground,
                    x,
                    y: 0,
                    width: Background.SliceWidth,
                    height: txBackground.height
                });
            }
            this.fillSlices(0, Background.Slices * 2);
            this.drawToOffscreen(0, Background.Slices * 2);
        }
        onPostUpdate(engine, delta) {
            if (this.x <= -engine.halfDrawWidth) {
                ex.Logger.getInstance().info("Reset background");
                this.x = 0;
                this.drawSlices = this.drawSlices.slice(16);
                this.drawToOffscreen(0, 16);
                this.fillSlices(16, Background.Slices * 2);
            }
        }
        onPostDraw(ctx, delta) {
            ctx.drawImage(this._offscreen, this.x, this.y);
        }
        fillSlices(start, to) {
            for (let i = start; i < to; i++) {
                this.drawSlices[i] = this.slices[Config.Rand.integer(0, this.slices.length - 1)];
            }
            this.drawToOffscreen(start, to);
            ex.Logger.getInstance().debug("Picked bg slices", this.drawSlices.length);
        }
        drawToOffscreen(start, to) {
            for (let i = start; i < to; i++) {
                const slice = this.drawSlices[i];
                const x = i * Background.SliceWidth;
                slice && slice.draw(this._offscreenCtx, x, 0);
            }
        }
    }
    Background.Slices = 16;
    Background.SliceWidth = 50;

    class TopSubscene {
        constructor(_engine) {
            this._engine = _engine;
            this.onPlayerHitObstacle = () => {
                this.healthMeter.health--;
            };
        }
        setup(scene) {
            this.scene = scene;
            this.floor = new Floor(this._engine);
            this.player = new TopPlayer(this._engine);
            this.healthMeter = new TopHealth(this._engine);
            this.background = new Background(this._engine);
            this.spawnTimer = new ex.Timer(() => {
                this.spawnObstacle(this._engine, scene);
            }, 1000, true);
            this.platformTimer = new ex.Timer(() => {
                this.spawnPlatform(this._engine, scene);
            }, 2000, true);
            this.platformTimer2 = new ex.Timer(() => {
                this.spawnPlatform2(this._engine, scene);
            }, 3000, true);
            scene.add(this.spawnTimer);
            scene.add(this.platformTimer);
            scene.add(this.platformTimer2);
            scene.add(this.floor);
            scene.add(this.player);
            scene.add(this.healthMeter);
            scene.add(this.background);
        }
        teardown(scene) {
            scene.remove(this.floor);
            scene.remove(this.player);
            scene.remove(this.healthMeter);
            scene.remove(this.spawnTimer);
            scene.remove(this.background);
        }
        spawnObstacle(engine, scene) {
            const x = engine.drawWidth + 200;
            const ObstacleDef = obstacles[Config.Rand.integer(0, obstacles.length - 1)];
            const ob = new ObstacleDef({
                x,
                y: this.floor.getTop(),
                speed: Config.Floor.Speed,
                onHitPlayer: this.onPlayerHitObstacle
            });
            ex.Logger.getInstance().debug("Spawned obstacle", ob);
            scene.add(ob);
            const newInterval = Config.Rand.integer(Config.ObstacleSpawnMinInterval, Config.ObstacleSpawnMaxInterval);
            this.spawnTimer.reset(newInterval);
        }
        spawnPlatform(engine, scene) {
            const x = engine.drawWidth + 100;
            const platform = new Platform({
                x,
                y: this.floor.getTop() - Config.Platform.HeightAboveFloor,
                speed: Config.Floor.Speed
            });
            ex.Logger.getInstance().debug("Spawned platform", platform);
            scene.add(platform);
            const newInterval = Config.Rand.integer(Config.Platform.MinSpawnInterval, Config.Platform.MaxSpawnInterval);
            this.platformTimer.reset(newInterval);
        }
        spawnPlatform2(engine, scene) {
            const x = engine.drawWidth + 100;
            const platform = new Platform({
                x,
                y: this.floor.getTop() - Config.Platform.HeightAboveFloor * 2,
                speed: Config.Floor.Speed
            });
            ex.Logger.getInstance().debug("Spawned platform", platform);
            this.scene.add(platform);
            const newInterval = Config.Rand.integer(Config.Platform.MinSpawnInterval * 2, Config.Platform.MaxSpawnInterval * 2);
            this.platformTimer2.reset(newInterval);
        }
    }

    class MiniGame {
        constructor(scene, bottomSubscene) {
            this.miniGameActors = [];
            this.scene = scene;
            this.bottomSubscene = bottomSubscene;
        }
        start() {
            if (!this._isSetUp) {
                this.setup(); //initialize actors and add them to the miniGameActors collection.
                for (let i = 0; i < this.miniGameActors.length; i++) {
                    this.scene.add(this.miniGameActors[i]);
                }
            }
            this._isSetUp = true;
        }
        cleanUp() {
            for (let i = 0; i < this.miniGameActors.length; i++) {
                this.scene.remove(this.miniGameActors[i]);
                this._isSetUp = false;
            }
            this.miniGameActors = [];
        }
        onSucceed() {
            this.cleanUp();
            this.bottomSubscene.startRandomMiniGame();
        }
        onFail() {
            this.cleanUp();
            this.bottomSubscene.startRandomMiniGame();
        }
    }

    class OfficeDoc extends ex.Actor {
        constructor(pageNumber) {
            super();
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
        clear() {
            this._playerSortedStack = [];
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
        constructor(scene, winsRequired, bottomSubscene) {
            super(scene, bottomSubscene);
            this._docLabels = [];
            this._winsRequired = 0;
            this._currentWins = 0;
            this._winsRequired = winsRequired;
        }
        setup() {
            var numDocs = Config.MiniGames.Collating.NumberOfDocuments;
            this._docSet = new OfficeDocSet(numDocs);
            this._scrambledOfficeDocs = this._docSet.getScrambledDocumentSet();
            //this.reset();
            for (let i = 0; i < this._scrambledOfficeDocs.length; i++) {
                //add to the scene here
                this._scrambledOfficeDocs[i].x = 100 * i + 200;
                this._scrambledOfficeDocs[i].setWidth(50);
                this._scrambledOfficeDocs[i].setHeight(50);
                this._scrambledOfficeDocs[i].y = 500;
                this.wireUpClickEvent(this._scrambledOfficeDocs[i]);
                var docLabel = new ex.Label({
                    x: this._scrambledOfficeDocs[i].x,
                    y: this._scrambledOfficeDocs[i].y + 50,
                    color: ex.Color.Red,
                    text: (this._scrambledOfficeDocs[i].pageNumber + 1).toString()
                });
                docLabel.fontSize = 16;
                this._docLabels.push(docLabel);
                this.miniGameActors.push(docLabel);
                this.miniGameActors.push(this._scrambledOfficeDocs[i]);
            }
        }
        reset() { }
        wireUpClickEvent(officeDoc) {
            officeDoc.on("pointerup", evt => {
                var clickedDoc = evt.target;
                if (this._docSet.tryAddToSortedStack(clickedDoc)) {
                    //update ui
                    clickedDoc.color = ex.Color.Magenta;
                    if (this._docSet.isComplete()) {
                        //you won
                        console.log("you won the collating game");
                        this._currentWins++;
                        if (this._currentWins >= this._winsRequired) {
                            //move on to the next mini game
                            this._currentWins = 0;
                            this.onSucceed();
                        }
                        else {
                            this.resetDocuments();
                        }
                    }
                }
            });
        }
        //shuffle the pages around visually
        resetDocuments() {
            this._docSet.clear();
            this._scrambledOfficeDocs = this._docSet.getScrambledDocumentSet();
            for (let i = 0; i < this._scrambledOfficeDocs.length; i++) {
                this._scrambledOfficeDocs[i].x = 100 * i + 200;
                this._scrambledOfficeDocs[i].color = ex.Color.Green;
                this._docLabels[i].text = (this._scrambledOfficeDocs[i].pageNumber + 1).toString();
            }
        }
    }

    class CoffeeItem extends ex.Actor {
        constructor(args) {
            super(args);
            this._isHighlighted = false;
        }
        onInitialize(engine) {
            this.on("pointerup", event => {
                if (this._isHighlighted) {
                    // TODO play foley sound effect
                    // emit an event for the correct item being clicked
                    this.scene.emit("coffeeClick");
                    this.unHighlight();
                }
                else {
                    // TODO play error sound?
                }
            });
        }
        highlight() {
            this._originalColor = this.color;
            this.color = ex.Color.Green;
            this._isHighlighted = true;
        }
        unHighlight() {
            this.color = this._originalColor;
            this._isHighlighted = false;
        }
    }

    class CoffeeGame extends MiniGame {
        constructor(scene, bottomSubscene) {
            super(scene, bottomSubscene);
            this._stepCount = 0;
        }
        setup() {
            let coffeeFilter = new CoffeeItem({
                x: 200,
                y: 500,
                width: 50,
                height: 50,
                color: ex.Color.White
            });
            this.miniGameActors.push(coffeeFilter);
            coffeeFilter.highlight();
            let coffeeGrounds = new CoffeeItem({
                x: 300,
                y: 500,
                width: 60,
                height: 90,
                color: ex.Color.Red
            });
            this.miniGameActors.push(coffeeGrounds);
            let waterPitcher = new CoffeeItem({
                x: 100,
                y: 500,
                width: 100,
                height: 150,
                color: ex.Color.Cyan
            });
            this.miniGameActors.push(waterPitcher);
            let coffeeMaker = new CoffeeItem({
                x: 400,
                y: 500,
                width: 100,
                height: 200,
                color: ex.Color.Black
            });
            this.miniGameActors.push(coffeeMaker);
            let coffeeCup = new CoffeeItem({
                x: 550,
                y: 500,
                width: 50,
                height: 50,
                color: ex.Color.Orange
            });
            this.miniGameActors.push(coffeeCup);
            this.scene.on("coffeeClick", () => {
                console.log("coffee click");
                this._stepCount++;
                if (this._stepCount >= this.miniGameActors.length) {
                    // TODO play coffee brewing animation
                    // TODO ramp up the music/difficulty in the top runner
                    // TODO hiding the actors isn't enough, they need their input disabled
                    // maybe we should remove them from the scene?
                    this.onSucceed();
                }
                else {
                    let coffeeItem = this.miniGameActors[this._stepCount];
                    coffeeItem.highlight();
                }
            });
        }
        reset() {
            this._stepCount = 0;
        }
    }

    class Light extends ex.Actor {
        constructor(args) {
            super(args);
            this.lit = false;
        }
        onInitialize() {
            this.on("pointerup", (evt) => {
                if (this.up)
                    this.up.lit = !this.up.lit;
                if (this.down)
                    this.down.lit = !this.down.lit;
                if (this.left)
                    this.left.lit = !this.left.lit;
                if (this.right)
                    this.right.lit = !this.right.lit;
                this.lit = !this.lit;
            });
        }
        onPostUpdate() {
            if (this.lit) {
                this.color = ex.Color.Yellow.clone();
            }
            else {
                this.color = ex.Color.Violet.clone();
            }
        }
    }

    class PrinterGame extends MiniGame {
        constructor(scene, bottomSubscene) {
            super(scene, bottomSubscene);
            this.miniGameActors = [];
            this._lights = [];
            let startX = scene.engine.halfDrawWidth;
            let startY = scene.engine.halfDrawHeight + 100;
            for (let i = 0; i <
                Config.PrinterMiniGame.GridDimension *
                    Config.PrinterMiniGame.GridDimension; i++) {
                let x = i % Config.PrinterMiniGame.GridDimension;
                let y = Math.floor(i / Config.PrinterMiniGame.GridDimension);
                this._lights[i] = new Light({
                    x: x * 30 + startX,
                    y: y * 30 + startY,
                    width: 20,
                    height: 20,
                    color: ex.Color.Violet.clone()
                });
            }
            for (let i = 0; i < this._lights.length; i++) {
                let light = this._lights[i];
                let x = i % Config.PrinterMiniGame.GridDimension;
                let y = Math.floor(i / Config.PrinterMiniGame.GridDimension);
                light.up = this.getLight(x, y - 1);
                light.down = this.getLight(x, y + 1);
                light.left = this.getLight(x - 1, y);
                light.right = this.getLight(x + 1, y);
            }
            let litLight = Config.Rand.pickOne(this._lights);
            litLight.lit = true;
        }
        getLight(x, y) {
            let index = x + y * Config.PrinterMiniGame.GridDimension;
            if (index < 0 || index > this._lights.length - 1) {
                return null;
            }
            if (x >= Config.PrinterMiniGame.GridDimension ||
                y >= Config.PrinterMiniGame.GridDimension) {
                return null;
            }
            if (x < 0 || y < 0) {
                return null;
            }
            return this._lights[index];
        }
        setup() {
            this.miniGameActors = this._lights;
        }
        reset() { }
    }

    class BottomSubscene {
        constructor() {
            this.miniGames = [];
        }
        setup(scene) {
            this.collatingGame = new CollatingGame(scene, Config.MiniGames.Collating.NumberOfWinsToProceed, this);
            this.miniGames.push(this.collatingGame);
            this.coffeeGame = new CoffeeGame(scene, this);
            this.miniGames.push(this.coffeeGame);
            this.printerGame = new PrinterGame(scene, this);
            this.miniGames.push(this.printerGame);
            this.startRandomMiniGame();
        }
        teardown(scene) { }
        startRandomMiniGame() {
            let miniGame = this.miniGames[ex.Util.randomIntInRange(0, this.miniGames.length - 1)];
            miniGame.start();
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
