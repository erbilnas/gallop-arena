// Core domain types
export interface Horse {
  id: number
  name: string
  color: string
  condition: number // 1-100
}

// Race-related types
export interface Race {
  id: number
  distance: number
  horses: Horse[]
  results?: RaceResult[]
}

export interface RaceResult {
  horseId: number
  position: number
  time?: number
  totalPoints?: number
}

// Round-related types
export interface RoundPoints {
  round: number
  points: number
  time?: number
}

// Result-related types
export interface TotalResult {
  horseId: number
  position: number
  totalPoints: number
  rounds: RoundPoints[]
  time: number
}

export interface ProcessedResult extends TotalResult {
  horseName: string
  horseColor: string
}

// Schedule-related types
export interface RaceSchedule {
  rounds: Race[]
  currentRound: number
  isRaceInProgress: boolean
}

// Type guards
export function isHorse(value: unknown): value is Horse {
  return (
    typeof value === 'object' &&
    value !== null &&
    'id' in value &&
    'name' in value &&
    'color' in value &&
    'condition' in value
  )
}

export function isRace(value: unknown): value is Race {
  return (
    typeof value === 'object' &&
    value !== null &&
    'id' in value &&
    'distance' in value &&
    'horses' in value
  )
}

// Type aliases for better readability
export type HorseId = number
export type RaceId = number
export type RoundNumber = number
export type Position = number
export type Points = number
export type TimeInSeconds = number
