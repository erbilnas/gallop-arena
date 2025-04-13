import { FAMOUS_HORSE_NAMES, HORSE_COLORS, HORSE_CONFIG } from '@/constants'
import type { Horse } from '@/types'
import { defineStore } from 'pinia'
import { ref } from 'vue'

/**
 * Generates a horse name based on the index, cycling through famous horse names
 * @param index - The index of the horse
 * @returns A horse name from the famous horse names list
 */
const generateHorseName = (index: number): string => {
  return FAMOUS_HORSE_NAMES[index % FAMOUS_HORSE_NAMES.length]
}

/**
 * Pinia store for managing horse-related state and operations
 * This store handles:
 * - Horse generation
 * - Random horse selection for races
 * - Horse condition updates
 */
export const useHorseStore = defineStore('horse', () => {
  // State
  const horses = ref<Horse[]>([])

  /**
   * Generates a new set of horses with random conditions
   * Each horse has:
   * - Unique ID
   * - Name from famous horse names list
   * - Unique color
   * - Random condition score between MIN_CONDITION and MAX_CONDITION
   */
  const generateHorses = () => {
    horses.value = Array.from({ length: HORSE_CONFIG.TOTAL_HORSES }, (_, index) => ({
      id: index + 1,
      name: generateHorseName(index),
      color: HORSE_COLORS[index],
      condition:
        Math.floor(Math.random() * (HORSE_CONFIG.MAX_CONDITION - HORSE_CONFIG.MIN_CONDITION + 1)) +
        HORSE_CONFIG.MIN_CONDITION,
    }))
  }

  /**
   * Selects a random set of horses for a race
   * @param count - Number of horses to select (defaults to HORSES_PER_RACE)
   * @returns Array of randomly selected horses
   */
  const getRandomHorses = (count: number = HORSE_CONFIG.HORSES_PER_RACE): Horse[] => {
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

  /**
   * Updates the condition of horses after a race
   * Each horse's condition can change by up to 20 points
   * The new condition stays within MIN_CONDITION and MAX_CONDITION bounds
   * @param horses - Array of horses to update
   * @returns Array of horses with updated conditions
   */
  const updateHorseConditions = (horses: Horse[]) => {
    return horses.map((horse) => {
      const currentCondition = horse.condition
      const minCondition = Math.max(HORSE_CONFIG.MIN_CONDITION, currentCondition - 20)
      const maxCondition = Math.min(HORSE_CONFIG.MAX_CONDITION, currentCondition + 20)
      return {
        ...horse,
        condition: Math.floor(Math.random() * (maxCondition - minCondition + 1)) + minCondition,
      }
    })
  }

  return {
    horses,
    generateHorses,
    getRandomHorses,
    updateHorseConditions,
  }
})
