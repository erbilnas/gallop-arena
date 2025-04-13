export const RACE_CONFIG = {
  // Race configuration
  ROUNDS: [
    { id: 1, distance: 1200 },
    { id: 2, distance: 1400 },
    { id: 3, distance: 1600 },
    { id: 4, distance: 1800 },
    { id: 5, distance: 2000 },
    { id: 6, distance: 2200 },
  ],

  // Track configuration
  TRACK_WIDTH: 1200,
  FINISH_LINE_OFFSET: 150,

  // Race timing configuration
  RACE_UPDATE_INTERVAL: 30,
  BASE_RACE_TIME: 50,
  MIN_RANDOM_FACTOR: 0.8,
  MAX_RANDOM_FACTOR: 1.2,
} as const
