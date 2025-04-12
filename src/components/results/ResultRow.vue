<template>
  <tr :class="{ podium: position <= 3 }">
    <td class="position-cell">
      <span class="position-number">{{ position }}</span>
      <span v-if="position <= 3" class="medal">{{ MEDALS[position - 1] }}</span>
    </td>
    <td class="horse-cell">
      <div class="horse-info">
        <div class="horse-color" :style="{ backgroundColor: horseColor }"></div>
        <span class="horse-name">{{ horseName }}</span>
      </div>
    </td>
    <td class="points-cell">
      <span class="total-points">{{ totalPoints }}</span>
    </td>
    <td class="rounds-cell">
      <RoundDetails :rounds="rounds" />
    </td>
  </tr>
</template>

<script setup lang="ts">
import RoundDetails from './RoundDetails.vue'

interface RoundPoints {
  round: number
  points: number
  time?: number
}

interface Props {
  position: number
  horseName: string
  horseColor: string
  totalPoints: number
  rounds: RoundPoints[]
}

defineProps<Props>()

const MEDALS = ['🥇', '🥈', '🥉']
</script>

<style scoped>
.position-cell {
  text-align: center;
  width: 80px;
}

.position-number {
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-semibold);
}

.medal {
  margin-left: var(--spacing-xs);
  font-size: var(--font-size-lg);
}

.horse-cell {
  min-width: 200px;
}

.horse-info {
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
}

.horse-color {
  width: 24px;
  height: 24px;
  border-radius: var(--border-radius-full);
  border: 2px solid rgba(255, 255, 255, 0.2);
}

.horse-name {
  font-weight: var(--font-weight-medium);
}

.points-cell {
  text-align: center;
  width: 120px;
}

.total-points {
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-semibold);
  color: var(--color-success);
}

.rounds-cell {
  min-width: 300px;
}

tr.podium {
  background: linear-gradient(90deg, rgba(50, 50, 50, 0.8) 0%, rgba(60, 60, 60, 0.9) 100%);
}

tr.podium:nth-child(1) {
  background: linear-gradient(90deg, rgba(255, 215, 0, 0.1) 0%, rgba(50, 50, 50, 0.8) 100%);
}

tr.podium:nth-child(2) {
  background: linear-gradient(90deg, rgba(192, 192, 192, 0.1) 0%, rgba(50, 50, 50, 0.8) 100%);
}

tr.podium:nth-child(3) {
  background: linear-gradient(90deg, rgba(205, 127, 50, 0.1) 0%, rgba(50, 50, 50, 0.8) 100%);
}
</style>
