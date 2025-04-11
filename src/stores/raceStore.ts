import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { HORSE_COLORS, RACE_CONFIG } from '../config/raceConfig'
import type { Horse, RaceResult, RaceSchedule } from '../types/horse'

const initialRaceSchedule: RaceSchedule = {
  rounds: [],
  currentRound: 0,
  isRaceInProgress: false,
}

export const useRaceStore = defineStore('race', () => {
  const horses = ref<Horse[]>([])
  const raceSchedule = ref<RaceSchedule>(initialRaceSchedule)
  const horsePositions = ref<Record<number, number>>({})
  const raceTimer = ref<number | null>(null)
  const isRoundComplete = ref(false)

  const generateHorseName = (index: number): string => {
    const famousHorseNames = [
      // Efsane yarış atları
      'Bold Pilot',
      'Yavuzhan',
      'Ribella',
      'Karayel',
      'Grand Ekinoks',
      'Trapper',
      'Hafız',
      'Toraman',
      'Gold Guard',
      'Nurtay',
      'Turbo',
      'Seren 1',
      'Tunca',
      'Volga 2',
      'Minimo',
      'Yavuz Star',
      'Ayabakan',
      'Özgünhan',
      'Yelhan',
      'Timurhan',
      'Mirhat',
      'Tansel',
      'Halid',
      'Bozdağ',
      "Tamer'in Oğlu",
      'Johny Guitar',
      'Ramadan',
      'Velociraptor',
      'Medya',
      'Sunday',
      'Surprise',
      'Blow Up',
      'Mandrake',
      'Beretta',
      'Win River Win',
      'Bartrobel',
      'Kaşemumkara',
      'Dragon',
      'Damista',
      'Hücum',
      'Ribella',
      'Keremhan',
      'Rüzgarınkızı',
      'İslambol',
      'Abbas Cihangir',
      'Tünkut',
      'Kafkaslı',
      'Cihangir Harmony',

      // Popüler Türkçe at isimleri
      'Arda',
      'Aslan',
      'Aydın',
      'Balık',
      'Bora',
      'Cemre',
      'Cihan',
      'Çınar',
      'Damla',
      'Deniz',
      'Devrim',
      'Dilara',
      'Doruk',
      'Duru',
      'Ediz',
      'Ela',
      'Emre',
      'Esin',
      'Fazıl',
      'Ferhat',
      'Fikret',
      'Gencay',
      'Gökçe',
      'Görkem',
      'Gülsah',
      'Gülbatur',
      'Hakan',
      'Hasan',
      'Işık',
      'İlhan',
      'Kaan',
      'Kaya',
      'Kemal',
      'Koray',
      'Levent',
      'Mehmet',
      'Murat',
      'Nazlı',
      'Oğuz',
      'Ömer',
      'Pınar',
      'Rüzgar',
      'Selin',
      'Serkan',
      'Şahin',
      'Tayfun',
      'Umut',
      'Volkan',
      'Yıldız',
      'Zafer',
      'Zeynep',

      // Ek efsane atlar
      'Caş',
      'Haberbatur',
      'Devirhan',
      'Odin',
      'Tunca',
      'Kara Ali',
      'Nurtay',
      'Volga 2',
      'Minimo',
      'Yavuz Star',
      'Ayabakan',
      'Özgünhan',
      'Yelhan',
      'Timurhan',
      'Mirhat',
      'Tansel',
      'Halid',
      'Bozdağ',
      'Tamer',
      'Johny Guitar',
      'Ramadan',
      'Velociraptor',
      'Medya',
      'Sunday',
      'Surprise',
      'Blow Up',
      'Mandrake',
      'Beretta',
      'Win River Win',
      'Bartrobel',
      'Kaşemumkara',
      'Dragon',
      'Damista',
      'Hücum',
      'Ribella',
      'Keremhan',
      'Rüzgarınkızı',
      'İslambol',
      'Abbas Cihangir',
      'Tünkut',
      'Kafkaslı',
      'Cihangir Harmony',
    ]

    return famousHorseNames[index % famousHorseNames.length]
  }

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

  const generateRaceSchedule = () => {
    if (horses.value.length < RACE_CONFIG.HORSES_PER_RACE) {
      console.error(`Need at least ${RACE_CONFIG.HORSES_PER_RACE} horses to generate race schedule`)
      return
    }

    // Select random horses once for all rounds
    const selectedHorses = getRandomHorses(RACE_CONFIG.HORSES_PER_RACE)

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
  }

  const getRandomHorses = (count: number = RACE_CONFIG.HORSES_PER_RACE): Horse[] => {
    if (horses.value.length < count) {
      console.error(`Not enough horses available. Need ${count}, have ${horses.value.length}`)
      return []
    }

    // Create a copy of the horses array
    const availableHorses = [...horses.value]
    const selectedHorses: Horse[] = []

    // Select horses one by one to ensure no duplicates
    while (selectedHorses.length < count && availableHorses.length > 0) {
      const randomIndex = Math.floor(Math.random() * availableHorses.length)
      selectedHorses.push(availableHorses[randomIndex])
      availableHorses.splice(randomIndex, 1)
    }

    return selectedHorses
  }

  const startRace = () => {
    if (!currentRace.value) return

    raceSchedule.value.isRaceInProgress = true
    isRoundComplete.value = false
    horsePositions.value = {}

    // Initialize positions
    currentRace.value.horses.forEach((horse, index) => {
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
      const baseSpeed = (horse.condition / RACE_CONFIG.MAX_CONDITION) * 150 // Increased base speed
      const randomFactor = 0.8 + Math.random() * 0.4 // Add some randomness
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

    // Calculate results
    const race = currentRace.value
    const results: RaceResult[] = race.horses
      .map((horse) => {
        // Calculate time based on the actual race distance and horse's condition
        // Higher condition means faster time
        const conditionFactor =
          (RACE_CONFIG.MAX_CONDITION - horse.condition) / RACE_CONFIG.MAX_CONDITION
        const distanceFactor = race.distance / 1000 // Convert meters to kilometers
        const randomFactor =
          RACE_CONFIG.MIN_RANDOM_FACTOR +
          Math.random() * (RACE_CONFIG.MAX_RANDOM_FACTOR - RACE_CONFIG.MIN_RANDOM_FACTOR)

        const time = RACE_CONFIG.BASE_RACE_TIME * conditionFactor * distanceFactor * randomFactor

        return {
          horseId: horse.id,
          position: 0,
          time: Math.round(time * 100) / 100, // Round to 2 decimal places
        }
      })
      .sort((a, b) => a.time - b.time)
      .map((result, index) => ({
        ...result,
        position: index + 1,
      }))

    // Update race results
    race.results = results
    isRoundComplete.value = true
    raceSchedule.value.isRaceInProgress = false
  }

  const updateHorseConditions = () => {
    // Update conditions for all horses in the current race
    if (currentRace.value) {
      currentRace.value.horses.forEach((horse) => {
        // Generate a new condition between MIN_CONDITION and MAX_CONDITION
        // Add some randomness but keep it somewhat close to the previous condition
        const currentCondition = horse.condition
        const minCondition = Math.max(RACE_CONFIG.MIN_CONDITION, currentCondition - 20)
        const maxCondition = Math.min(RACE_CONFIG.MAX_CONDITION, currentCondition + 20)
        horse.condition =
          Math.floor(Math.random() * (maxCondition - minCondition + 1)) + minCondition
      })
    }
  }

  const nextRound = () => {
    if (!isRoundComplete.value) return

    if (raceSchedule.value.currentRound < raceSchedule.value.rounds.length - 1) {
      raceSchedule.value.currentRound++
      isRoundComplete.value = false
      horsePositions.value = {}
      updateHorseConditions() // Update horse conditions before starting the next round
    }
  }

  const currentRace = computed(() => raceSchedule.value.rounds[raceSchedule.value.currentRound])

  const isRaceInProgress = computed(() => raceSchedule.value?.isRaceInProgress ?? false)

  const isLastRound = computed(
    () => raceSchedule.value.currentRound === raceSchedule.value.rounds.length - 1,
  )

  const totalResults = computed(() => {
    const allResults = raceSchedule.value.rounds.flatMap(
      (round) =>
        round.results?.map((result) => ({
          horseId: result.horseId,
          points:
            (RACE_CONFIG.HORSES_PER_RACE - result.position + 1) * RACE_CONFIG.POINTS_PER_POSITION,
          round: round.id,
        })) || [],
    )

    const horseTotals = allResults.reduce(
      (acc, result) => {
        if (!acc[result.horseId]) {
          acc[result.horseId] = {
            horseId: result.horseId,
            totalPoints: 0,
            rounds: [],
          }
        }
        acc[result.horseId].totalPoints += result.points
        acc[result.horseId].rounds.push({
          round: result.round,
          points: result.points,
        })
        return acc
      },
      {} as Record<
        number,
        { horseId: number; totalPoints: number; rounds: { round: number; points: number }[] }
      >,
    )

    return Object.values(horseTotals)
      .sort((a, b) => b.totalPoints - a.totalPoints)
      .map((result, index) => ({
        ...result,
        position: index + 1,
      }))
  })

  return {
    horses,
    raceSchedule,
    currentRace,
    isRaceInProgress,
    isRoundComplete,
    isLastRound,
    horsePositions,
    totalResults,
    generateHorses,
    generateRaceSchedule,
    startRace,
    nextRound,
  }
})
