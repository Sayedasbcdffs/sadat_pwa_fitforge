<script setup>
import { onMounted, ref } from 'vue';

const developerName = 'FitForge • Developer: Sadat Sayed Mubasher';
const timestamp = ref(new Date().toLocaleString());

onMounted(() => {
  console.info(`${developerName} • Impressum geöffnet um ${timestamp.value}`);
});
</script>

<template>
  <q-page class="impressum-page q-pa-lg">
    <div class="fitforge-card">
      <div class="card-header">
        <div class="eyebrow">Impressum</div>
        <div class="title">FitForge Gym PWA</div>
        <div class="subtitle">Rechtliche Angaben und Kontakt</div>
      </div>

      <div class="content">
        <div class="content-block">
          <div class="label">Verantwortlich</div>
          <div class="value">FitForge Studio, Lift Street 15, 1010 Wien</div>
        </div>
        <div class="content-block">
          <div class="label">Kontakt</div>
          <div class="value">Tel: +43 660 123456 · Mail: hello@fitforge.app</div>
        </div>
        <div class="content-block">
          <div class="label">Entwickler:in</div>
          <div class="value">
            {{ developerName }}
            <q-badge outline color="secondary" class="q-ml-sm">Konsole öffnen</q-badge>
          </div>
        </div>
        <div class="content-block">
          <div class="label">Letzter Aufruf</div>
          <div class="value">{{ timestamp }}</div>
        </div>
      </div>

      <q-separator class="q-my-md" />

      <div class="note">
        <q-icon name="info" size="20px" class="q-mr-sm" />
        Dieser Screen ist für den Screenshot mit geöffneter Browser-Konsole gedacht.
        Der Log enthält deinen Namen und Zeitstempel.
      </div>
    </div>
  </q-page>
</template>

<style scoped>
.impressum-page {
  max-width: 1100px;
  margin: 0 auto;
}

.fitforge-card {
  background: linear-gradient(145deg, rgba(12, 18, 34, 0.95), rgba(22, 33, 54, 0.92));
  color: #e8edf5;
  border-radius: 18px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  box-shadow: 0 24px 50px rgba(0, 0, 0, 0.25);
}

.card-header {
  padding: 18px 20px 8px;
}

.eyebrow {
  font-size: 12px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: #7cd0c3;
  margin-bottom: 4px;
}

.title {
  font-size: 28px;
  font-weight: 700;
  color: #fefefe;
}

.subtitle {
  opacity: 0.75;
  margin-top: 4px;
}

.content {
  padding: 4px 20px 18px;
  display: grid;
  gap: 10px;
}

.content-block {
  display: flex;
  flex-direction: column;
  gap: 3px;
}

.label {
  font-size: 12px;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  opacity: 0.7;
}

.value {
  font-size: 16px;
  font-weight: 600;
}

.note {
  padding: 0 20px 18px;
  display: flex;
  align-items: center;
  gap: 6px;
  color: #b6c1d8;
}
</style>
