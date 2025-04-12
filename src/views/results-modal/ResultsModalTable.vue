<script setup lang="ts">
import { BaseTable } from '@/components'
import type { Horse, ProcessedResult, TotalResult } from '@/types'
import { computed } from 'vue'
import ResultsModalHorseInfo from './ResultsModalHorseInfo.vue'
import ResultsModalTableDetails from './ResultsModalTableDetails.vue'

interface Props {
  results: TotalResult[]
  horses: Horse[]
}

const props = defineProps<Props>()

const processedResults = computed<ProcessedResult[]>(() => {
  return props.results.map((result) => ({
    ...result,
    horseName: getHorseName(result.horseId),
    horseColor: getHorseColor(result.horseId),
  }))
})

const getHorseName = (horseId: number): string => {
  return props.horses.find((h) => h.id === horseId)?.name ?? 'Unknown Horse'
}

const getHorseColor = (horseId: number): string => {
  return props.horses.find((h) => h.id === horseId)?.color ?? '#666'
}
</script>

<template>
  <BaseTable
    :headers="['Position', 'Horse', 'Total Points', 'Round Details']"
    :striped="true"
    :rows="processedResults"
    hoverable
    class="results-table"
  >
    <template #default="{ row }">
      <td>{{ (row as ProcessedResult).position }}</td>
      <td>
        <ResultsModalHorseInfo
          :horse="{
            id: (row as ProcessedResult).horseId,
            name: (row as ProcessedResult).horseName,
            color: (row as ProcessedResult).horseColor,
            condition: 0,
          }"
        />
      </td>
      <td>{{ (row as ProcessedResult).totalPoints }}</td>
      <td>
        <ResultsModalTableDetails :rounds="(row as ProcessedResult).rounds" />
      </td>
    </template>
  </BaseTable>
</template>

<style lang="css" scoped>
.results-table {
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  background-color: var(--color-surface);
  color: var(--color-text);
  border-radius: var(--border-radius-md);
  overflow: hidden;
  box-shadow: var(--shadow-md);
}

.results-table th {
  background-color: var(--color-surface);
  font-weight: var(--font-weight-bold);
  padding: var(--spacing-md);
  text-align: left;
  color: var(--color-text);
  font-size: var(--font-size-lg);
  border-bottom: 1px solid var(--color-border);
}

.results-table td {
  padding: var(--spacing-md);
  border-bottom: 1px solid var(--color-border);
}

/* Hover state for rows */
.results-table tr:hover {
  background-color: var(--color-background);
  transition: background-color var(--transition-fast);
}
</style>
