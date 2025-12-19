export const workouts = [
  {
    id: 1,
    name: 'Bench Press',
    category: 'Strength',
    muscleGroup: ['Chest', 'Triceps', 'Shoulders'],
    difficulty: 'Intermediate',
    durationMinutes: 10,
    equipment: ['Barbell', 'Bench'],
    sensorData: [
      { type: 'camera', description: 'Posture photo for form check' },
    ],
    vibe: 'Power up your push muscles and track form with quick sets.',
  },
  {
    id: 2,
    name: 'Treadmill Run',
    category: 'Cardio',
    muscleGroup: ['Legs', 'Cardio'],
    difficulty: 'Beginner',
    durationMinutes: 30,
    equipment: ['Treadmill'],
    sensorData: [
      { type: 'camera', description: 'Stride snapshot for cadence' },
      { type: 'motion', description: 'Accelerometer for pace + steps' },
    ],
    vibe: 'Steady-state cardio with live pace telemetry.',
  },
  {
    id: 3,
    name: 'Deadlift',
    category: 'Strength',
    muscleGroup: ['Back', 'Legs', 'Core'],
    difficulty: 'Advanced',
    durationMinutes: 12,
    equipment: ['Barbell'],
    sensorData: [
      { type: 'camera', description: 'Hip hinge alignment check' },
    ],
    vibe: 'Heavy pulls with a focus on posture and breathing.',
  },
  {
    id: 4,
    name: 'Yoga Flow',
    category: 'Mobility',
    muscleGroup: ['Full body'],
    difficulty: 'Beginner',
    durationMinutes: 20,
    equipment: ['Mat'],
    sensorData: [
      { type: 'camera', description: 'Pose recognition for balance' },
    ],
    vibe: 'Recovery flow to reset posture and breathing rhythm.',
  },
];

export const highlights = [
  {
    title: 'Today\'s Focus',
    value: 'Strength & Mobility',
    detail: 'Bench + Deadlift with a calming yoga cooldown.',
  },
  {
    title: 'Recovery',
    value: '8.1h sleep',
    detail: 'Ready for heavy pulls — keep hydration on point.',
  },
  {
    title: 'Next Check-in',
    value: 'Coach Eva · 18:00',
    detail: 'Movement screen and tempo tweaks.',
  },
];
