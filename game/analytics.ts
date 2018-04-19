interface IPayload {
  date: string; // date
  commit: string;
  seed: number; // seeded value
  started: number; // time
}

class Analytics {
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
