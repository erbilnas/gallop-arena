import { FAMOUS_HORSE_NAMES, HORSE_COLORS, RACE_CONFIG } from '@/constants'
import { ref } from 'vue'

import type { Horse } from '../../types/horse'

const generateHorseName = (index: number): string => {
  return FAMOUS_HORSE_NAMES[index % FAMOUS_HORSE_NAMES.length]
}

export const useHorseModule = () => {
  const horses = ref<Horse[]>([])

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
      console.error(`Not enough horses available. Need ${count}, have ${horses.value.length}`)
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
    horses,
    generateHorses,
    getRandomHorses,
    updateHorseConditions,
  }
}
