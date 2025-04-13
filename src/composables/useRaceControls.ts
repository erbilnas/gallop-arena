import { BUTTON_CONFIG, RACE_CONFIG } from '@/constants'
import { useStore } from '@/stores'
import type { RaceResult } from '@/types'
import { storeToRefs } from 'pinia'
import { computed, ref } from 'vue'

interface ButtonConfig {
  id: string
  text: string
  icon: string
  action: () => void
  disabled: boolean
}

// Race Timer Service
const useRaceTimer = () => {
  const raceTimer = ref<number | null>(null)

  const startTimer = (callback: () => void, interval: number) => {
    raceTimer.value = window.setInterval(callback, interval)
  }

  const stopTimer = () => {
    if (raceTimer.value) {
      clearInterval(raceTimer.value)
      raceTimer.value = null
    }
  }

  return {
    raceTimer,
    startTimer,
    stopTimer,
  }
}

// Race State Service
const useRaceState = () => {
  const store = useStore()
  const { getRandomHorses, updateHorseConditions } = store
  const {
    horses,
    currentRace,
    isRaceInProgress,
    isRoundComplete,
    isLastRound,
    showResultsMenu,
    raceSchedule,
    horsePositions,
    isRoundInProgress,
  } = storeToRefs(store)

  const initializeRaceSchedule = (selectedHorses: typeof horses.value) => {
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

  const initializeHorsePositions = () => {
    if (!currentRace.value) return
    horsePositions.value = {}
    currentRace.value.horses.forEach((horse) => {
      horsePositions.value[horse.id] = 0
    })
  }

  const updateRaceState = (isComplete: boolean) => {
    isRoundComplete.value = isComplete
    isRoundInProgress.value = !isComplete
    raceSchedule.value.isRaceInProgress = !isComplete
  }

  return {
    horses,
    currentRace,
    isRaceInProgress,
    isRoundComplete,
    isLastRound,
    showResultsMenu,
    raceSchedule,
    horsePositions,
    isRoundInProgress,
    getRandomHorses,
    updateHorseConditions,
    initializeRaceSchedule,
    initializeHorsePositions,
    updateRaceState,
  }
}

// Race Logic Service
const useRaceLogic = (raceState: ReturnType<typeof useRaceState>) => {
  const calculateHorseSpeed = (horse: (typeof raceState.currentRace.value.horses)[0]) => {
    const baseSpeed = (horse.condition / RACE_CONFIG.MAX_CONDITION) * 10
    const randomFactor = 0.8 + Math.random() * 1.4
    return baseSpeed * randomFactor
  }

  const calculateRaceResults = (race: typeof raceState.currentRace.value): RaceResult[] => {
    return race.horses
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
  }

  const updateHorsePositions = () => {
    if (!raceState.currentRace.value) return

    const race = raceState.currentRace.value
    const finishLine = RACE_CONFIG.TRACK_WIDTH - RACE_CONFIG.FINISH_LINE_OFFSET

    race.horses.forEach((horse) => {
      if (raceState.horsePositions.value[horse.id] >= finishLine) return
      const speed = calculateHorseSpeed(horse)
      const newPosition = Math.min(raceState.horsePositions.value[horse.id] + speed, finishLine)
      raceState.horsePositions.value[horse.id] = newPosition
    })

    return race.horses.every((horse) => raceState.horsePositions.value[horse.id] >= finishLine)
  }

  return {
    calculateRaceResults,
    updateHorsePositions,
  }
}

// Main Composable
export const useRaceControls = () => {
  const raceState = useRaceState()
  const raceLogic = useRaceLogic(raceState)
  const { startTimer, stopTimer } = useRaceTimer()

  const generateRaceSchedule = () => {
    if (raceState.horses.value.length < RACE_CONFIG.HORSES_PER_RACE) {
      console.error(`Need at least ${RACE_CONFIG.HORSES_PER_RACE} horses to generate race schedule`)
      return
    }

    const selectedHorses = raceState.getRandomHorses(RACE_CONFIG.HORSES_PER_RACE)
    raceState.initializeRaceSchedule(selectedHorses)
  }

  const startRace = () => {
    if (!raceState.currentRace.value) return

    raceState.updateRaceState(false)
    raceState.initializeHorsePositions()
    startTimer(updateRace, RACE_CONFIG.RACE_UPDATE_INTERVAL)
  }

  const updateRace = () => {
    const isComplete = raceLogic.updateHorsePositions()
    if (isComplete) {
      completeRace()
    }
  }

  const completeRace = () => {
    if (!raceState.currentRace.value) return

    stopTimer()

    const results = raceLogic.calculateRaceResults(raceState.currentRace.value)
    raceState.currentRace.value.results = results
    raceState.updateRaceState(true)
  }

  const nextRound = () => {
    if (!raceState.isRoundComplete.value) return

    if (
      raceState.raceSchedule.value.currentRound <
      raceState.raceSchedule.value.rounds.length - 1
    ) {
      raceState.raceSchedule.value.currentRound++
      raceState.updateRaceState(false)
      raceState.horsePositions.value = {}
    }

    if (raceState.currentRace.value) {
      raceState.currentRace.value.horses = raceState.updateHorseConditions(
        raceState.currentRace.value.horses,
      )
    }
  }

  const handleNextRound = () => {
    nextRound()
    startRace()
  }

  const buttons = computed<ButtonConfig[]>(() => [
    {
      ...BUTTON_CONFIG.GENERATE_HORSES,
      action: () => useStore().generateHorses(),
      disabled: raceState.isRaceInProgress.value || raceState.horses.value.length > 0,
    },
    {
      ...BUTTON_CONFIG.GENERATE_SCHEDULE,
      action: generateRaceSchedule,
      disabled:
        raceState.horses.value.length === 0 ||
        raceState.isRaceInProgress.value ||
        !!raceState.currentRace.value,
    },
    {
      ...(raceState.isLastRound.value ? BUTTON_CONFIG.FINISH_RACE : BUTTON_CONFIG.START_RACE),
      action: startRace,
      disabled:
        !raceState.currentRace.value ||
        raceState.isRaceInProgress.value ||
        raceState.isRoundComplete.value,
    },
    {
      ...BUTTON_CONFIG.NEXT_ROUND,
      action: handleNextRound,
      disabled: !raceState.isRoundComplete.value || raceState.isLastRound.value,
    },
    {
      ...BUTTON_CONFIG.RESULTS,
      action: () => (raceState.showResultsMenu.value = true),
      disabled: raceState.horses.value.length === 0,
    },
  ])

  return {
    buttons,
    handleNextRound,
    startRace,
    nextRound,
    generateRaceSchedule,
    updateRace,
    completeRace,
  }
}
