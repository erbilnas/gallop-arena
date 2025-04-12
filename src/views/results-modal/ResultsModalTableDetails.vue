<script setup lang="ts">
import type { RoundPoints } from '@/types'

interface Props {
  rounds: RoundPoints[]
}

const props = defineProps<Props>()
</script>

<template>
  <div class="round-details">
    <div v-for="round in props.rounds" :key="round.round" class="round-details__info">
      <span class="round-details__number">Round {{ round.round }}:</span>
      <span class="round-details__points">{{ round.points }} pts</span>
      <span v-if="round.time" class="round-details__time">({{ round.time }}s)</span>
    </div>
  </div>
</template>

<style lang="css" scoped>
.round-details {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xs);
}

.round-details__info {
  display: flex;
  align-items: center;
  gap: var(--spacing-xs);
  font-size: var(--font-size-sm);
}

.round-details__number {
  font-weight: var(--font-weight-bold);
  color: var(--color-text);
}

.round-details__points {
  color: var(--color-primary);
  font-weight: var(--font-weight-medium);
}

.round-details__time {
  color: var(--color-text-secondary);
  font-size: var(--font-size-xs);
}
</style>
