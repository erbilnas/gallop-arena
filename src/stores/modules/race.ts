/**
 * Race Store Module
 *
 * This store manages the state and logic for horse racing game.
 * It handles race scheduling, horse movement, race timing, and results calculation.
 */

import { HORSE_CONFIG, RACE_CONFIG } from '@/constants'
import type { Horse, RaceResult, RaceSchedule } from '@/types'
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { useHorseStore } from './horse'

export const useRaceStore = defineStore('race', () => {
  // Initialize horse store for accessing horse data
  const horseStore = useHorseStore()

  // State Management
  // -----------------
  // Tracks the current race schedule, including rounds and progress
  const raceSchedule = ref<RaceSchedule>({
    rounds: [],
    currentRound: 0,
    isRaceInProgress: false,
  })

  // Records the current position of each horse during a race
  const horsePositions = ref<Record<number, number>>({})

  // Tracks the completion status of the current round
  const isRoundComplete = ref(false)

  // Indicates if a round is currently in progress
  const isRoundInProgress = ref(false)

  // Manages the race animation interval timer
  const raceTimer = ref<number | null>(null)

  // Computed Properties
  // ------------------
  // Gets the current race round being run
  const currentRace = computed(() => raceSchedule.value.rounds[raceSchedule.value.currentRound])

  // Checks if any race is currently in progress
  const isRaceInProgress = computed(() => raceSchedule.value?.isRaceInProgress ?? false)

  // Determines if the current round is the final one
  const isLastRound = computed(
    () => raceSchedule.value.currentRound === raceSchedule.value.rounds.length - 1,
  )

  // Timer Management
  // ---------------
  /**
   * Starts the race timer with specified callback and interval
   * @param callback - Function to execute on each timer tick
   * @param interval - Time between timer ticks in milliseconds
   */
  const startTimer = (callback: () => void, interval: number) => {
    raceTimer.value = window.setInterval(callback, interval)
  }

  /**
   * Stops the race timer and cleans up
   */
  const stopTimer = () => {
    if (raceTimer.value) {
      clearInterval(raceTimer.value)
      raceTimer.value = null
    }
  }

  // Race Logic
  // ----------
  /**
   * Calculates the speed of a horse based on its condition and random factors
   * @param horse - The horse to calculate speed for
   * @returns The calculated speed value
   */
  const calculateHorseSpeed = (horse: Horse): number => {
    // Base speed is proportional to horse's condition (0-100)
    const baseSpeed = (horse.condition / HORSE_CONFIG.MAX_CONDITION) * 100

    // Add some randomness to make races more interesting
    const randomFactor = getRandomFactor()

    return baseSpeed * randomFactor
  }

  /**
   * Gets a random factor between MIN_RANDOM_FACTOR and MAX_RANDOM_FACTOR
   * This adds unpredictability to the race
   * @returns Random factor value
   */
  const getRandomFactor = (): number => {
    return (
      RACE_CONFIG.MIN_RANDOM_FACTOR +
      Math.random() * (RACE_CONFIG.MAX_RANDOM_FACTOR - RACE_CONFIG.MIN_RANDOM_FACTOR)
    )
  }

  /**
   * Calculates the race time for a single horse
   * @param horse - The horse to calculate time for
   * @param distance - The race distance in meters
   * @returns The calculated race time in seconds
   */
  const calculateHorseRaceTime = (horse: Horse, distance: number): number => {
    // Horses with better condition (higher number) should finish faster
    const conditionFactor =
      (HORSE_CONFIG.MAX_CONDITION - horse.condition) / HORSE_CONFIG.MAX_CONDITION

    // Longer distances take more time
    const distanceFactor = distance / 1000

    // Add some randomness
    const randomFactor = getRandomFactor()

    // Base time multiplied by all factors
    return RACE_CONFIG.BASE_RACE_TIME * conditionFactor * distanceFactor * randomFactor
  }

  /**
   * Calculates final race results with positions and times
   * @param race - The current race
   * @returns Array of race results sorted by finish time
   */
  const calculateRaceResults = (race: typeof currentRace.value): RaceResult[] => {
    // Calculate time for each horse
    const results = race.horses.map((horse) => ({
      horseId: horse.id,
      position: 0, // Will be updated after sorting
      time: Math.round(calculateHorseRaceTime(horse, race.distance) * 100) / 100,
    }))

    // Sort by finish time (fastest first)
    const sortedResults = results.sort((a, b) => a.time - b.time)

    // Assign positions based on finish order
    return sortedResults.map((result, index) => ({
      ...result,
      position: index + 1,
    }))
  }

  /**
   * Updates the position of each horse during the race
   * @returns true if all horses have crossed the finish line
   */
  const updateHorsePositions = (): boolean => {
    if (!currentRace.value) return false

    const race = currentRace.value
    const finishLine = RACE_CONFIG.TRACK_WIDTH - RACE_CONFIG.FINISH_LINE_OFFSET
    let allHorsesFinished = true

    race.horses.forEach((horse) => {
      // Skip if horse already finished
      if (horsePositions.value[horse.id] >= finishLine) return

      // Calculate new position
      const speed = calculateHorseSpeed(horse)
      const newPosition = Math.min(horsePositions.value[horse.id] + speed, finishLine)
      horsePositions.value[horse.id] = newPosition

      // Check if horse has finished
      if (newPosition < finishLine) {
        allHorsesFinished = false
      }
    })

    return allHorsesFinished
  }

  // Race Controls
  // ------------
  /**
   * Generates a new race schedule with 6 rounds of different distances
   * Each round has 10 randomly selected horses
   */
  const generateRaceSchedule = () => {
    if (horseStore.horses.length < HORSE_CONFIG.HORSES_PER_RACE) {
      console.error(
        `Need at least ${HORSE_CONFIG.HORSES_PER_RACE} horses to generate race schedule`,
      )
      return
    }

    const selectedHorses = horseStore.getRandomHorses(HORSE_CONFIG.HORSES_PER_RACE)
    raceSchedule.value = {
      rounds: RACE_CONFIG.ROUNDS.map((round) => ({
        id: round.id,
        distance: round.distance,
        horses: selectedHorses.map((horse) => ({ ...horse })),
      })),
      currentRound: 0,
      isRaceInProgress: false,
    }
    isRoundComplete.value = false
    isRoundInProgress.value = false
  }

  /**
   * Starts the current race round
   */
  const startRace = () => {
    if (!currentRace.value) return

    updateRaceState(false)
    initializeHorsePositions()
    startTimer(updateRace, RACE_CONFIG.RACE_UPDATE_INTERVAL)
  }

  /**
   * Updates the race state on each timer tick
   */
  const updateRace = () => {
    const isComplete = updateHorsePositions()
    if (isComplete) {
      completeRace()
    }
  }

  /**
   * Completes the current race round and calculates results
   */
  const completeRace = () => {
    if (!currentRace.value) return

    stopTimer()

    const results = calculateRaceResults(currentRace.value)
    currentRace.value.results = results
    updateRaceState(true)
  }

  /**
   * Advances to the next round in the schedule
   */
  const nextRound = () => {
    if (!isRoundComplete.value) return

    if (raceSchedule.value.currentRound < raceSchedule.value.rounds.length - 1) {
      raceSchedule.value.currentRound++
      updateRaceState(false)
      horsePositions.value = {}
    }

    if (currentRace.value) {
      currentRace.value.horses = horseStore.updateHorseConditions(currentRace.value.horses)
    }
  }

  /**
   * Handles the transition to the next round and starts it
   */
  const handleNextRound = () => {
    nextRound()
    startRace()
  }

  /**
   * Initializes horse positions at the start of a race
   */
  const initializeHorsePositions = () => {
    if (!currentRace.value) return
    horsePositions.value = {}
    currentRace.value.horses.forEach((horse) => {
      horsePositions.value[horse.id] = 0
    })
  }

  /**
   * Updates the race state flags
   * @param isComplete - Whether the current round is complete
   */
  const updateRaceState = (isComplete: boolean) => {
    isRoundComplete.value = isComplete
    isRoundInProgress.value = !isComplete
    raceSchedule.value.isRaceInProgress = !isComplete
  }

  return {
    // State
    raceSchedule,
    horsePositions,
    isRoundComplete,
    isRoundInProgress,
    currentRace,
    isRaceInProgress,
    isLastRound,

    // Actions
    generateRaceSchedule,
    startRace,
    updateRace,
    completeRace,
    nextRound,
    handleNextRound,
  }
})
