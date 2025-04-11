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
  time: number
}

export interface RaceSchedule {
  rounds: Race[]
  currentRound: number
  isRaceInProgress: boolean
}
