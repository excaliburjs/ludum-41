import { Random } from "excalibur";
const rand = new Random(12345678910);
export default {
    AnalyticsEndpoint: "https://ludum41stats.azurewebsites.net/api/HttpLudum41StatsTrigger?code=eumYNdyRh0yfBAk0NLrfrKkXxtGsX7/Jo5gAcYo13k3GcVFNBdG3yw==",
    GameWidth: 800,
    GameHeight: 600,
    // Top Floor config
    Floor: {
        Speed: -100,
        Height: 20
    },
    // Top Player config
    TopPlayer: {
        Width: 30,
        Height: 50
    },
    /**
     * Obstacles spawn interval
     */
    ObstacleSpawnMinInterval: 1000,
    ObstacleSpawnMaxInterval: 3000,
    Rand: rand
};
//# sourceMappingURL=config.js.map