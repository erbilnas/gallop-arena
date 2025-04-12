<template>
  <table>
    <thead>
      <tr>
        <th>Position</th>
        <th>Horse</th>
        <th>Total Points</th>
        <th>Round Details</th>
      </tr>
    </thead>
    <tbody>
      <ResultRow
        v-for="result in results"
        :key="result.horseId"
        :position="result.position"
        :horse-name="getHorseName(result.horseId)"
        :horse-color="getHorseColor(result.horseId)"
        :total-points="result.totalPoints"
        :rounds="result.rounds"
      />
    </tbody>
  </table>
</template>

<script setup lang="ts">
import ResultRow from './ResultRow.vue'

interface Horse {
  id: number
  name: string
  color: string
}

interface RoundPoints {
  round: number
  points: number
  time?: number
}

interface TotalResult {
  horseId: number
  position: number
  totalPoints: number
  rounds: RoundPoints[]
}

interface Props {
  results: TotalResult[]
  horses: Horse[]
}

const props = defineProps<Props>()

const getHorseName = (horseId: number): string => {
  return props.horses.find((h) => h.id === horseId)?.name ?? 'Unknown Horse'
}

const getHorseColor = (horseId: number): string => {
  return props.horses.find((h) => h.id === horseId)?.color ?? '#666'
}
</script>

<style scoped>
table {
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  background-color: var(--color-background-secondary);
  color: var(--color-text);
  border-radius: var(--border-radius-md);
  overflow: hidden;
}

th {
  background-color: var(--color-background-secondary);
  font-weight: var(--font-weight-semibold);
  padding: var(--spacing-md);
  text-align: left;
  color: var(--color-text);
  font-size: var(--font-size-lg);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-bottom: none;
}

td {
  padding: var(--spacing-md);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  border-right: 1px solid rgba(255, 255, 255, 0.1);
}

@media (max-width: 768px) {
  th,
  td {
    padding: var(--spacing-sm);
    font-size: var(--font-size-sm);
  }
}
</style>
