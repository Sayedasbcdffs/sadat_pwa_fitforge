<script setup>
import { computed, inject } from "vue";
import { useWorkoutStore } from "../stores/workoutStore";

const workoutStore = useWorkoutStore();
const swStatus = inject("swStatus", null);

const topWorkouts = computed(() => workoutStore.workouts.slice(0, 4));
const stats = computed(() => [
  { label: "Strength blocks", value: workoutStore.strengthCount },
  { label: "Cardio sessions", value: workoutStore.cardioCount },
  { label: "Duration", value: `${workoutStore.averageDuration} min` },
]);

const swLabel = computed(() => {
  if (!swStatus) return "Service Worker pending";
  const value = swStatus.value.status || swStatus.value;
  if (value === "offline-ready") return "Offline ready";
  if (value === "registered") return "Workbox ready";
  return `SW: ${value}`;
});
</script>

<template>
  <q-page class="fitforge-page q-pa-md">
    <section class="hero">
      <div class="hero__copy">
        <div class="eyebrow">FitForge</div>
        <h1>Forge routine, track metrics, stay ready.</h1>
      </div>
    </section>

    <section class="grid">
      <div class="panel list">
        <div class="panel__head">
          <div>
            <div class="eyebrow">Main Screen</div>
            <div class="panel__title">Aktive Sessions</div>
          </div>
        </div>

        <div class="workout-list">
          <q-card
            v-for="item in topWorkouts"
            :key="item.id"
            flat
            bordered
            class="workout-card"
          >
            <div class="card__row">
              <div class="badge">{{ item.category }}</div>
              <q-chip dense class="neutral-chip"
                >{{ item.durationMinutes }} min</q-chip
              >
            </div>
            <div class="card__title">
              {{ item.name }}
              <span class="difficulty">{{ item.difficulty }}</span>
            </div>
            <div class="card__meta">
              <q-icon name="fitness_center" size="18px" class="q-mr-xs" />
              {{ item.muscleGroup.join(", ") }}
            </div>
            <div class="card__meta small">
              <q-icon name="sensors" size="18px" class="q-mr-xs" />
              Sensoren:
              <span
                class="sensor"
                v-for="sensor in item.sensorData"
                :key="sensor.type"
              >
                {{ sensor.type }} – {{ sensor.description }}
              </span>
            </div>
            <div class="card__footer">
              <div class="vibe">{{ item.vibe }}</div>
              <q-btn
                dense
                outline
                icon="play_circle"
                label="Los"
                class="neutral-btn"
              />
            </div>
          </q-card>
        </div>
      </div>

      <div class="panel side">
        <div class="panel__head">
          <div class="panel__title">Live Widgets</div>
          
        </div>

        <div class="stat-grid">
          <div v-for="stat in stats" :key="stat.label" class="stat">
            <div class="stat__label">{{ stat.label }}</div>
            <div class="stat__value">{{ stat.value }}</div>
          </div>
        </div>

        <q-separator spaced />

        <div class="highlights">
          <div
            v-for="highlight in workoutStore.highlights"
            :key="highlight.title"
            class="highlight"
          >
            <div class="highlight__label">{{ highlight.title }}</div>
            <div class="highlight__value">{{ highlight.value }}</div>
            <div class="highlight__detail">{{ highlight.detail }}</div>
          </div>
        </div>

        
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
  background: #f7f7f7;
  color: #1c1c1c;
  border-radius: 18px;
  border: 1px solid #e1e1e1;
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

.neutral-chip {
  background: #ededed;
  color: #1c1c1c;
  border-color: #d6d6d6;
}

.neutral-chip.q-chip--outline {
  background: transparent;
  color: #2c2c2c;
  border-color: #cfcfcf;
}

.neutral-btn {
  background: #e6e6e6;
  color: #1c1c1c;
  border: 1px solid #cfcfcf;
}

.neutral-btn.q-btn--flat {
  background: transparent;
  border-color: transparent;
  color: #2c2c2c;
}

.neutral-btn.q-btn--outline {
  background: transparent;
  border-color: #cfcfcf;
  color: #2c2c2c;
}

.eyebrow {
  font-size: 11px;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: #505050;
}

.subtitle {
  color: #6a6a6a;
  margin-top: 4px;
}

.grid {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 14px;
}

.panel {
  background: #fafafa;
  border-radius: 16px;
  padding: 14px;
  box-shadow: 0 14px 30px rgba(0, 0, 0, 0.06);
}

.panel.list {
  min-height: 360px;
}

.panel.side {
  background: #f2f2f2;
  color: #1c1c1c;
  border: 1px solid #e1e1e1;
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
  color: inherit;
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
  background: #e5e5e5;
  color: #1f1f1f;
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
  color: #666666;
  font-size: 13px;
  margin-left: 6px;
}

.card__meta {
  margin-top: 4px;
  color: #4a4a4a;
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
  background: #ededed;
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
  color: #2c2c2c;
  font-weight: 600;
}

.stat-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 10px;
  margin-top: 6px;
}

.stat {
  background: #f2f2f2;
  border-radius: 10px;
  padding: 10px;
  border: 1px solid #dfdfdf;
}

.stat__label {
  font-size: 12px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: #616161;
}

.stat__value {
  font-size: 20px;
  font-weight: 800;
  color: #1c1c1c;
  margin-top: 4px;
}

.highlights {
  display: grid;
  gap: 10px;
  margin-top: 10px;
}

.highlight {
  background: #f6f6f6;
  border-radius: 12px;
  padding: 10px;
  border: 1px solid #e1e1e1;
}

.highlight__label {
  font-size: 12px;
  letter-spacing: 0.08em;
  color: #4f4f4f;
  text-transform: uppercase;
}

.highlight__value {
  font-size: 18px;
  font-weight: 700;
}

.highlight__detail {
  color: #5f5f5f;
  margin-top: 2px;
}

.sw-banner {
  background: #f7f7f7;
  color: #1c1c1c;
  border: 1px solid #e1e1e1;
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
