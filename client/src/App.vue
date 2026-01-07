<script setup>
import { computed, onBeforeUnmount, onMounted, provide, ref } from "vue";
import { useRoute } from "vue-router";

const leftDrawerOpen = ref(false);
const route = useRoute();
const swStatus = ref({ status: "pending" });

const navItems = [
  { to: "/", name: "home", label: "Dashboard" },
  { to: "/about", name: "about", label: "Coaching" },
  { to: "/impressum", name: "impressum", label: "Impressum" },
];

const logo = `/icon/sadat_logo.png`;

const activeRoute = computed(() => route.name);
const swStatusLabel = computed(() => {
  const status = swStatus.value.status || swStatus.value;
  if (status === "offline-ready") return "Offline ready";
  if (status === "registered") return "Workbox ready";
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
  window.addEventListener("fitforge-sw", handleSwEvent);
});

onBeforeUnmount(() => {
  window.removeEventListener("fitforge-sw", handleSwEvent);
});

provide("swStatus", swStatus);
</script>

<template>
  <q-layout view="lHh Lpr lFf" class="fitforge-layout">
    <q-header elevated class="fitforge-header">
      <q-toolbar>
        <q-btn dense flat round icon="menu" @click="toggleLeftDrawer" />
        <div class="brand">
          <q-avatar square size="42px">
            <img :src="logo" alt="FitForge logo" />
          </q-avatar>
          <div class="brand__text">
            <div class="brand__name">FitForge</div>
            <div class="brand__meta">Progressive Web App (PWA)</div>
          </div>
        </div>

        <q-space />

        <q-chip dense icon="bolt" class="neutral-chip">
          {{ swStatusLabel }}
        </q-chip>
      </q-toolbar>

      <q-tabs align="left" dense class="fitforge-tabs">
        <q-route-tab
          v-for="item in navItems"
          :key="item.to"
          :to="item.to"
          :label="item.label"
          :icon="item.icon"
        />
      </q-tabs>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      side="left"
      :width="260"
      class="fitforge-drawer"
      show-if-above
    >
      <div class="drawer__head">
        <div class="drawer__title">Navigation</div>
      </div>
      <q-list separator>
        <q-item
          v-for="item in navItems"
          :key="item.to"
          clickable
          v-ripple
          :active="activeRoute === item.name"
          :to="item.to"
        >
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
  font-family: "Montserrat";
  src: url("/fonts/Montserrat/Montserrat-Regular.ttf") format("truetype");
}

@font-face {
  font-family: "Lora";
  src: url("/fonts/Lora/Lora-Regular.ttf") format("truetype");
}

@font-face {
  font-family: "LibreBodoni";
  src: url("/fonts/LibreBodoni/LibreBodoni-Regular.ttf") format("truetype");
}

* {
  font-family: "Montserrat", sans-serif;
}

body {
  background: #f5f5f5;
}

.fitforge-layout {
  min-height: 100vh;
}

.fitforge-header {
  background: #f7f7f7;
  color: #1c1c1c;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  border-bottom: 1px solid #e1e1e1;
}

.fitforge-tabs {
  padding-left: 6px;
  border-top: 1px solid #e1e1e1;
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
  color: #4f4f4f;
}

.fitforge-drawer {
  background: #f2f2f2;
  color: #1c1c1c;
  border-right: 1px solid #e1e1e1;
}

.drawer__head {
  padding: 16px 16px 8px;
}

.drawer__title {
  font-size: 18px;
  font-weight: 700;
}

.drawer__meta {
  color: #4f4f4f;
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
  color: #4f4f4f;
}

.drawer__tip {
  color: #4a4a4a;
  margin-top: 6px;
  line-height: 1.4;
}

.fitforge-body {
  padding: 12px;
}

.neutral-chip {
  background: #ededed;
  color: #1c1c1c;
  border-color: #d6d6d6;
}

.neutral-chip.q-chip--dense {
  padding-left: 8px;
  padding-right: 8px;
}

.fitforge-tabs .q-tab {
  color: #444;
}

.fitforge-tabs .q-tab--active {
  color: #1c1c1c;
}

.fitforge-tabs .q-tabs__indicator {
  background: #b5b5b5;
}

.fitforge-drawer .q-item {
  border-radius: 10px;
  margin: 4px 8px;
}

.fitforge-drawer .q-item--active {
  background: #e7e7e7;
  color: #1c1c1c;
}
</style>
