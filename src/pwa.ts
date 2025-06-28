import { registerSW } from "virtual:pwa-register";

registerSW({
  immediate: true,
  onRegisteredSW(swUrl) {
    console.log("Service Worker registrado em:", swUrl);
  },
  onOfflineReady() {
    console.log("Aplicativo PWA pronto para uso offline!");
  },
});
