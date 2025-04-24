
/// <reference types="vite/client" />

// Make sure that React is imported properly
declare module 'react' {
  interface ImportMeta {
    env: {
      MODE: string;
      BASE_URL: string;
      PROD: boolean;
      DEV: boolean;
      SSR: boolean;
      [key: string]: string | boolean | undefined;
    };
  }
}
