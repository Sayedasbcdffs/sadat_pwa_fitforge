import { createApp } from 'vue';
import { Quasar, Notify } from 'quasar';
import { createPinia } from 'pinia';
import { registerSW } from 'virtual:pwa-register';

import '@quasar/extras/roboto-font/roboto-font.css';
import '@quasar/extras/material-icons/material-icons.css';
import '@quasar/extras/fontawesome-v6/fontawesome-v6.css';
import quasarIconSet from 'quasar/icon-set/material-icons';

import 'quasar/src/css/index.sass';

import App from './App.vue';
import router from './router';

const app = createApp(App);

const broadcastSWStatus = (detail) => {
  window.__FITFORGE_SW_STATUS__ = detail;
  window.dispatchEvent(new CustomEvent('fitforge-sw', { detail }));
};

registerSW({
  immediate: true,
  onRegisteredSW(swUrl) {
    broadcastSWStatus({ status: 'registered', swUrl, source: 'workbox' });
    console.info('FitForge Workbox SW registered:', swUrl);
  },
  onOfflineReady() {
    broadcastSWStatus({ status: 'offline-ready' });
    console.info('FitForge Workbox is ready for offline use.');
  },
  onNeedRefresh() {
    broadcastSWStatus({ status: 'update-available' });
  },
});

// initialise store
app.use(createPinia());
// initialise router after store to enable store based router guards
app.use(router);

app.use(Quasar, {
  plugins: { Notify },
  iconSet: quasarIconSet,
});

app.mount('#app');
