import { ACTION_BUTTONS } from '@/constants'
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { useHorseStore } from './horse'
import { useRaceStore } from './race'

/**
 * UI Store
 * Manages the game's user interface state and actions
 * Handles button states, modals, and game flow controls
 */
export const useUIStore = defineStore('ui', () => {
  // Store dependencies
  const horseStore = useHorseStore()
  const raceStore = useRaceStore()

  // UI State
  const showResultsMenu = ref(false) // Controls visibility of results menu
  const showResultsModal = ref(false) // Controls visibility of results modal
  const isAutoNext = ref(false) // Controls automatic progression to next round

  /**
   * Computed property that returns the game's action buttons with their states
   * Each button has:
   * - Action: Function to execute when clicked
   * - Disabled: Condition that determines if the button should be disabled
   */
  const buttons = computed(() => [
    // Generate Horses Button
    {
      ...ACTION_BUTTONS.GENERATE_HORSES,
      action: () => horseStore.generateHorses(),
      disabled: raceStore.isRaceInProgress || horseStore.horses.length > 0,
    },
    // Generate Schedule Button
    {
      ...ACTION_BUTTONS.GENERATE_SCHEDULE,
      action: raceStore.generateRaceSchedule,
      disabled:
        horseStore.horses.length === 0 || raceStore.isRaceInProgress || !!raceStore.currentRace,
    },
    // Start/Finish Race Button
    {
      ...(raceStore.isLastRound ? ACTION_BUTTONS.FINISH_RACE : ACTION_BUTTONS.START_RACE),
      action: raceStore.startRace,
      disabled: !raceStore.currentRace || raceStore.isRoundInProgress || raceStore.isRoundComplete,
    },
    // Next Round Button
    {
      ...ACTION_BUTTONS.NEXT_ROUND,
      action: raceStore.handleNextRound,
      disabled: !raceStore.isRoundComplete || raceStore.isLastRound,
    },
    // Results Button
    {
      ...ACTION_BUTTONS.RESULTS,
      action: () => (showResultsMenu.value = true),
      disabled: horseStore.horses.length === 0,
    },
  ])

  return {
    showResultsMenu,
    showResultsModal,
    isAutoNext,
    buttons,
  }
})
