import { Random, Vector, Logger } from "excalibur";
const rand = new Random(Date.now());
Logger.getInstance().info("World seed", rand.seed);
export default {
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
        Pos: new Vector(10, 10),
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
        MinSpawnInterval: 500,
        MaxSpawnInterval: 2000
    },
    PrinterMiniGame: {
        GridDimension: 3
    },
    /**
     * Obstacles spawn interval
     */
    ObstacleSpawnMinInterval: 1000,
    ObstacleSpawnMaxInterval: 5000,
    Rand: rand
};
//# sourceMappingURL=config.js.map