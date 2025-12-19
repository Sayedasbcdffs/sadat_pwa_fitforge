<script setup>
import { computed, inject } from 'vue';
import { useWorkoutStore } from '../stores/workoutStore';

const workoutStore = useWorkoutStore();
const swStatus = inject('swStatus', null);

const topWorkouts = computed(() => workoutStore.workouts.slice(0, 4));
const stats = computed(() => [
  { label: 'Strength blocks', value: workoutStore.strengthCount },
  { label: 'Cardio sessions', value: workoutStore.cardioCount },
  { label: 'Ø Duration', value: `${workoutStore.averageDuration} min` },
]);

const swLabel = computed(() => {
  if (!swStatus) return 'Service Worker pending';
  const value = swStatus.value.status || swStatus.value;
  if (value === 'offline-ready') return 'Offline ready';
  if (value === 'registered') return 'Workbox ready';
  return `SW: ${value}`;
});
</script>

<template>
  <q-page class="fitforge-page q-pa-md">
    <section class="hero">
      <div class="hero__copy">
        <div class="eyebrow">FitForge Gym</div>
        <h1>Forge routine, track metrics, stay ready.</h1>
        <p>
          Portrait zeigt die Karten-Ansicht mit Navigation, in Landscape erweitert sich das Grid
          automatisch. Mindestens drei Sessions sind sichtbar, damit deine Screenshots passen.
        </p>
        <div class="hero__chips">
          <q-chip color="primary" text-color="white" icon="offline_bolt" size="md">
            {{ swLabel }}
          </q-chip>
          <q-chip outline color="secondary" icon="phone_iphone">Mobile Portrait / Landscape</q-chip>
          <q-chip outline color="accent" icon="menu">Navigation ein/aus klappbar</q-chip>
        </div>
      </div>
      <div class="hero__cta">
        <q-btn color="primary" icon="play_arrow" label="Start Session" class="q-mb-sm" />
        <q-btn outline color="white" icon="qr_code" label="Zeige Check-in Code" />
      </div>
    </section>

    <section class="grid">
      <div class="panel list">
        <div class="panel__head">
          <div>
            <div class="eyebrow">Main Screen</div>
            <div class="panel__title">Aktive Sessions</div>
            <div class="subtitle">
              Öffne links die Navigation für den Screenshot "Portrait + Navigation" und klappe sie für
              die Portrait-only Variante wieder zu.
            </div>
          </div>
          <q-btn flat color="secondary" icon="filter_list" label="Sortieren" />
        </div>

        <div class="workout-list">
          <q-card v-for="item in topWorkouts" :key="item.id" flat bordered class="workout-card">
            <div class="card__row">
              <div class="badge">{{ item.category }}</div>
              <q-chip dense color="accent" text-color="black" icon="timer">{{ item.durationMinutes }} min</q-chip>
            </div>
            <div class="card__title">
              {{ item.name }}
              <span class="difficulty">{{ item.difficulty }}</span>
            </div>
            <div class="card__meta">
              <q-icon name="fitness_center" size="18px" class="q-mr-xs" /> {{ item.muscleGroup.join(', ') }}
            </div>
            <div class="card__meta small">
              <q-icon name="sensors" size="18px" class="q-mr-xs" />
              Sensoren:
              <span class="sensor" v-for="sensor in item.sensorData" :key="sensor.type">
                {{ sensor.type }} – {{ sensor.description }}
              </span>
            </div>
            <div class="card__footer">
              <div class="vibe">{{ item.vibe }}</div>
              <q-btn dense outline color="primary" icon="play_circle" label="Los" />
            </div>
          </q-card>
        </div>
      </div>

      <div class="panel side">
        <div class="panel__head">
          <div class="eyebrow">Coach Panel</div>
          <div class="panel__title">Live Widgets</div>
          <div class="subtitle">Status für Screenshots in Landscape sichtbar.</div>
        </div>

        <div class="stat-grid">
          <div v-for="stat in stats" :key="stat.label" class="stat">
            <div class="stat__label">{{ stat.label }}</div>
            <div class="stat__value">{{ stat.value }}</div>
          </div>
        </div>

        <q-separator spaced color="accent" />

        <div class="highlights">
          <div v-for="highlight in workoutStore.highlights" :key="highlight.title" class="highlight">
            <div class="highlight__label">{{ highlight.title }}</div>
            <div class="highlight__value">{{ highlight.value }}</div>
            <div class="highlight__detail">{{ highlight.detail }}</div>
          </div>
        </div>

        <q-banner inline-actions rounded class="sw-banner bg-primary text-white q-mt-md">
          Workbox Service Worker aktiv. Öffne die DevTools → Application → Service Workers
          für den Screenshot.
          <template #action>
            <q-btn flat dense color="white" icon="visibility" label="Zeigen" to="/impressum" />
          </template>
        </q-banner>
      </div>
    </section>
  </q-page>
</template>

<style scoped>
.fitforge-page {
  display: flex;
  flex-direction: column;
  gap: 18px;
}

.hero {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 16px;
  padding: 16px;
  background: linear-gradient(120deg, #0f1629, #1c2b46);
  color: #f3f7ff;
  border-radius: 18px;
  border: 1px solid rgba(255, 255, 255, 0.08);
}

.hero__copy h1 {
  margin: 6px 0;
  font-size: 28px;
}

.hero__copy p {
  opacity: 0.85;
  margin: 0 0 12px;
}

.hero__chips {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.hero__cta {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: center;
  gap: 8px;
}

.eyebrow {
  font-size: 11px;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: #7cd0c3;
}

.subtitle {
  color: #b2bed6;
  margin-top: 4px;
}

.grid {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 14px;
}

.panel {
  background: rgba(255, 255, 255, 0.9);
  border-radius: 16px;
  padding: 14px;
  box-shadow: 0 14px 30px rgba(12, 18, 34, 0.12);
}

.panel.list {
  min-height: 360px;
}

.panel.side {
  background: linear-gradient(160deg, #0c1222, #152038);
  color: #f5f7fc;
  border: 1px solid rgba(255, 255, 255, 0.06);
}

.panel__head {
  display: flex;
  justify-content: space-between;
  gap: 10px;
  align-items: flex-start;
}

.panel__title {
  font-size: 20px;
  font-weight: 700;
  color: #111827;
}

.panel.side .panel__title {
  color: #ffffff;
}

.workout-list {
  display: grid;
  grid-template-columns: 1fr;
  gap: 12px;
  margin-top: 12px;
}

.workout-card {
  padding: 12px;
  border-radius: 14px;
}

.card__row {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.badge {
  background: #0f1729;
  color: #c6e2ff;
  padding: 6px 10px;
  border-radius: 30px;
  font-weight: 700;
  font-size: 12px;
  letter-spacing: 0.04em;
}

.card__title {
  margin-top: 6px;
  font-size: 18px;
  font-weight: 800;
}

.difficulty {
  color: #6b7280;
  font-size: 13px;
  margin-left: 6px;
}

.card__meta {
  margin-top: 4px;
  color: #4b5563;
  display: flex;
  align-items: center;
  gap: 4px;
}

.card__meta.small {
  font-size: 13px;
  flex-wrap: wrap;
  gap: 8px;
}

.sensor {
  background: #eef2ff;
  padding: 4px 8px;
  border-radius: 10px;
}

.card__footer {
  margin-top: 8px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
}

.vibe {
  color: #1f2937;
  font-weight: 600;
}

.stat-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 10px;
  margin-top: 6px;
}

.stat {
  background: rgba(255, 255, 255, 0.06);
  border-radius: 10px;
  padding: 10px;
  border: 1px solid rgba(255, 255, 255, 0.08);
}

.stat__label {
  font-size: 12px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: #9cb6e5;
}

.stat__value {
  font-size: 20px;
  font-weight: 800;
  color: #fefefe;
  margin-top: 4px;
}

.highlights {
  display: grid;
  gap: 10px;
  margin-top: 10px;
}

.highlight {
  background: rgba(255, 255, 255, 0.03);
  border-radius: 12px;
  padding: 10px;
  border: 1px solid rgba(255, 255, 255, 0.08);
}

.highlight__label {
  font-size: 12px;
  letter-spacing: 0.08em;
  color: #8ab8ff;
  text-transform: uppercase;
}

.highlight__value {
  font-size: 18px;
  font-weight: 700;
}

.highlight__detail {
  color: #c5d2e8;
  margin-top: 2px;
}

.sw-banner {
  border: 1px solid rgba(255, 255, 255, 0.18);
}

@media (max-width: 1023px) {
  .hero {
    grid-template-columns: 1fr;
  }

  .hero__cta {
    align-items: flex-start;
  }

  .grid {
    grid-template-columns: 1fr;
  }
}

@media (orientation: landscape) and (min-width: 720px) {
  .workout-list {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}
</style>
