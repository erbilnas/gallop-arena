<template>
  <div class="rounds-container">
    <div v-for="round in rounds" :key="round.round" class="round-info">
      <div class="round-header">
        <span class="round-number">Round {{ round.round }}</span>
        <span class="round-distance">{{ getRoundDistance(round.round) }}m</span>
      </div>
      <div class="round-details">
        <span class="round-points">Points: {{ round.points }}</span>
        <span v-if="round.time" class="round-time">Time: {{ formatTime(round.time) }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface RoundPoints {
  round: number
  points: number
  time?: number
}

interface Props {
  rounds: RoundPoints[]
}

defineProps<Props>()

const getRoundDistance = (round: number): number => {
  const distances = [1200, 1400, 1600, 1800, 2000, 2200]
  return distances[round - 1] ?? 0
}

const formatTime = (time: number): string => {
  const minutes = Math.floor(time / 60)
  const seconds = (time % 60).toFixed(2)
  return `${minutes}:${seconds}`
}
</script>

<style scoped>
.rounds-container {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
}

.round-info {
  background: rgba(255, 255, 255, 0.05);
  padding: var(--spacing-md);
  border-radius: var(--border-radius-md);
}

.round-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: var(--spacing-xs);
}

.round-number {
  font-weight: var(--font-weight-medium);
  color: var(--color-success);
}

.round-distance {
  color: var(--color-text-secondary);
  font-size: var(--font-size-sm);
}

.round-details {
  display: flex;
  gap: var(--spacing-md);
  font-size: var(--font-size-sm);
}

.round-points {
  color: var(--color-warning);
}

.round-time {
  color: var(--color-info);
}

@media (max-width: 768px) {
  .rounds-container {
    gap: var(--spacing-sm);
  }

  .round-info {
    padding: var(--spacing-sm);
  }
}
</style>
