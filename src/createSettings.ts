import SettingsClient from "./SettingsClient";
import createSettingsProvider from "./createSettingsProvider";
import { createContext, useContext } from "react";

type SettingsContextConfig = {
  uri: string;
};

export default function createSettings<T>(config: SettingsContextConfig) {
  const SettingsContext = createContext<T | undefined>(undefined);

  return {
    SettingsProvider: createSettingsProvider(
      SettingsContext,
      new SettingsClient<T>(config),
    ),
    useSettings: () => useContext(SettingsContext),
  };
}
