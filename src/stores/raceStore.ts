import { RACE_CONFIG } from '@/constants'
import { defineStore } from 'pinia'
import { useHorseModule } from './modules/horseModule'
import { useRaceModule } from './modules/raceModule'
import { useResultsModule } from './modules/resultsModule'

export const useRaceStore = defineStore('race', () => {
  // Initialize modules
  const horseModule = useHorseModule()
  const raceModule = useRaceModule()
  const resultsModule = useResultsModule(raceModule.raceSchedule)

  // Horse module exports
  const { horses, generateHorses, getRandomHorses, updateHorseConditions } = horseModule

  // Race module exports
  const {
    raceSchedule,
    horsePositions,
    isRoundComplete,
    isRoundInProgress,
    currentRace,
    isRaceInProgress,
    isLastRound,
    generateRaceSchedule: baseGenerateRaceSchedule,
    startRace: baseStartRace,
    nextRound: baseNextRound,
  } = raceModule

  // Results module exports
  const { totalResults } = resultsModule

  // Enhanced functions that combine module functionality
  const generateRaceSchedule = () => {
    if (horses.value.length < RACE_CONFIG.HORSES_PER_RACE) {
      console.error(`Need at least ${RACE_CONFIG.HORSES_PER_RACE} horses to generate race schedule`)
      return
    }

    const selectedHorses = getRandomHorses(RACE_CONFIG.HORSES_PER_RACE)
    baseGenerateRaceSchedule(selectedHorses)
  }

  const startRace = () => {
    baseStartRace()
  }

  const nextRound = () => {
    baseNextRound()
    if (currentRace.value) {
      currentRace.value.horses = updateHorseConditions(currentRace.value.horses)
    }
  }

  return {
    // State
    horses,
    raceSchedule,
    horsePositions,
    isRoundComplete,
    isRoundInProgress,
    currentRace,
    isRaceInProgress,
    isLastRound,
    totalResults,

    // Actions
    generateHorses,
    generateRaceSchedule,
    startRace,
    nextRound,
  }
})
