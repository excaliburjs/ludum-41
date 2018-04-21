import Config from "./config";
export class Analytics {
    static publish(payload) {
        return fetch(Config.AnalyticsEndpoint, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(payload)
        });
    }
}
//# sourceMappingURL=analytics.js.map