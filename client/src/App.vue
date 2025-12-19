<script setup>
import {
  computed, onBeforeUnmount, onMounted, provide, ref,
} from 'vue';
import { useRoute } from 'vue-router';

const leftDrawerOpen = ref(false);
const route = useRoute();
const swStatus = ref({ status: 'pending' });

const navItems = [
  { to: '/', name: 'home', label: 'Dashboard', icon: 'dashboard' },
  { to: '/about', name: 'about', label: 'Coaching', icon: 'insights' },
  { to: '/impressum', name: 'impressum', label: 'Impressum', icon: 'gavel' },
];

const logo = `../public/icon/sadat_logo.png`;

const activeRoute = computed(() => route.name);
const swStatusLabel = computed(() => {
  const status = swStatus.value.status || swStatus.value;
  if (status === 'offline-ready') return 'Offline ready';
  if (status === 'registered') return 'Workbox ready';
  return `SW: ${status}`;
});

const toggleLeftDrawer = () => {
  leftDrawerOpen.value = !leftDrawerOpen.value;
};

const handleSwEvent = (event) => {
  swStatus.value = event.detail;
};

onMounted(() => {
  if (window.__FITFORGE_SW_STATUS__) {
    swStatus.value = window.__FITFORGE_SW_STATUS__;
  }
  window.addEventListener('fitforge-sw', handleSwEvent);
});

onBeforeUnmount(() => {
  window.removeEventListener('fitforge-sw', handleSwEvent);
});

provide('swStatus', swStatus);
</script>

<template>
  <q-layout view="lHh Lpr lFf" class="fitforge-layout">
    <q-header elevated class="fitforge-header">
      <q-toolbar>
        <q-btn dense flat round icon="menu" @click="toggleLeftDrawer" />
        <div class="brand">
          <q-avatar square size="42px">
            <img :src="logo" alt="FitForge logo">
          </q-avatar>
          <div class="brand__text">
            <div class="brand__name">FitForge</div>
            <div class="brand__meta">Progressive Web App (PWA)</div>
          </div>
        </div>

        <q-space />

        <q-chip dense color="white" text-color="black" icon="bolt">
          {{ swStatusLabel }}
        </q-chip>
      </q-toolbar>

      <q-tabs align="left" indicator-color="white" active-color="white" dense class="fitforge-tabs">
        <q-route-tab v-for="item in navItems" :key="item.to" :to="item.to" :label="item.label" :icon="item.icon" />
      </q-tabs>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" side="left" :width="260" class="fitforge-drawer" show-if-above>
      <div class="drawer__head">
        <div class="drawer__title">Navigation</div>
        <div class="drawer__meta">Für Screenshot: Drawer öffnen</div>
      </div>
      <q-list separator>
        <q-item v-for="item in navItems" :key="item.to" clickable v-ripple :active="activeRoute === item.name" :to="item.to">
          <q-item-section avatar>
            <q-icon :name="item.icon" />
          </q-item-section>
          <q-item-section>
            <q-item-label>{{ item.label }}</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
      
    </q-drawer>

    <q-page-container class="fitforge-body">
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<style>
@font-face {
  font-family: 'Montserrat';
  src: url('/fonts/Montserrat/Montserrat-Regular.ttf') format('truetype');
}

@font-face {
  font-family: 'Lora';
  src: url('/fonts/Lora/Lora-Regular.ttf') format('truetype');
}

@font-face {
  font-family: 'LibreBodoni';
  src: url('/fonts/LibreBodoni/LibreBodoni-Regular.ttf') format('truetype');
}

* {
  font-family: 'Montserrat', sans-serif;
}

body {
  background: radial-gradient(circle at 20% 20%, rgba(100, 244, 172, 0.12), transparent 35%),
    radial-gradient(circle at 80% 10%, rgba(92, 123, 255, 0.12), transparent 25%),
    #f5f7fb;
}

.fitforge-layout {
  min-height: 100vh;
}

.fitforge-header {
  background: linear-gradient(90deg, #0f1629, #172640);
  color: #ffffff;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
}

.fitforge-tabs {
  padding-left: 6px;
}

.brand {
  display: flex;
  align-items: center;
  gap: 10px;
}

.brand__text {
  line-height: 1.1;
}

.brand__name {
  font-weight: 800;
  letter-spacing: 0.5px;
}

.brand__meta {
  font-size: 12px;
  color: #cbd5f5;
}

.fitforge-drawer {
  background: #0f1629;
  color: #e7ecf7;
}

.drawer__head {
  padding: 16px 16px 8px;
}

.drawer__title {
  font-size: 18px;
  font-weight: 700;
}

.drawer__meta {
  color: #9db4e7;
  font-size: 13px;
}

.drawer__footer {
  padding: 12px 16px 16px;
  background: rgba(255, 255, 255, 0.04);
  margin-top: auto;
}

.eyebrow {
  font-size: 10px;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: #7cd0c3;
}

.drawer__tip {
  color: #c3d1ee;
  margin-top: 6px;
  line-height: 1.4;
}

.fitforge-body {
  padding: 12px;
}
</style>
