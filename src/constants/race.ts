export const RACE_CONFIG = {
  // Horse configuration
  TOTAL_HORSES: 20,
  HORSES_PER_RACE: 10,
  MIN_CONDITION: 1,
  MAX_CONDITION: 100,

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

  // Scoring configuration
  POINTS_PER_POSITION: 10, // Points multiplier for position (1st place gets 10 * 10 = 100 points)
} as const

// Horse colors for visualization
export const HORSE_COLORS = [
  'red',
  'blue',
  'green',
  'yellow',
  'purple',
  'orange',
  'pink',
  'brown',
  'cyan',
  'magenta',
  'lime',
  'teal',
  'indigo',
  'violet',
  'maroon',
  'navy',
  'olive',
  'aqua',
  'fuchsia',
  'silver',
] as const
