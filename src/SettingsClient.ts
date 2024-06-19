type SettingClientConfig = {
  uri: string;
};

class SettingsClient<T> {
  private settings: T | undefined;

  constructor(private config: SettingClientConfig) {}

  public async fetchSettings() {
    const { uri } = this.config;
    const requestHeaders = new Headers();
    requestHeaders.set("Content-Type", "application/json");
    const response = await fetch(uri, {
      headers: requestHeaders,
      method: "GET",
    });
    if (response.status === 200) {
      this.settings = (await response.json()) as T;
    }
  }

  public getSettings(): T | undefined {
    return this.settings;
  }
}

export default SettingsClient;
