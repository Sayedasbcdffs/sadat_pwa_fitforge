<script setup>
import { onMounted, ref } from 'vue';

const developerName = 'FitForge Developer: Sadat Sayed Mubasher';
const timestamp = ref(new Date().toLocaleString());

onMounted(() => {
  console.info(`${developerName} Impressum geöffnet um ${timestamp.value}`);
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
          <div class="value">Tel: +43 660 123456, Mail: hello@fitforge.app</div>
        </div>
        <div class="content-block">
          <div class="label">Entwickler:in</div>
          <div class="value">
            {{ developerName }}
          </div>
        </div>
        <div class="content-block">
          <div class="label">Letzter Aufruf</div>
          <div class="value">{{ timestamp }}</div>
        </div>
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
  background: #ffffff;
  color: #1c1c1c;
  border-radius: 18px;
  border: 1px solid #e1e1e1;
  box-shadow: none;
}

.card-header {
  padding: 18px 20px 8px;
}

.eyebrow {
  font-size: 12px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: #4f4f4f;
  margin-bottom: 4px;
}

.title {
  font-size: 28px;
  font-weight: 700;
  color: #1c1c1c;
}

.subtitle {
  opacity: 0.8;
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
  color: #4f4f4f;
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
  color: #4a4a4a;
}

.neutral-chip {
  background: #ededed;
  color: #1c1c1c;
  border-color: #d6d6d6;
}

.neutral-chip.q-chip--outline {
  background: transparent;
  color: #2c2c2c;
}
</style>
