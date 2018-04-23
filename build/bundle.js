var game = (function (exports,ex) {
    'use strict';

    var GameOverReason;
    (function (GameOverReason) {
        GameOverReason[GameOverReason["daydream"] = 0] = "daydream";
        GameOverReason[GameOverReason["minigame"] = 1] = "minigame";
        GameOverReason[GameOverReason["workdayComplete"] = 2] = "workdayComplete";
        GameOverReason[GameOverReason["debug"] = 3] = "debug";
    })(GameOverReason || (GameOverReason = {}));
    class Stats {
        constructor() {
            this.startTime = Date.now();
            this.miniGamesCompleted = 0;
        }
        get duration() {
            return this.startTime - Date.now();
        }
    }

    // GOOD SEEDS
    // 1524409882715
    var rand;
    function createRand() {
        rand = new ex.Random(Date.now());
        ex.Logger.getInstance().info("World seed", rand.seed);
    }
    var Config = {
        CheatCode: true,
        AnalyticsEndpoint: "https://ludum41stats.azurewebsites.net/api/HttpLudum41StatsTrigger?code=eumYNdyRh0yfBAk0NLrfrKkXxtGsX7/Jo5gAcYo13k3GcVFNBdG3yw==",
        GameWidth: 800,
        GameHeight: 800,
        numMiniGamesToComplete: 4,
        // Top Floor config
        Floor: {
            Speed: -200,
            Height: 20
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
                NumberOfWinsToProceed: 3,
                OriginalDocY: 600,
                InboxPos: {
                    x: 115,
                    y: 500
                },
                OutboxPos: {
                    x: 680,
                    y: 500
                }
            },
            Coffee: {
                BrewTime: 5000 // ms
            }
        },
        Platform: {
            Width: 100,
            Height: 10,
            HeightAboveFloor: 70,
            MinSpawnInterval: 1000,
            MaxSpawnInterval: 2000
        },
        PrinterMiniGame: {
            HardMode: false,
            PrinterStartX: 300,
            PrinterStartY: 570,
            PrinterSpacing: 35,
            GridDimension: 3
        },
        /**
         * Obstacles spawn interval
         */
        ObstacleSpawnMinInterval: 1000,
        ObstacleSpawnMaxInterval: 5000,
        get Rand() {
            return rand;
        }
    };

    var stats;
    function getStats() {
        return stats;
    }
    function newgame(game) {
        // clear stats
        stats = new Stats();
        // New random
        createRand();
        // begin main scene
        game.goToScene("main");
    }
    function gameover(game, reason) {
        // TODO record stats
        stats.gameOverReason = reason;
        game.goToScene("end");
    }

    var Resources = {
        txBike: new ex.Texture("game/assets/img/bike.png"),
        txTNTSpriteSheet: new ex.Texture("game/assets/img/tnt.png"),
        txBombSpriteSheet: new ex.Texture("game/assets/img/bomb.png"),
        txBackground: new ex.Texture("game/assets/img/top-bg.png"),
        txGurter: new ex.Texture("game/assets/img/gurter.png"),
        txHeartSpriteSheet: new ex.Texture("game/assets/img/heart.png"),
        txCollateBackground: new ex.Texture("game/assets/img/collate-bg.png"),
        txDocPieChart: new ex.Texture("game/assets/img/pieChartSubmit.png"),
        txDocBarGraph: new ex.Texture("game/assets/img/barGraphSubmit.png"),
        txDocLineGraph: new ex.Texture("game/assets/img/lineGraphSubmit.png"),
        txDocVennDiagram: new ex.Texture("game/assets/img/vennDiagramSubmit.png"),
        txDocMoney: new ex.Texture("game/assets/img/moneySubmit.png"),
        txCoffeeMaker: new ex.Texture("game/assets/img/coffee-maker.png"),
        txCoffeeGrounds: new ex.Texture("game/assets/img/coffee-grounds.png"),
        txCoffeeFilter: new ex.Texture("game/assets/img/coffee-filters.png"),
        txCoffeeCup: new ex.Texture("game/assets/img/coffee-cup.png"),
        txCoffeeBackground: new ex.Texture("game/assets/img/coffee-game-bg.png"),
        txCopier: new ex.Texture("game/assets/img/printer.png"),
        txCopierBackground: new ex.Texture("game/assets/img/copy-game-bg.png"),
        txOverlay: new ex.Texture("game/assets/img/office-overlay.png"),
        txCursor: new ex.Texture("game/assets/img/thehand.png"),
        txTimerBg: new ex.Texture("game/assets/img/timerbg.png"),
        txGameOverScreen: new ex.Texture("game/assets/img/game-end-bg.png"),
        txMiniGameTransitionScreen: new ex.Texture("game/assets/img/minigame-transition.png"),
        topBgMusic: new ex.Sound("game/assets/snd/extremeaction.mp3", "game/assets/snd/extremeaction.wav"),
        bottomBgMusic: new ex.Sound("game/assets/snd/office-ambience.mp3", "game/assets/snd/office-ambience.wav"),
        hitSound: new ex.Sound("game/assets/snd/hitSound.mp3", "game/assets/snd/hitSound.wav"),
        shortBeep: new ex.Sound("game/assets/snd/shortBeep.mp3", "game/assets/snd/shortBeep.wav"),
        coffeePour: new ex.Sound("game/assets/snd/coffeePour.mp3", "game/assets/snd/coffeePour.wav"),
        pageFlip: new ex.Sound("game/assets/snd/pageFlip.mp3", "game/assets/snd/pageFlip.wav"),
        jump: new ex.Sound("game/assets/snd/jump.mp3", "game/assets/snd/jump.wav")
        //sampleSnd: new Sound("game/assets/snd/sample-sound.wav")
    };

    const gameOverMessages = {
        [GameOverReason.daydream]: "You gave up on your dreams.",
        [GameOverReason.minigame]: "Your boss caught you daydreaming.",
        [GameOverReason.workdayComplete]: "Congratulations! You found your dream.",
        [GameOverReason.debug]: "You program dreams."
    };
    class ScnEnd extends ex.Scene {
        onInitialize(engine) {
            this.gameOverLabel = new ex.Label({
                x: this.engine.drawWidth / 2,
                y: this.engine.drawHeight / 2,
                textAlign: ex.TextAlign.Center,
                fontSize: 36,
                fontFamily: "Arial",
                color: ex.Color.White
            });
            this.hoursDoneLabel = new ex.Label({
                x: this.engine.drawWidth / 2,
                y: this.engine.drawHeight / 2 + 50,
                textAlign: ex.TextAlign.Center,
                fontSize: 36,
                fontFamily: "Arial",
                color: ex.Color.White
            });
            this.bgActor = new ex.Actor(engine.drawWidth / 2, engine.drawHeight / 2);
            // this.bgActor.addDrawing(Resources.txGameOverScreen);
            this.add(this.bgActor);
            let bgSpriteSheet = new ex.SpriteSheet(Resources.txGameOverScreen, 2, 1, 800, 800);
            this.bgActor.addDrawing("defeat", bgSpriteSheet.getSprite(0));
            this.bgActor.addDrawing("victory", bgSpriteSheet.getSprite(1));
            this.add(this.gameOverLabel);
            this.add(this.hoursDoneLabel);
            const resetButton = new ResetButton({
                x: engine.drawWidth / 2,
                y: engine.drawHeight / 2 + 100
            });
            this.add(resetButton);
        }
        onActivate() {
            const { gameOverReason } = getStats();
            const { miniGamesCompleted } = getStats();
            this.gameOverLabel.text = gameOverMessages[gameOverReason];
            if (gameOverReason != GameOverReason.workdayComplete) {
                this.bgActor.setDrawing("defeat");
                this.hoursDoneLabel.text =
                    "You made it " + 2 * miniGamesCompleted + " hours through your workday";
            }
            else {
                this.bgActor.setDrawing("victory");
            }
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
        reset(game) {
            newgame(game);
        }
    }

    class SoundManager {
        static init() {
            document.getElementById("mute-music").addEventListener("click", () => {
                if (this.musicMuted) {
                    this.unmuteMusic();
                }
                else {
                    this.muteMusic();
                }
                SoundManager._updateMusicButton();
            });
            document.getElementById("mute-all").addEventListener("click", () => {
                if (this.allMuted) {
                    this.unmuteAll();
                }
                else {
                    this.muteAll();
                }
            });
        }
        static _updateMusicButton() {
            document.querySelector("#mute-music i").classList.toggle("fa-music");
            document.querySelector("#mute-music i").classList.toggle("fa-play");
        }
        static _updateMuteAllButton() {
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
            for (let r in Resources) {
                let snd = Resources[r];
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
            for (let r in Resources) {
                let snd = Resources[r];
                if (snd instanceof ex.Sound) {
                    snd.setVolume(1);
                }
            }
            this.startOfficeAmbience();
            SoundManager._updateMuteAllButton();
        }
        static startActionMusic() {
            if (this.allMuted || this.musicMuted)
                return;
            Resources.topBgMusic.setVolume(0.3);
            Resources.topBgMusic.setLoop(true);
            if (!Resources.topBgMusic.isPlaying()) {
                Resources.topBgMusic.play();
            }
        }
        static startOfficeAmbience() {
            if (this.allMuted || this.musicMuted)
                return;
            Resources.bottomBgMusic.setVolume(0.85);
            Resources.bottomBgMusic.setLoop(true);
            if (!Resources.bottomBgMusic.isPlaying()) {
                Resources.bottomBgMusic.play();
            }
        }
        static pauseActionMusic() {
            Resources.topBgMusic.setVolume(0);
        }
        static pauseOfficeAmbience() {
            Resources.bottomBgMusic.setVolume(0);
        }
        static stopBackgroundAudio() {
            Resources.bottomBgMusic.stop();
            Resources.topBgMusic.stop();
        }
        static playHitSound() {
            Resources.hitSound.setVolume(0.7);
            Resources.hitSound.play();
        }
        static playShortBeep() {
            Resources.shortBeep.setVolume(0.5);
            Resources.shortBeep.play();
        }
        static playCoffeePouringSound() {
            Resources.coffeePour.play();
        }
        static playPageFlipSound() {
            Resources.pageFlip.setVolume(0.5);
            Resources.pageFlip.play();
        }
        static playJumpSound() {
            //resources.shortBeep.setVolume(0.5);
            Resources.jump.play();
        }
    }
    SoundManager.allMuted = false;
    SoundManager.musicMuted = false;

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
            this.onExitViewport = () => {
                gameover(this.engine, GameOverReason.daydream);
            };
            this.on("precollision", this.handleCollision.bind(this));
        }
        onInitialize(engine) {
            this.z = 5;
            let ss = new ex.SpriteSheet({
                image: Resources.txBike,
                rows: 1,
                columns: 2,
                spHeight: 50,
                spWidth: 60
            });
            let anim = ss.getAnimationForAll(engine, 100);
            this.addDrawing("default", anim);
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
            this.on("exitviewport", this.onExitViewport);
        }
        // le-sigh workaround for odd collision tunneling issue
        handleCollision(event) {
            if (event.side === ex.Side.Bottom) {
                this.canJump = true;
            }
        }
        jump() {
            if (this.canJump) {
                this.vel = new ex.Vector(this.vel.x, -400);
                this.acc = new ex.Vector(0, 800);
                SoundManager.playJumpSound();
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
                        engine.drawWidth * Config.TopPlayer.StartingXPercent - this.x;
                }
                else if (this.x >
                    engine.drawWidth * Config.TopPlayer.StartingXPercent) {
                    this.x = engine.drawWidth * Config.TopPlayer.StartingXPercent;
                }
                this.rotation = 0;
            }
            if (this.y > engine.halfDrawHeight) {
                this.y = engine.halfDrawHeight - 40;
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
                    event.other.actions.blink(200, 100, 5);
                    this.collisionType = ex.CollisionType.PreventCollision;
                    this.acc = new ex.Vector(0, 900);
                    this.rx = Config.Rand.floating(Math.PI, Math.PI * 2);
                    this.vel = new ex.Vector(Config.Rand.floating(50, 100), Config.Rand.floating(-400, -800));
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

    class Bomb extends Obstacle {
        constructor(props) {
            super(Object.assign({}, props, { width: 32, height: 32 }));
        }
        onInitialize(engine) {
            super.onInitialize(engine);
            let ss = new ex.SpriteSheet({
                image: Resources.txBombSpriteSheet,
                rows: 1,
                columns: 2,
                spWidth: 18,
                spHeight: 18
            });
            let anim = ss.getAnimationForAll(engine, 300);
            this.addDrawing("default", anim);
            this.currentDrawing.scale.setTo(2, 2);
        }
    }

    class Stack extends Obstacle {
        constructor(props) {
            super(Object.assign({}, props, { width: 18 * 2, height: 18 * 2 * 2 }));
        }
        onInitialize(engine) {
            super.onInitialize(engine);
            let ss = new ex.SpriteSheet({
                image: Resources.txTNTSpriteSheet,
                rows: 1,
                columns: 2,
                spWidth: 18,
                spHeight: 18
            });
            let anim = ss.getAnimationForAll(engine, 300);
            let width = 18 * 2;
            let height = 18 * 2;
            const crateArgs = {
                anchor: ex.Vector.Zero,
                width: width,
                height: height
            };
            const crate1 = new ex.Actor(Object.assign({}, crateArgs, { y: -height }));
            const crate2 = new ex.Actor(Object.assign({}, crateArgs, { y: -height * 2 }));
            // const crate3 = new ex.Actor({ ...crateArgs, y: -96 });
            crate1.addDrawing("default", anim);
            crate1.currentDrawing.scale.setTo(2, 2);
            crate2.addDrawing("default", anim);
            crate2.currentDrawing.scale.setTo(2, 2);
            // crate3.addDrawing('default', anim);
            // crate3.currentDrawing.scale.setTo(2, 2);
            this.add(crate1);
            this.add(crate2);
            // this.add(crate3);
        }
    }

    const obstacles = [Bomb, Stack];

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
                anchor: new ex.Vector(0, 0.25),
                collisionType: ex.CollisionType.Fixed
            });
        }
    }

    class TopHealth extends ex.Actor {
        constructor(engine) {
            super({
                x: 20,
                y: engine.halfDrawHeight - 20,
                anchor: new ex.Vector(0, 1),
                color: ex.Color.Red
            });
            this.health = Config.Health.Default;
        }
        onInitialize() {
            this.z = 4;
            this.heartSpriteSheet = new ex.SpriteSheet({
                image: Resources.txHeartSpriteSheet,
                columns: 3,
                rows: 1,
                spWidth: 19,
                spHeight: 18
            });
        }
        onPostUpdate(engine, delta) {
            if (this.health < 1) {
                gameover(engine, GameOverReason.daydream);
                return;
            }
        }
        onPostDraw(ctx) {
            let fullHealth = Math.floor(this.health / 2);
            let halfHealth = this.health % 2;
            let i = 0;
            for (; i < fullHealth; i++) {
                this.heartSpriteSheet.getSprite(0).draw(ctx, 20 * i, 0);
            }
            if (halfHealth) {
                this.heartSpriteSheet.getSprite(1).draw(ctx, 20 * i, 0);
                i++;
            }
            // no health
            for (let j = 0; j < Config.Health.Default / 2 - fullHealth - halfHealth; j++) {
                this.heartSpriteSheet.getSprite(2).draw(ctx, 20 * (j + i), 0);
            }
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
            this.addDrawing(Resources.txGurter);
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
                // ex.Logger.getInstance().info("Reset background");
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
        constructor(_engine, scene) {
            this._engine = _engine;
            this.onPlayerHitObstacle = () => {
                if (this.healthMeter.health > 0) {
                    SoundManager.playHitSound();
                    this.healthMeter.health--;
                }
            };
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
            this._engine.input.pointers.primary.on("down", this.handleInput.bind(this));
        }
        setup(scene) {
            this.player.vel = ex.Vector.Zero.clone();
            this.player.pos = new ex.Vector(scene.engine.drawWidth * Config.TopPlayer.StartingXPercent, scene.engine.drawHeight / 3);
            this.player.unkill();
            scene.add(this.spawnTimer);
            scene.add(this.platformTimer);
            scene.add(this.platformTimer2);
            scene.add(this.floor);
            scene.add(this.player);
            scene.add(this.healthMeter);
            scene.add(this.background);
        }
        teardown(scene) {
            this.player.kill();
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
            const level = Config.Rand.integer(2, 3);
            const shouldSpawnAboveLevelOne = Config.Rand.next() > 0.7;
            const platform = new Platform({
                x,
                y: this.floor.getTop() -
                    Config.Platform.HeightAboveFloor *
                        (shouldSpawnAboveLevelOne ? level : 1),
                speed: Config.Floor.Speed
            });
            ex.Logger.getInstance().debug("Spawned platform", platform);
            scene.add(platform);
            const newInterval = Config.Rand.integer(Config.Platform.MinSpawnInterval, Config.Platform.MaxSpawnInterval);
            this.platformTimer.reset(newInterval);
        }
        handleInput(event) {
            //let camera = this.scene.camera;
            ex.Logger.getInstance().debug("event:", event);
            if (event.worldPos.y < this._engine.halfDrawHeight &&
                this._engine.currentScene == this.scene) {
                this.player.jump();
                SoundManager.pauseOfficeAmbience();
                SoundManager.startActionMusic();
                //camera.move(new ex.Vector(this.engine.halfDrawWidth, this.engine.halfDrawHeight-200), 1000, ex.EasingFunctions.EaseInOutCubic);
            }
            else {
                if (this._engine.currentScene == this.scene) {
                    SoundManager.pauseActionMusic();
                    SoundManager.startOfficeAmbience();
                }
                //camera.move(new ex.Vector(this.engine.halfDrawWidth, this.engine.halfDrawHeight), 1000, ex.EasingFunctions.EaseInOutCubic);
            }
        }
    }

    var MiniGameType;
    (function (MiniGameType) {
        MiniGameType[MiniGameType["Collate"] = 0] = "Collate";
        MiniGameType[MiniGameType["Coffee"] = 1] = "Coffee";
        MiniGameType[MiniGameType["Printer"] = 2] = "Printer";
    })(MiniGameType || (MiniGameType = {}));
    class MiniGame {
        constructor(scene, bottomSubscene) {
            this.miniGameActors = [];
            this.active = false;
            this.scene = scene;
            this.bottomSubscene = bottomSubscene;
        }
        start() {
            this.setup(); //initialize actors and add them to the miniGameActors collection.
            this.active = true;
            for (let i = 0; i < this.miniGameActors.length; i++) {
                this.scene.add(this.miniGameActors[i]);
            }
        }
        cleanUp() {
            for (let i = 0; i < this.miniGameActors.length; i++) {
                this.miniGameActors[i].kill();
                this.scene.remove(this.miniGameActors[i]);
            }
            this.active = false;
        }
        onSucceed() {
            let stats = getStats();
            stats.miniGamesCompleted++;
            if (stats.miniGamesCompleted >= Config.numMiniGamesToComplete) {
                console.log("you win!"); //TODO remove
                gameover(this.scene.engine, GameOverReason.workdayComplete);
                return;
            }
            this.active = false;
            this.bottomSubscene.transistion.transitionIn().then(() => {
                this.cleanUp();
                let stats = getStats();
                if (stats.miniGamesCompleted < Config.numMiniGamesToComplete) {
                    // otherwise the workday continues
                    this.bottomSubscene.startRandomMiniGame();
                }
            });
        }
        onFail() {
            this.cleanUp();
        }
    }

    class OfficeDoc extends ex.Actor {
        constructor(pageNumber, art) {
            super();
            this._pageNumber = pageNumber;
            this.color = ex.Color.Green;
            this.addDrawing("default", art[this._pageNumber].getSprite(0));
            this.addDrawing("numbered", art[this._pageNumber].getSprite(1));
        }
        get pageNumber() {
            return this._pageNumber;
        }
    }
    class OfficeDocSet {
        constructor(numDocuments, art) {
            this._documents = [];
            this._playerSortedStack = [];
            this._numDocuments = numDocuments;
            for (var i = 0; i < this._numDocuments; i++) {
                this._documents.push(new OfficeDoc(i, art));
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
            this.secondsToComplete = 30;
            this.miniGameType = MiniGameType.Collate;
            this._art = [];
            this._winsRequired = winsRequired;
            var numDocs = Config.MiniGames.Collating.NumberOfDocuments;
            this.setupDocDrawings();
            const bg = new ex.Actor({
                x: 0,
                y: this.scene.engine.drawHeight / 2,
                anchor: ex.Vector.Zero
            });
            bg.addDrawing(Resources.txCollateBackground);
            this.miniGameActors.push(bg);
            this._docSet = new OfficeDocSet(numDocs, this._art);
            this._scrambledOfficeDocs = this._docSet.getScrambledDocumentSet();
            for (let i = 0; i < this._scrambledOfficeDocs.length; i++) {
                //add to the scene here
                // this._scrambledOfficeDocs[i].x = 100 * i + 200;
                this._scrambledOfficeDocs[i].setWidth(100);
                this._scrambledOfficeDocs[i].setHeight(150);
                this._scrambledOfficeDocs[i].y = Config.MiniGames.Collating.OriginalDocY;
                this.wireUpClickEvent(this._scrambledOfficeDocs[i]);
                this.miniGameActors.push(this._scrambledOfficeDocs[i]);
            }
        }
        setup() {
            this.resetDocuments(true);
        }
        reset() { }
        wireUpClickEvent(officeDoc) {
            officeDoc.on("pointerdown", evt => {
                var clickedDoc = evt.target;
                if (this._docSet.tryAddToSortedStack(clickedDoc)) {
                    //update ui
                    clickedDoc.color = ex.Color.Magenta;
                    clickedDoc.actions
                        .callMethod(() => {
                        clickedDoc.setDrawing("default");
                        SoundManager.playPageFlipSound();
                    })
                        .easeTo(Config.MiniGames.Collating.OutboxPos.x, Config.MiniGames.Collating.OutboxPos.y, 500, ex.EasingFunctions.EaseInOutQuad);
                    if (this._docSet.isComplete()) {
                        //you won
                        console.log("you won the collating game");
                        this._currentWins++;
                        if (this._currentWins >= this._winsRequired) {
                            //move on to the next mini game
                            this._currentWins = 0;
                            clickedDoc.actions.callMethod(() => {
                                this.onSucceed();
                            });
                        }
                        else {
                            clickedDoc.actions.callMethod(() => {
                                this.resetDocuments();
                            });
                        }
                    }
                }
            });
        }
        //shuffle the pages around visually
        resetDocuments(initial) {
            this._docSet.clear();
            this._scrambledOfficeDocs = this._docSet.getScrambledDocumentSet();
            for (let i = 0; i < this._scrambledOfficeDocs.length; i++) {
                if (!initial) {
                    this._scrambledOfficeDocs[i].actions.easeTo(Config.MiniGames.Collating.OutboxPos.x + 200, Config.MiniGames.Collating.OutboxPos.y, 500, ex.EasingFunctions.EaseInOutQuad);
                }
                this._scrambledOfficeDocs[i].actions
                    .callMethod(() => {
                    this._scrambledOfficeDocs[i].x =
                        Config.MiniGames.Collating.InboxPos.x - 300;
                    this._scrambledOfficeDocs[i].y =
                        Config.MiniGames.Collating.InboxPos.y;
                })
                    .easeTo(Config.MiniGames.Collating.InboxPos.x, Config.MiniGames.Collating.InboxPos.y, 500, ex.EasingFunctions.EaseInOutQuad)
                    .delay(250)
                    .easeTo(125 * i + 150, Config.MiniGames.Collating.OriginalDocY, 500, ex.EasingFunctions.EaseInOutQuad)
                    .callMethod(() => {
                    this._scrambledOfficeDocs[i].setDrawing("numbered");
                });
                this._scrambledOfficeDocs[i].color = ex.Color.Green;
            }
        }
        setupDocDrawings() {
            // 0 pie chart
            this._art[0] = new ex.SpriteSheet(Resources.txDocPieChart, 2, 1, 100, 150);
            // 1 bar graph
            this._art[1] = new ex.SpriteSheet(Resources.txDocBarGraph, 2, 1, 100, 150);
            // 2 line graph
            this._art[2] = new ex.SpriteSheet(Resources.txDocLineGraph, 2, 1, 100, 150);
            // 3 venn diagram
            this._art[3] = new ex.SpriteSheet(Resources.txDocVennDiagram, 2, 1, 100, 150);
            // 4 money diagram
            this._art[4] = new ex.SpriteSheet(Resources.txDocMoney, 2, 1, 100, 150);
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
            this.setDrawing("highlight");
            this._isHighlighted = true;
        }
        unHighlight() {
            if (this._isHighlighted) {
                this.color = this._originalColor;
                this.setDrawing("default");
                this._isHighlighted = false;
            }
        }
    }

    class CoffeeGame extends MiniGame {
        constructor(scene, bottomSubscene) {
            super(scene, bottomSubscene);
            this._stepCount = 0;
            this.secondsToComplete = 45;
            this.miniGameType = MiniGameType.Coffee;
            this._coffeeFilter = new CoffeeItem({
                x: 200,
                y: 500
            });
            this._stepCount = 1; // set to 1 to avoid the first element of the array, which is the background
            this._background = new ex.Actor({
                x: 400,
                y: 600,
                width: 1,
                height: 1
            });
            let bgSpriteSheet = new ex.SpriteSheet(Resources.txCoffeeBackground, 1, 1, 800, 400);
            this._background.addDrawing(bgSpriteSheet.getSprite(0));
            this._coffeeFilter = new CoffeeItem({
                x: 600,
                y: 510,
                width: 140,
                height: 140,
                color: ex.Color.White
            });
            let coffeeFilterSpriteSheet = new ex.SpriteSheet(Resources.txCoffeeFilter, 2, 1, 120, 120);
            this._coffeeFilter.addDrawing("default", coffeeFilterSpriteSheet.getSprite(0));
            this._coffeeFilter.addDrawing("highlight", coffeeFilterSpriteSheet.getSprite(1));
            this._coffeeGrounds = new CoffeeItem({
                x: 200,
                y: 500,
                width: 150,
                height: 160,
                color: ex.Color.Red
            });
            let coffeeGroundsSpritesheet = new ex.SpriteSheet(Resources.txCoffeeGrounds, 2, 1, 150, 160);
            this._coffeeGrounds.addDrawing("default", coffeeGroundsSpritesheet.getSprite(0));
            this._coffeeGrounds.addDrawing("highlight", coffeeGroundsSpritesheet.getSprite(1));
            this._coffeeMaker = new CoffeeItem({
                x: 400,
                y: 600,
                width: 160,
                height: 260,
                color: ex.Color.Black
            });
            let coffeeMakerSpritesheet = new ex.SpriteSheet(Resources.txCoffeeMaker, 24, 1, 160, 260);
            this._coffeeMaker.addDrawing("default", coffeeMakerSpritesheet.getSprite(0));
            this._coffeeMaker.addDrawing("highlight", coffeeMakerSpritesheet.getSprite(1));
            let coffeeMakeAnim = coffeeMakerSpritesheet.getAnimationBetween(this.scene.engine, 2, 24, 250);
            coffeeMakeAnim.loop = false;
            this._coffeeMaker.addDrawing("animate", coffeeMakeAnim);
            this._coffeeCup = new CoffeeItem({
                x: 650,
                y: 687,
                width: 100,
                height: 100,
                color: ex.Color.Orange
            });
            let coffeeCupSpritesheet = new ex.SpriteSheet(Resources.txCoffeeCup, 2, 1, 100, 100);
            this._coffeeCup.addDrawing("default", coffeeCupSpritesheet.getSprite(0));
            this._coffeeCup.addDrawing("highlight", coffeeCupSpritesheet.getSprite(1));
            this.miniGameActors.push(this._background);
            this.miniGameActors.push(this._coffeeFilter);
            this.miniGameActors.push(this._coffeeGrounds);
            this.miniGameActors.push(this._coffeeMaker);
            this.miniGameActors.push(this._coffeeCup);
            this.scene.on("coffeeClick", () => {
                this._stepCount++;
                if (this.miniGameActors[this._stepCount - 1] == this._coffeeMaker) {
                    this._coffeeMaker.actions
                        .callMethod(() => {
                        // TODO play coffee brewing animation
                        this._coffeeMaker.setDrawing("animate");
                        // TODO ramp up the music/difficulty in the top runner?
                        SoundManager.playCoffeePouringSound();
                        ex.Logger.getInstance().info("brewing coffee...");
                    })
                        .delay(Config.MiniGames.Coffee.BrewTime)
                        .callMethod(() => {
                        ex.Logger.getInstance().info("coffee complete...");
                        let coffeeItem = this.miniGameActors[this._stepCount];
                        coffeeItem.highlight();
                    });
                }
                else if (this._stepCount >= this.miniGameActors.length) {
                    this.onSucceed();
                }
                else {
                    let coffeeItem = this.miniGameActors[this._stepCount];
                    coffeeItem.highlight();
                }
            });
        }
        setup() {
            this._coffeeFilter.highlight();
            this._coffeeCup.unHighlight();
            this._coffeeGrounds.unHighlight();
            this._coffeeMaker.unHighlight();
            this._coffeeMaker.setDrawing("default");
            this._stepCount = 1;
        }
    }

    class Light extends ex.Actor {
        constructor(args, printer) {
            super(args);
            this.printer = printer;
            this.lit = false;
            this.boardX = 0;
            this.boardY = 0;
        }
        onInitialize() {
            this.on("pointerdown", (evt) => {
                if (Config.PrinterMiniGame.HardMode) {
                    if (this.up)
                        this.up.lit = !this.up.lit;
                    if (this.down)
                        this.down.lit = !this.down.lit;
                    if (this.left)
                        this.left.lit = !this.left.lit;
                    if (this.right)
                        this.right.lit = !this.right.lit;
                }
                this.lit = !this.lit;
                SoundManager.playShortBeep();
            });
        }
        onPostUpdate() {
            if (this.lit) {
                this.color = ex.Color.Yellow.clone();
            }
            else {
                this.color = ex.Color.Violet.clone();
            }
            if (this.printer.active) {
                if (this.printer.isAllLit() || this.printer.isAllDark()) {
                    console.log("win");
                    this.printer.onSucceed();
                }
            }
        }
    }

    class PrinterGame extends MiniGame {
        constructor(scene, bottomSubscene) {
            super(scene, bottomSubscene);
            this.miniGameActors = [];
            this.secondsToComplete = 20;
            this.miniGameType = MiniGameType.Printer;
            this._lights = [];
            let copier = new ex.Actor({
                x: 0,
                y: scene.engine.halfDrawHeight,
                anchor: ex.Vector.Zero.clone()
            });
            copier.addDrawing(Resources.txCopier);
            this._background = new ex.Actor({
                x: 400,
                y: 600,
                width: 1,
                height: 1
            });
            this._background.addDrawing(Resources.txCopierBackground);
            this.scene = scene;
            this._copier = copier;
            for (let i = 0; i <
                Config.PrinterMiniGame.GridDimension *
                    Config.PrinterMiniGame.GridDimension; i++) {
                let x = i % Config.PrinterMiniGame.GridDimension;
                let y = Math.floor(i / Config.PrinterMiniGame.GridDimension);
                this._lights[i] = new Light({
                    x: x * Config.PrinterMiniGame.PrinterSpacing +
                        Config.PrinterMiniGame.PrinterStartX,
                    y: y * Config.PrinterMiniGame.PrinterSpacing +
                        Config.PrinterMiniGame.PrinterStartY,
                    width: 20,
                    height: 20,
                    color: ex.Color.Violet.clone()
                }, this);
                this._lights[i].boardX = x;
                this._lights[i].boardY = y;
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
            this.miniGameActors.push(this._background);
            this.miniGameActors.push(this._copier);
            this._lights.forEach(l => this.miniGameActors.push(l));
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
        isAllLit() {
            return this._lights.reduce((prev, curr) => prev && curr.lit, true);
        }
        isAllDark() {
            return this._lights.reduce((prev, curr) => prev && !curr.lit, true);
        }
        setup() {
            this._lights.forEach(l => (l.lit = false));
            let litLight = Config.Rand.pickOne(this._lights);
            this.createSolution(litLight);
        }
        createSolution(light) {
            let x = light.boardX;
            let y = light.boardY;
            light.lit = true;
            if (light.up)
                light.up.lit = true;
            if (light.down)
                light.down.lit = true;
            if (light.left)
                light.left.lit = true;
            if (light.right)
                light.right.lit = true;
        }
    }

    class Cursor extends ex.Actor {
        constructor() {
            super({
                x: 0,
                y: 0,
                scale: new ex.Vector(2, 2),
                anchor: new ex.Vector(0.5, 0),
                rotation: -Math.PI / 4
            });
            // this.addDrawing(resources.txCursor);
            let spriteSheet = new ex.SpriteSheet(Resources.txCursor, 10, 1, 100, 400);
            for (let i = 0; i < 10; i++) {
                this.addDrawing("hand_" + i, spriteSheet.getSprite(i));
            }
        }
        onInitialize(engine) {
            this.y = engine.drawHeight;
            this.z = 50;
            engine.input.pointers.primary.on("move", (evt) => {
                let cursorPos = evt.worldPos.clone();
                if (cursorPos.y > engine.halfDrawHeight + 30 &&
                    cursorPos.x < engine.drawWidth &&
                    cursorPos.x > 0) {
                    this.actions.clearActions();
                    this.pos = cursorPos;
                    this.rotation = ex.EasingFunctions.Linear(evt.worldPos.x, -Math.PI / 4, Math.PI / 4, engine.drawWidth);
                    this.rx = 0;
                }
                else {
                    this.rx = -this.rotation;
                    this.actions
                        .easeTo(engine.halfDrawWidth, engine.drawHeight, 1000, ex.EasingFunctions.EaseInOutQuad)
                        .callMethod(() => {
                        this.rotation = 0;
                        this.rx = 0;
                    });
                }
            });
        }
    }

    class CountDown extends ex.Actor {
        constructor(engine) {
            super({
                x: 70,
                y: engine.halfDrawHeight + 60,
                width: 40,
                height: 40
                // color: ex.Color.Red
            });
            this.maxTime = 100;
            this.timeRemaining = 0;
        }
        onInitialize() {
            this.z = 97;
            this.sprite = Resources.txTimerBg.asSprite();
            this.sprite.anchor = ex.Vector.Half.clone();
        }
        onPostDraw(ctx, delta) {
            ctx.fillStyle = ex.Color.Black.toRGBA();
            ctx.beginPath();
            ctx.arc(0, 0, 24, 0, Math.PI * 2);
            ctx.closePath();
            ctx.fill();
            let percentLeft = this.timeRemaining / this.maxTime;
            let timeLeftRadian = Math.PI * 2 * percentLeft;
            ctx.fillStyle = ex.Color.Green.toRGBA();
            if (percentLeft < 0.75) {
                ctx.fillStyle = ex.Color.Yellow.toRGBA();
            }
            if (percentLeft < 0.5) {
                ctx.fillStyle = ex.Color.Orange.toRGBA();
            }
            if (percentLeft < 0.25) {
                ctx.fillStyle = ex.Color.Red.toRGBA();
            }
            ctx.beginPath();
            ctx.moveTo(0, 0);
            ctx.arc(0, 0, 24, -Math.PI / 2, -Math.PI / 2 + timeLeftRadian, false);
            ctx.closePath();
            ctx.fill();
            this.sprite.draw(ctx, 0, 0);
        }
    }

    class Transition extends ex.Actor {
        constructor(scene) {
            super({
                x: scene.engine.drawWidth + scene.engine.drawWidth,
                y: scene.engine.halfDrawHeight,
                width: scene.engine.drawWidth,
                height: scene.engine.halfDrawHeight,
                anchor: new ex.Vector(0.5, 0),
                color: ex.Color.Red
            });
        }
        onInitialize() {
            this.z = 98;
        }
        start() {
            this.pos = new ex.Vector(this.scene.engine.halfDrawWidth, this.scene.engine.halfDrawHeight);
            this.actions.delay(3000);
        }
        transitionIn() {
            return this.actions
                .easeTo(this.scene.engine.halfDrawWidth, this.y, 1000, ex.EasingFunctions.EaseInOutQuad)
                .asPromise();
        }
        transitionOut() {
            return this.actions
                .easeTo(-this.scene.engine.drawWidth, this.y, 1000, ex.EasingFunctions.EaseInOutQuad)
                .callMethod(() => {
                this.x = this.scene.engine.drawWidth + this.scene.engine.drawWidth;
                this.y = this.scene.engine.halfDrawHeight;
            })
                .asPromise();
        }
    }

    class BottomSubscene {
        constructor(scene) {
            this.miniGameCount = 0;
            this.miniGames = [];
            this._gameOver = false;
            this.transistion = new Transition(scene);
            scene.add(this.transistion);
            this._countdown = new CountDown(scene.engine);
            scene.add(this._countdown);
            console.log("bottom");
            this._miniGameTimer = new ex.Timer(() => {
                this._secondsRemaining--;
                this._countdown.timeRemaining = this._secondsRemaining;
                if (this._secondsRemaining <= 0) {
                    if (!this._gameOver) {
                        this._gameOver = true;
                        //game over logic
                        gameover(scene.engine, GameOverReason.minigame);
                    }
                }
            }, 1000, true);
            scene.add(this._miniGameTimer);
            this.cursor = new Cursor();
            scene.add(this.cursor);
            this.collatingGame = new CollatingGame(scene, Config.MiniGames.Collating.NumberOfWinsToProceed, this);
            //this.miniGames.push(this.collatingGame);
            this.coffeeGame = new CoffeeGame(scene, this);
            //this.miniGames.push(this.coffeeGame);
            this.printerGame = new PrinterGame(scene, this);
            //this.miniGames.push(this.printerGame);
        }
        setup(scene) {
            this.transistion.start();
            var keys = Object.keys(MiniGameType).filter(key => typeof MiniGameType[key] === "number");
            this.miniGames = keys.map(key => MiniGameType[key]);
            console.log(this.miniGames);
            this.cursor.setDrawing("hand_" + Config.Rand.integer(0, 9));
            this.startRandomMiniGame();
        }
        teardown(scene) {
            this.currentMiniGame.cleanUp();
            this.miniGameCount = 0;
            //scene.remove(this._countdownLabel);
        }
        startMiniGame(miniGameType, secondsToComplete) {
            switch (miniGameType) {
                case MiniGameType.Coffee:
                    this.currentMiniGame = this.coffeeGame;
                    break;
                case MiniGameType.Collate:
                    this.currentMiniGame = this.collatingGame;
                    break;
                case MiniGameType.Printer:
                    this.currentMiniGame = this.printerGame;
                    break;
            }
            this._secondsRemaining =
                secondsToComplete || this.currentMiniGame.secondsToComplete;
            this._gameOver = false;
            this.currentMiniGame.start();
            this._miniGameTimer.reset(1000, this._secondsRemaining);
            this._countdown.maxTime = this._secondsRemaining;
            this._countdown.timeRemaining = this._secondsRemaining;
            this.transistion
                .transitionOut()
                .then(() => this.transistion.actions.clearActions());
        }
        startRandomMiniGame() {
            // if (this.miniGameCount % this.miniGames.length === 0) {
            //   this.miniGames = Config.Rand.shuffle(this.miniGames);
            // }
            this.miniGameCount = (this.miniGameCount + 1) % this.miniGames.length;
            this.startMiniGame(this.miniGames[this.miniGameCount]);
            console.log("current game:", this.miniGameCount, this.currentMiniGame);
        }
    }

    class Overlay extends ex.Actor {
        constructor(engine, scene) {
            super({
                x: 0,
                y: 0,
                width: engine.drawWidth,
                height: engine.drawHeight,
                anchor: ex.Vector.Zero.clone()
            });
            scene.add(this);
            this.z = 99;
            // this.addDrawing(resources.txOverlay);
            let spriteSheet = new ex.SpriteSheet(Resources.txOverlay, 10, 1, 800, 800);
            for (let i = 0; i < 10; i++) {
                this.addDrawing("head_" + i, spriteSheet.getSprite(i));
            }
        }
    }

    class ScnMain extends ex.Scene {
        onInitialize(engine) {
            this._top = new TopSubscene(this.engine, this);
            this._bottom = new BottomSubscene(this);
            this._overlay = new Overlay(this.engine, this);
        }
        onActivate() {
            this._top.setup(this);
            this._top.healthMeter.health = Config.Health.Default;
            this._bottom.setup(this);
            SoundManager.startOfficeAmbience();
            let randomHeadIndex = Config.Rand.integer(0, 9);
            console.log("setting overlay to head: " + randomHeadIndex);
            this._overlay.setDrawing("head_" + randomHeadIndex);
        }
        onDeactivate() {
            this._top.teardown(this);
            this._bottom.teardown(this);
            SoundManager.stopBackgroundAudio();
        }
    }

    const game = new ex.Engine({
        canvasElementId: "game",
        width: Config.GameWidth,
        height: Config.GameHeight
    });
    SoundManager.init();
    // Physics
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
        newgame(game);
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
                gameover(game, GameOverReason.debug);
                break;
        }
    });
    ////////////////////////////////////////////////////////////////////

    exports.game = game;

    return exports;

}({},ex));
//# sourceMappingURL=bundle.js.map
