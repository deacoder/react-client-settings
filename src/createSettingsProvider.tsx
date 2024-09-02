import SettingsClient from "./SettingsClient";
import React, {
  Context,
  PropsWithChildren,
  ReactNode,
  useEffect,
  useState,
} from "react";

export default function createSettingsProvider<T>(
  SettingsContext: Context<T | undefined>,
  settingsClient: SettingsClient<T>,
) {
  return function SettingsProvider({
    children,
    loading,
    error,
  }: PropsWithChildren<{ loading?: ReactNode; error?: ReactNode }>) {
    const [settings, setSettings] = useState<{
      data: T | undefined;
      state: "idle" | "loading" | "error";
    }>({ data: undefined, state: "loading" });
    useEffect(() => {
      const fetchSettings = async () => {
        try {
          await settingsClient.fetchSettings();
          setSettings({ data: settingsClient.getSettings(), state: "idle" });
        } catch {
          setSettings({ data: undefined, state: "error" });
        }
      };
      void fetchSettings();
    }, []);

    return (
      <SettingsContext.Provider value={settings.data}>
        {settings.state === "loading" && loading
          ? loading
          : settings.state === "error" && error
            ? error
            : children}
      </SettingsContext.Provider>
    );
  };
}
