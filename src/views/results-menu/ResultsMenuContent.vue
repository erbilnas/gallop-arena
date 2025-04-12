<script setup lang="ts">
import type { RaceResult, RaceSchedule } from '@/types'
import ResultsList from './ResultsList.vue'

interface Props {
  raceSchedule: RaceSchedule
  totalResults: RaceResult[]
}

defineProps<Props>()
</script>

<template>
  <div class="results-menu-content">
    <div v-for="round in raceSchedule.rounds" :key="round.id" class="results-menu-content__round">
      <h3 class="results-menu-content__round-title">
        Round {{ round.id }} - {{ round.distance }}m
      </h3>

      <ResultsList v-if="round.results" :results="round.results" display-type="time" />

      <div v-else class="results-menu-content__no-results">No results yet</div>
    </div>

    <div v-if="totalResults.length > 0" class="results-menu-content__total">
      <h3 class="results-menu-content__total-title">🏆 Total Results</h3>

      <ResultsList :results="totalResults" display-type="points" />
    </div>
  </div>
</template>

<style lang="css" scoped>
.results-menu-content {
  flex: 1;
  overflow-y: auto;
  padding: var(--spacing-lg);
  scrollbar-width: thin;
  scrollbar-color: var(--color-border) var(--color-background);
}

.results-menu-content__round,
.results-menu-content__total {
  margin-bottom: var(--spacing-2xl);
}

.results-menu-content__round-title,
.results-menu-content__total-title {
  color: var(--color-text);
  margin: 0 0 var(--spacing-lg) 0;
  font-size: var(--font-size-xl);
  padding-bottom: var(--spacing-sm);
  border-bottom: 1px solid var(--color-border);
}

.results-menu-content__no-results {
  color: var(--color-text-secondary);
  text-align: center;
  padding: var(--spacing-lg);
}
</style>
