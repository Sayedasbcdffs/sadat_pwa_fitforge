# FitForge Gym PWA

Vue 3 + Quasar PWA Prototype for the FitForge gym. Includes responsive portrait/landscape layouts, navigation drawer, and Workbox-powered offline caching.

## How to run

```sh
npm install
npm run dev
# or build/preview
npm run build
npm run preview
```

## Screenshot checklist

- **Main Screen Portrait**: keep drawer closed so the workout cards (min. 3 items) are fully visible.
- **Main Screen Portrait + Navigation**: open the drawer (left menu) so navigation is expanded.
- **Main Screen Landscape**: use browser device emulation, rotate to landscape; the grid will show 2 columns.
- **Impressum**: open `/impressum` and show the browser console; it logs your (editable) name and timestamp.
- **Workbox proof**: open DevTools → Application → Service Workers to show the registered Workbox SW; the banner on the home panel mentions it too.

## Notes

- Service Worker is enabled in dev via `vite-plugin-pwa` (`devOptions.enabled: true`) for easy screenshots.
- Logo files live in `public/icon/fitforge-logo.svg` and `src/assets/fitforge-logo.svg`.
