import { handlers } from "./handlers";
import { SettingsData, SettingsProvider, useSettings } from "./settings";
import { render, screen } from "@testing-library/react";
import { delay, http, HttpResponse } from "msw";
import { setupServer } from "msw/node";

const TESTID_SUCCESSFUL_FETCH = "TESTID_SUCCESSFUL_FETCH";
const TESTID_PENDING_FETCH = "TESTID_PENDING_FETCH";
const TESTID_FAILURE_FETCH = "TESTID_FAILURE_FETCH";

const server = setupServer(...handlers);

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

const Main = () => {
  const { showDevelopmentFeature } = useSettings() ?? {};
  return showDevelopmentFeature ? (
    <div data-testid="TESTID_SUCCESSFUL_FETCH" />
  ) : null;
};

const App = () => {
  return (
    <SettingsProvider
      loading={<div data-testid={TESTID_PENDING_FETCH}>Loading...</div>}
      error={<div data-testid={TESTID_FAILURE_FETCH}>Error</div>}
    >
      <Main />
    </SettingsProvider>
  );
};

describe("Render correct", () => {
  it("when settings have been fetched successfully", async () => {
    server.use(
      http.get("/api/settings", async () =>
        HttpResponse.json<SettingsData>({
          showDevelopmentFeature: true,
        }),
      ),
    );
    render(<App />);
    const element = await screen.findByTestId(TESTID_SUCCESSFUL_FETCH);
    expect(element.nodeName.toLowerCase()).equals("div");
  });

  it("when settings fetch pending", async () => {
    server.use(http.get("/api/settings", async () => await delay("infinite")));
    render(<App />);
    const element = await screen.findByTestId(TESTID_PENDING_FETCH);
    expect(element.nodeName.toLowerCase()).equals("div");
    expect(element.textContent).equals("Loading...");
  });

  it("when settings fetch fails", async () => {
    server.use(http.get("/api/settings", async () => HttpResponse.error()));
    render(<App />);
    const element = await screen.findByTestId(TESTID_FAILURE_FETCH);
    expect(element.nodeName.toLowerCase()).equals("div");
    expect(element.textContent).equals("Error");
  });
});
