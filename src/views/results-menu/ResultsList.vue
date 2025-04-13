<script setup lang="ts">
import { useHorseStore } from '@/stores'
import type { RaceResult } from '@/types'
import { storeToRefs } from 'pinia'

interface Props {
  results: RaceResult[]
  displayType: 'time' | 'points'
}

const props = defineProps<Props>()

const horseStore = useHorseStore()
const { horses } = storeToRefs(horseStore)

const getHorseName = (horseId: number): string => {
  const horse = horses.value.find((h) => h.id === horseId)
  return horse?.name ?? 'Unknown Horse'
}

const formatValue = (result: RaceResult): string => {
  if (props.displayType === 'time') {
    return `${result.time?.toFixed(2)}s`
  }

  return `${result.totalPoints} pts`
}
</script>

<template>
  <div class="results-list" data-test="results-list">
    <div
      v-for="result in results"
      :key="result.horseId"
      class="results-list__item"
      :class="{
        'results-list__item--podium': result.position <= 3,
        'results-list__item--gold': result.position === 1,
        'results-list__item--silver': result.position === 2,
        'results-list__item--bronze': result.position === 3,
      }"
      data-test="results-item"
    >
      <div class="results-list__position">{{ result.position }}</div>
      <div class="results-list__name">{{ getHorseName(result.horseId) }}</div>
      <div class="results-list__value">{{ formatValue(result) }}</div>
    </div>
  </div>
</template>

<style lang="css" scoped>
.results-list {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
}

.results-list__item {
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
  padding: var(--spacing-md) var(--spacing-lg);
  background: var(--color-surface);
  border-radius: var(--border-radius-md);
  color: var(--color-text);
  transition: background-color 0.2s ease;
}

.results-list__item--podium {
  background: linear-gradient(90deg, var(--color-surface) 0%, var(--color-surface-alt) 100%);
}

.results-list__item--gold {
  background: linear-gradient(90deg, rgba(255, 215, 0, 0.2) 0%, var(--color-surface) 100%);
}

.results-list__item--silver {
  background: linear-gradient(90deg, rgba(192, 192, 192, 0.2) 0%, var(--color-surface) 100%);
}

.results-list__item--bronze {
  background: linear-gradient(90deg, rgba(205, 127, 50, 0.2) 0%, var(--color-surface) 100%);
}

.results-list__position {
  min-width: 30px;
  font-weight: var(--font-weight-bold);
}

.results-list__name {
  flex: 1;
}

.results-list__value {
  font-family: var(--font-family-mono);
  color: var(--color-text-secondary);
}
</style>
