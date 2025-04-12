<script setup lang="ts">
import { POINT_SYSTEM, POINT_SYSTEM_EXPLANATION } from '@/constants'

const calculateTotalPoints = () => {
  return Object.values(POINT_SYSTEM).reduce((sum, points) => sum + points, 0)
}

const getPositionSuffix = (position: number) => {
  const suffixes = ['st', 'nd', 'rd', 'th']
  const index = position <= 3 ? position - 1 : 3
  return suffixes[index]
}

const getPositionClass = (position: number) => {
  if (position <= 3) {
    return `point-system__rule--podium`
  }
  return ''
}
</script>

<template>
  <div class="point-system">
    <div class="point-system__header">
      <h3 class="point-system__title">Point System</h3>
      <div class="point-system__total-points">
        <span class="point-system__total-label">Total Points Available:</span>
        <span class="point-system__total-value">{{ calculateTotalPoints() }}</span>
      </div>
    </div>

    <div class="point-system__rules">
      <div
        v-for="(points, position) in POINT_SYSTEM"
        :key="position"
        class="point-system__rule"
        :class="getPositionClass(position)"
      >
        <div class="point-system__position">
          <span class="point-system__position-number">{{ position }}</span>
          <span class="point-system__position-suffix">{{ getPositionSuffix(position) }}</span>
        </div>
        <div class="point-system__points">
          <span class="point-system__points-value">{{ points }}</span>
          <span class="point-system__points-label">points</span>
        </div>
      </div>
    </div>

    <div class="point-system__note">
      <p class="point-system__note-text">
        {{ POINT_SYSTEM_EXPLANATION }}
      </p>
    </div>
  </div>
</template>

<style lang="css" scoped>
.point-system {
  background: rgba(255, 255, 255, 0.05);
  border-radius: var(--border-radius-lg);
  padding: var(--spacing-xl);
  margin-bottom: var(--spacing-lg);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.point-system__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--spacing-lg);
}

.point-system__title {
  color: var(--color-text);
  margin: 0;
  font-size: var(--font-size-xl);
  font-weight: var(--font-weight-bold);
}

.point-system__total-points {
  display: flex;
  align-items: center;
  gap: var(--spacing-xs);
}

.point-system__total-label {
  color: var(--color-text-secondary);
  font-size: var(--font-size-sm);
}

.point-system__total-value {
  color: var(--color-success);
  font-weight: var(--font-weight-bold);
  font-size: var(--font-size-lg);
}

.point-system__rules {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
  gap: var(--spacing-md);
  margin-bottom: var(--spacing-lg);
}

.point-system__rule {
  background: rgba(255, 255, 255, 0.03);
  padding: var(--spacing-lg);
  border-radius: var(--border-radius-md);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--spacing-sm);
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease;
}

.point-system__rule:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.point-system__rule--podium {
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.1));
}

.point-system__position {
  display: flex;
  align-items: baseline;
  gap: var(--spacing-xs);
}

.point-system__position-number {
  color: var(--color-warning);
  font-weight: var(--font-weight-bold);
  font-size: var(--font-size-2xl);
}

.point-system__position-suffix {
  color: var(--color-warning);
  font-size: var(--font-size-lg);
  opacity: 0.8;
}

.point-system__points {
  display: flex;
  align-items: baseline;
  gap: var(--spacing-xs);
}

.point-system__points-value {
  color: var(--color-success);
  font-weight: var(--font-weight-bold);
  font-size: var(--font-size-xl);
}

.point-system__points-label {
  color: var(--color-text-secondary);
  font-size: var(--font-size-sm);
}

.point-system__note {
  background: rgba(255, 255, 255, 0.02);
  padding: var(--spacing-lg);
  border-radius: var(--border-radius-md);
}

.point-system__note-text {
  color: var(--color-text-secondary);
  font-size: var(--font-size-sm);
  line-height: var(--line-height-normal);
  text-align: center;
  margin: 0;
}
</style>
