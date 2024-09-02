import { SettingsData } from "./settings";
import { http, HttpResponse } from "msw";

export const handlers = [
  http.get("/api/settings", async () =>
    HttpResponse.json<SettingsData>({
      showDevelopmentFeature: true,
    }),
  ),
];
