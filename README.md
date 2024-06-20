# react-client-settings

`react-client-settings` is a zero dependency library for React applications that provides a context provider and a hook to manage global application settings (variables) in the client.
The library retrieves the settings from any configurable backend and stores the result in a React context. The provided hook can then be used to access these settings throughout your application.

## Features

- Fetch settings from a backend API upon initialization.
- Store settings in a React context for easy access.
- Provide a hook for consuming settings within your components.

## Installation

Install the package using npm, yarn or pnpm:

```Shell
npm install react-client-settings
```

or

```Shell
yarn add react-client-settings
```

or

```Shell
pnpm add react-client-settings
```

## Usage

Create typed context provider and hook.

```Typescript
// my-settings.ts
import { createSettings } from 'react-client-settings'

export type SettingsData = {
  showDevelopmentFeature: boolean
  numberOfAnything?: number
}

export const { SettingsProvider, useSettings } = createSettings<SettingsData>({
  uri: '/api/settings',
})
```

**Note**: Replace `/api/settings` with the actual endpoint from which your application fetches its settings. Ensure that the settings API responds with a JSON object that can be consumed by the context provider.

### Context Provider

Wrap your application with the `Settings Provider` to make the settings available throughout your component tree.

```Typescript
import { SettingsProvider } from './my-settings';

// Next.js
export default function MyApp({ Component, pageProps }) {
  return (<SettingsProvider>
             <Component {...pageProps} />
          </SettingsProvider>
  );
}
```

### Hook

Use the useSettings hook to access the settings within your components.

```Typescript
import { useSettings } from './my-settings';

const MyComponent = () => {
  const { showDevelopmentFeature } = useSettings();

  return (
    <div>
      <h1>Application Settings</h1>
      {showDevelopmentFeature && <p>Development feature</p>}
    </div>
  );
};

export default MyComponent;
```

Enjoy using react-client-settings! If you have any questions or feedback, feel free to open an issue on the GitHub repository.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request on GitHub.

## License

This project is licensed under the MIT License.
