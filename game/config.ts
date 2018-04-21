import { Random, Vector } from "excalibur";

const rand = new Random(12345678910);

export default {
  AnalyticsEndpoint:
    "https://ludum41stats.azurewebsites.net/api/HttpLudum41StatsTrigger?code=eumYNdyRh0yfBAk0NLrfrKkXxtGsX7/Jo5gAcYo13k3GcVFNBdG3yw==",

  GameWidth: 800, // pixels
  GameHeight: 600, // pixels

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
    Pos: new Vector(10, 10),
    Default: 10,
    FontSize: 50
  },

  /**
   * Obstacles spawn interval
   */
  ObstacleSpawnMinInterval: 1000,
  ObstacleSpawnMaxInterval: 3000,

  Rand: rand
};
