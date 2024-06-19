import SettingsClient from "./SettingsClient";
import React, { Context, PropsWithChildren, useEffect, useState } from "react";

export default function createSettingsProvider<T>(
  SettingsContext: Context<T | undefined>,
  settingsClient: SettingsClient<T>,
) {
  return function SettingsProvider({ children }: PropsWithChildren) {
    const [settings, setSettings] = useState<T | undefined>();
    useEffect(() => {
      const fetchSettings = async () => {
        await settingsClient.fetchSettings();
        setSettings(settingsClient.getSettings());
      };
      void fetchSettings();
    }, []);

    return (
      <SettingsContext.Provider value={settings}>
        {children}
      </SettingsContext.Provider>
    );
  };
}
