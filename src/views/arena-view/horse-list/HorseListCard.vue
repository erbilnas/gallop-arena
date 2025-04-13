<script setup lang="ts">
import type { Horse } from '@/types'

defineProps<{
  horse: Horse
  isSelected?: boolean
}>()

const getConditionColor = (condition: number): string => {
  if (condition >= 90) return 'var(--color-success)'
  if (condition >= 80) return 'var(--color-success-light)'
  if (condition >= 70) return 'var(--color-success-lighter)'
  if (condition >= 60) return 'var(--color-warning-light)'
  if (condition >= 50) return 'var(--color-warning)'
  if (condition >= 40) return 'var(--color-warning-dark)'
  if (condition >= 30) return 'var(--color-error-light)'
  if (condition >= 20) return 'var(--color-error)'
  return 'var(--color-error-dark)'
}
</script>

<template>
  <div
    class="horse-card"
    :class="{ 'horse-card--selected': isSelected }"
    :style="{ '--delay': `${horse.id * 0.05}s` }"
    data-test="horse-card"
  >
    <div class="horse-card__header">
      <div
        class="horse-card__color"
        :style="{ backgroundColor: horse.color }"
        data-test="horse-color"
      ></div>
      <div class="horse-card__name" data-test="horse-name">{{ horse.name }}</div>
    </div>
    <div class="horse-card__condition">
      <div class="horse-card__condition-label">Condition</div>
      <div class="horse-card__condition-bar">
        <div
          class="horse-card__condition-fill"
          :style="{
            width: `${horse.condition}%`,
            background: getConditionColor(horse.condition),
          }"
          data-test="horse-condition-bar"
        ></div>
        <span class="horse-card__condition-value" data-test="horse-condition">{{
          horse.condition
        }}</span>
      </div>
    </div>
  </div>
</template>

<style lang="css" scoped>
.horse-card {
  background: var(--color-surface);
  border-radius: var(--border-radius-md);
  padding: var(--spacing-md);
  animation: fadeIn var(--transition-normal);
  animation-fill-mode: both;
  transition:
    transform var(--transition-fast),
    box-shadow var(--transition-fast),
    border-color var(--transition-fast);
  border: 2px solid transparent;
  border-color: var(--color-text-secondary);
}

.horse-card--selected {
  border-color: var(--color-primary);

  background: var(--color-surface);
}

.horse-card__header {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  margin-bottom: var(--spacing-sm);
}

.horse-card__color {
  width: var(--spacing-xl);
  height: var(--spacing-xl);
  border-radius: var(--border-radius-full);
  box-shadow: var(--shadow-md);
}

.horse-card__name {
  color: var(--color-text);
  font-weight: var(--font-weight-medium);
  font-size: var(--font-size-lg);
  font-family: var(--font-family-primary);
}

.horse-card__condition {
  margin-top: var(--spacing-sm);
}

.horse-card__condition-label {
  color: var(--color-text-secondary);
  font-size: var(--font-size-sm);
  margin-bottom: var(--spacing-xxs);
  font-family: var(--font-family-primary);
}

.horse-card__condition-bar {
  height: var(--spacing-lg);
  background: rgba(255, 255, 255, 0.1);
  border-radius: var(--border-radius-full);
  overflow: hidden;
  position: relative;
}

.horse-card__condition-fill {
  height: 100%;
  border-radius: var(--border-radius-full);
  transition: width var(--transition-normal);
}

.horse-card__condition-value {
  position: absolute;
  right: var(--spacing-xs);
  top: 50%;
  transform: translateY(-50%);
  color: var(--color-text);
  font-size: var(--font-size-sm);
  text-shadow: var(--shadow-sm);
  font-family: var(--font-family-primary);
}
</style>
