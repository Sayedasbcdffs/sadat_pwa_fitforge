import { defineStore } from 'pinia';
import { computed, ref } from 'vue';
import { workouts as seedWorkouts, highlights as seedHighlights } from '../data/workouts';

export const useWorkoutStore = defineStore('workoutStore', () => {
  const workouts = ref(seedWorkouts);
  const highlights = ref(seedHighlights);

  const strengthCount = computed(
    () => workouts.value.filter((item) => item.category === 'Strength').length,
  );

  const cardioCount = computed(
    () => workouts.value.filter((item) => item.category === 'Cardio').length,
  );

  const averageDuration = computed(() => {
    const total = workouts.value.reduce((acc, item) => acc + item.durationMinutes, 0);
    return Math.round(total / workouts.value.length);
  });

  return {
    workouts,
    highlights,
    strengthCount,
    cardioCount,
    averageDuration,
  };
});
