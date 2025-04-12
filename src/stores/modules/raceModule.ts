import { RACE_CONFIG } from '@/constants'
import { computed, ref } from 'vue'
import type { Horse, RaceResult, RaceSchedule } from '../../types/horse'

const initialRaceSchedule: RaceSchedule = {
  rounds: [],
  currentRound: 0,
  isRaceInProgress: false,
}

export const useRaceModule = () => {
  const raceSchedule = ref<RaceSchedule>(initialRaceSchedule)
  const horsePositions = ref<Record<number, number>>({})
  const raceTimer = ref<number | null>(null)
  const isRoundComplete = ref(false)
  const isRoundInProgress = ref(false)

  const currentRace = computed(() => raceSchedule.value.rounds[raceSchedule.value.currentRound])
  const isRaceInProgress = computed(() => raceSchedule.value?.isRaceInProgress ?? false)
  const isLastRound = computed(
    () => raceSchedule.value.currentRound === raceSchedule.value.rounds.length - 1,
  )

  const generateRaceSchedule = (selectedHorses: Horse[]) => {
    raceSchedule.value = {
      rounds: RACE_CONFIG.ROUNDS.map((round) => ({
        id: round.id,
        distance: round.distance,
        horses: selectedHorses.map((horse) => ({ ...horse })), // Create a copy of each horse for each round
      })),
      currentRound: 0,
      isRaceInProgress: false,
    }
    isRoundComplete.value = false
    isRoundInProgress.value = false
  }

  const startRace = () => {
    if (!currentRace.value) return

    raceSchedule.value.isRaceInProgress = true
    isRoundComplete.value = false
    isRoundInProgress.value = true
    horsePositions.value = {}

    // Initialize positions
    currentRace.value.horses.forEach((horse) => {
      horsePositions.value[horse.id] = 0
    })

    // Start race timer
    raceTimer.value = window.setInterval(updateRace, RACE_CONFIG.RACE_UPDATE_INTERVAL)
  }

  const updateRace = () => {
    if (!currentRace.value) return

    const race = currentRace.value
    const finishLine = RACE_CONFIG.TRACK_WIDTH - RACE_CONFIG.FINISH_LINE_OFFSET

    // Update each horse's position
    race.horses.forEach((horse) => {
      if (horsePositions.value[horse.id] >= finishLine) return

      // Calculate speed based on horse condition (1-100)
      const baseSpeed = (horse.condition / RACE_CONFIG.MAX_CONDITION) * 100
      const randomFactor = 100 * Math.random()
      const speed = baseSpeed * randomFactor
      const newPosition = Math.min(horsePositions.value[horse.id] + speed, finishLine)
      horsePositions.value[horse.id] = newPosition
    })

    // Check if all horses have crossed the finish line
    const allFinished = race.horses.every((horse) => horsePositions.value[horse.id] >= finishLine)

    if (allFinished) {
      completeRace()
    }
  }

  const completeRace = () => {
    if (!currentRace.value) return

    // Stop the race timer immediately
    if (raceTimer.value) {
      clearInterval(raceTimer.value)
      raceTimer.value = null
    }

    console.log('Completing race for round:', currentRace.value.id)

    // Calculate results
    const race = currentRace.value
    const results: RaceResult[] = race.horses
      .map((horse) => {
        const conditionFactor =
          (RACE_CONFIG.MAX_CONDITION - horse.condition) / RACE_CONFIG.MAX_CONDITION
        const distanceFactor = race.distance / 1000
        const randomFactor =
          RACE_CONFIG.MIN_RANDOM_FACTOR +
          Math.random() * (RACE_CONFIG.MAX_RANDOM_FACTOR - RACE_CONFIG.MIN_RANDOM_FACTOR)
        const time = RACE_CONFIG.BASE_RACE_TIME * conditionFactor * distanceFactor * randomFactor

        return {
          horseId: horse.id,
          position: 0,
          time: Math.round(time * 100) / 100,
        }
      })
      .sort((a, b) => a.time - b.time)
      .map((result, index) => ({
        ...result,
        position: index + 1,
      }))

    console.log('Race results:', results)
    console.log('Is last round:', isLastRound.value)

    // Update race results
    race.results = results
    isRoundComplete.value = true
    isRoundInProgress.value = false
    raceSchedule.value.isRaceInProgress = false

    console.log('Race completed. isRoundComplete:', isRoundComplete.value)
  }

  const nextRound = () => {
    if (!isRoundComplete.value) return

    if (raceSchedule.value.currentRound < raceSchedule.value.rounds.length - 1) {
      raceSchedule.value.currentRound++
      isRoundComplete.value = false
      isRoundInProgress.value = false
      horsePositions.value = {}
    }
  }

  return {
    raceSchedule,
    horsePositions,
    isRoundComplete,
    isRoundInProgress,
    currentRace,
    isRaceInProgress,
    isLastRound,
    generateRaceSchedule,
    startRace,
    nextRound,
  }
}
