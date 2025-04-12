export interface Horse {
  id: number
  name: string
  color: string
  condition: number // 1-100
}

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

export interface RoundPoints {
  round: number
  points: number
  time?: number
}

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

export interface RaceSchedule {
  rounds: Race[]
  currentRound: number
  isRaceInProgress: boolean
}
