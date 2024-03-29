import Config from "./config";

interface IPayload {
  date: string; // date
  commit: string;
  seed: number; // seeded value
  started: number; // time
  duration: number;
  reason: any;
  miniGamesCompleted: number;
}

export class Analytics {
  public static publish(payload: IPayload) {
    return fetch(Config.AnalyticsEndpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    });
  }
}
