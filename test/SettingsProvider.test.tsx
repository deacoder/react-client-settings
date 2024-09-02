import { createSettings } from "../src";
import { render, screen } from "@testing-library/react";
import { http, HttpResponse } from "msw";
import { setupServer } from "msw/node";

type SettingsData = {
  showDevelopmentFeature: boolean;
  numberOfAnything?: number;
};

const { SettingsProvider, useSettings } = createSettings<SettingsData>({
  uri: "/api/settings",
});

const TESTID_SUCCESSFUL_FETCH = "TESTID_SUCCESSFUL_FETCH";
const TEST_SETTING_NUMBER = 42;

const Main = () => {
  const { showDevelopmentFeature, numberOfAnything } = useSettings() ?? {};

  return showDevelopmentFeature ? (
    <div data-testid={TESTID_SUCCESSFUL_FETCH}>{numberOfAnything}</div>
  ) : null;
};

const App = () => {
  return (
    <SettingsProvider>
      <Main />
    </SettingsProvider>
  );
};

const server = setupServer(
  http.get("/api/settings", () =>
    HttpResponse.json<SettingsData>({
      showDevelopmentFeature: true,
      numberOfAnything: TEST_SETTING_NUMBER,
    }),
  ),
);

beforeAll(() => {
  // Start the interception.
  server.listen();
});

afterEach(() => {
  // Remove any handlers you may have added
  // in individual tests (runtime handlers).
  server.resetHandlers();
});

afterAll(() => {
  // Disable request interception and clean up.
  server.close();
});

describe("Render correct", () => {
  it("when settings have been fetched successfully", async () => {
    render(<App />);
    const element = await screen.findByTestId(TESTID_SUCCESSFUL_FETCH);
    expect(element.textContent).equals(TEST_SETTING_NUMBER.toString());
  });
});
