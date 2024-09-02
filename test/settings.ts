import { createSettings } from "../src";

export type SettingsData = {
  showDevelopmentFeature: boolean;
};

export const { SettingsProvider, useSettings } = createSettings<SettingsData>({
  uri: "/api/settings",
});
