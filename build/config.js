import { Random, Vector, Logger } from "excalibur";
// GOOD SEEDS
// 1524409882715
var rand;
export function createRand() {
    rand = new Random(Date.now());
    Logger.getInstance().info("World seed", rand.seed);
}
export default {
    CheatCode: true,
    AnalyticsEndpoint: "https://ludum41stats.azurewebsites.net/api/HttpLudum41StatsTrigger?code=eumYNdyRh0yfBAk0NLrfrKkXxtGsX7/Jo5gAcYo13k3GcVFNBdG3yw==",
    GameWidth: 800,
    GameHeight: 800,
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
        Pos: new Vector(10, 10),
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
//# sourceMappingURL=config.js.map