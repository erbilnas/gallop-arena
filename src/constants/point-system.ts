export const POINT_SYSTEM = {
  1: 100,
  2: 90,
  3: 80,
  4: 70,
  5: 60,
  6: 50,
  7: 40,
  8: 30,
  9: 20,
  10: 10,
}

export const POINT_SYSTEM_EXPLANATION =
  'Points are awarded based on finishing position, with 10 points per position (1st place gets 100 points, 2nd gets 90, and so on). Total points are calculated by summing up points earned in each round. The horse with the highest total points wins the championship!'

export const POINT_SYSTEM_CONFIG = {
  POINTS_PER_POSITION: 10,
} as const
