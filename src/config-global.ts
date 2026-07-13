import packageJson from '../package.json';

// ----------------------------------------------------------------------

export type ConfigValue = {
  appName: string;
  appVersion: string;
  apiBaseUrl: string;
};

export const CONFIG: ConfigValue = {
  appName: 'Universitas Matana',
  appVersion: packageJson.version,
  apiBaseUrl: import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000/api/',
};
