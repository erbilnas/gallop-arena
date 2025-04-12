import { FAMOUS_HORSE_NAMES, HORSE_COLORS, RACE_CONFIG } from '@/constants'
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import type { Horse, RaceSchedule, TotalResult } from '../types'

const generateHorseName = (index: number): string => {
  return FAMOUS_HORSE_NAMES[index % FAMOUS_HORSE_NAMES.length]
}

export const useStore = defineStore('store', () => {
  // Horse state
  const horses = ref<Horse[]>([])

  // Race state
  const raceSchedule = ref<RaceSchedule>({
    rounds: [],
    currentRound: 0,
    isRaceInProgress: false,
  })
  const horsePositions = ref<Record<number, number>>({})
  const isRoundComplete = ref(false)
  const isRoundInProgress = ref(false)
  const showResultsMenu = ref(false)
  const showResultsModal = ref(false)

  // Computed properties
  const currentRace = computed(() => raceSchedule.value.rounds[raceSchedule.value.currentRound])
  const isRaceInProgress = computed(() => raceSchedule.value?.isRaceInProgress ?? false)
  const isLastRound = computed(
    () => raceSchedule.value.currentRound === raceSchedule.value.rounds.length - 1,
  )

  const totalResults = computed<TotalResult[]>(() => {
    const allResults = raceSchedule.value.rounds.flatMap(
      (round) =>
        round.results?.map((result) => ({
          horseId: result.horseId,
          points:
            (RACE_CONFIG.HORSES_PER_RACE - result.position + 1) * RACE_CONFIG.POINTS_PER_POSITION,
          round: round.id,
          time: result.time,
        })) || [],
    )

    const horseTotals = allResults.reduce(
      (acc, result) => {
        if (!acc[result.horseId]) {
          acc[result.horseId] = {
            horseId: result.horseId,
            totalPoints: 0,
            rounds: [],
            time: 0,
          }
        }
        acc[result.horseId].totalPoints += result.points
        acc[result.horseId].rounds.push({
          round: result.round,
          points: result.points,
          time: result.time || 0,
        })
        acc[result.horseId].time += result.time || 0
        return acc
      },
      {} as Record<
        number,
        {
          horseId: number
          totalPoints: number
          rounds: { round: number; points: number; time: number }[]
          time: number
        }
      >,
    )

    const finalResults = Object.values(horseTotals)
      .sort((a, b) => b.totalPoints - a.totalPoints)
      .map((result, index) => ({
        horseId: result.horseId,
        position: index + 1,
        totalPoints: result.totalPoints,
        rounds: result.rounds,
        time: result.time || 0,
      }))

    return finalResults
  })

  // Actions
  const generateHorses = () => {
    horses.value = Array.from({ length: RACE_CONFIG.TOTAL_HORSES }, (_, index) => ({
      id: index + 1,
      name: generateHorseName(index),
      color: HORSE_COLORS[index],
      condition:
        Math.floor(Math.random() * (RACE_CONFIG.MAX_CONDITION - RACE_CONFIG.MIN_CONDITION + 1)) +
        RACE_CONFIG.MIN_CONDITION,
    }))
  }

  const getRandomHorses = (count: number = RACE_CONFIG.HORSES_PER_RACE): Horse[] => {
    if (horses.value.length < count) {
      return []
    }

    const availableHorses = [...horses.value]
    const selectedHorses: Horse[] = []

    while (selectedHorses.length < count && availableHorses.length > 0) {
      const randomIndex = Math.floor(Math.random() * availableHorses.length)
      selectedHorses.push(availableHorses[randomIndex])
      availableHorses.splice(randomIndex, 1)
    }

    return selectedHorses
  }

  const updateHorseConditions = (horses: Horse[]) => {
    return horses.map((horse) => {
      const currentCondition = horse.condition
      const minCondition = Math.max(RACE_CONFIG.MIN_CONDITION, currentCondition - 20)
      const maxCondition = Math.min(RACE_CONFIG.MAX_CONDITION, currentCondition + 20)
      return {
        ...horse,
        condition: Math.floor(Math.random() * (maxCondition - minCondition + 1)) + minCondition,
      }
    })
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

    // Actions
    generateHorses,
    getRandomHorses,
    updateHorseConditions,
  }
})
