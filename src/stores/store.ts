import { RACE_CONFIG } from '@/constants'
import { defineStore } from 'pinia'
import { computed } from 'vue'
import { useHorseModule, useRaceModule, useResultsModule } from './modules'

export const useStore = defineStore('store', () => {
  // Initialize modules
  const horseModule = useHorseModule()
  const raceModule = useRaceModule()
  const resultsModule = useResultsModule(raceModule.raceSchedule)

  const { horses, generateHorses, getRandomHorses, updateHorseConditions } = horseModule

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

  const { totalResults, showResultsMenu, showResultsModal } = resultsModule

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
    showResultsMenu,
    showResultsModal,
    // Getters
    isResultsModalVisible: computed<boolean>(
      () => isLastRound.value && totalResults.value.length > 0 && isRoundComplete.value,
    ),
    // Actions
    generateHorses,
    generateRaceSchedule,
    startRace,
    nextRound,
  }
})
