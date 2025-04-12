<script setup lang="ts">
import { ScrollContainer, ScrollHint } from '@/components'
import { useStore } from '@/stores'
import type { Horse } from '@/types'
import { storeToRefs } from 'pinia'
import { computed } from 'vue'
import HorseListCard from './HorseListCard.vue'
import HorseListHeader from './HorseListHeader.vue'

const props = defineProps<{
  horses: Horse[]
}>()

const store = useStore()
const { currentRace } = storeToRefs(store)

const isHorseSelected = (horseId: number): boolean => {
  return currentRace.value?.horses.some((horse) => horse.id === horseId) ?? false
}

const compareHorsesBySelection = (horseA: Horse, horseB: Horse): number => {
  const isHorseASelected = isHorseSelected(horseA.id)
  const isHorseBSelected = isHorseSelected(horseB.id)

  if (isHorseASelected && !isHorseBSelected) return -1
  if (!isHorseASelected && isHorseBSelected) return 1
  return 0
}

const sortedHorses = computed(() => {
  return [...props.horses].sort(compareHorsesBySelection)
})
</script>

<template>
  <div class="horse-list">
    <ScrollContainer>
      <ScrollHint />
      <HorseListHeader :horse-count="horses.length" />
      <div class="horse-list__grid">
        <HorseListCard
          v-for="horse in sortedHorses"
          :key="horse.id"
          :horse="horse"
          :is-selected="isHorseSelected(horse.id)"
        />
        <ScrollHint />
      </div>
    </ScrollContainer>
  </div>
</template>

<style lang="css" scoped>
.horse-list {
  background: var(--color-surface);
  border-radius: var(--border-radius-md);
  padding: var(--spacing-md);
  animation: fadeIn var(--transition-normal);
  height: 100vh;
}

.horse-list__grid {
  display: grid;
  gap: var(--spacing-md);
}
</style>
