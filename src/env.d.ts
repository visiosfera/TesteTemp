/// <reference types="astro/client" />
/// <reference types="vite-plugin-pwa/client" />
/// <reference types="vite-plugin-pwa/react" />

declare module "virtual:pwa-assets/head" {
  export const pwaAssetsHead: {
    themeColor?: { content: string };
    links: Record<string, string>[];
  };
}

declare module "virtual:pwa-register" {
  export function registerSW(options?: {
    immediate?: boolean;
    onRegisteredSW?: (swUrl: string) => void;
    onOfflineReady?: () => void;
  }): void;
}

declare module "virtual:pwa-info" {
  export const pwaInfo: {
    webManifest: {
      linkTag: string;
    };
  };
}

declare module "virtual:pwa-register/react" {
  import type { Dispatch, SetStateAction } from "react";
  import type { RegisterSWOptions } from "vite-plugin-pwa/types";

  export type { RegisterSWOptions };
  export function useRegisterSW(options?: RegisterSWOptions): {
    needRefresh: [boolean, Dispatch<SetStateAction<boolean>>];
    offlineReady: [boolean, Dispatch<SetStateAction<boolean>>];
    updateServiceWorker: (reloadPage?: boolean) => Promise<void>;
  };
}
