<script setup lang="ts">
import { useRaceStore, useResultsStore, useUIStore } from '@/stores'
import { storeToRefs } from 'pinia'
import ResultsMenuContent from './ResultsMenuContent.vue'
import ResultsMenuHeader from './ResultsMenuHeader.vue'

const raceStore = useRaceStore()
const resultsStore = useResultsStore()
const uiStore = useUIStore()

const { raceSchedule } = storeToRefs(raceStore)
const { totalResults } = storeToRefs(resultsStore)
const { showResultsMenu } = storeToRefs(uiStore)
</script>

<template>
  <div
    class="results-menu"
    :class="{ 'results-menu--open': showResultsMenu }"
    @click="showResultsMenu = false"
    data-test="results-menu"
  >
    <div class="results-menu__content" @click.stop data-test="results-menu-content">
      <ResultsMenuHeader @close="showResultsMenu = false" />
      <ResultsMenuContent :race-schedule="raceSchedule" :total-results="totalResults" />
    </div>
  </div>
</template>

<style lang="css" scoped>
.results-menu {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: var(--z-index-modal-backdrop);
  animation: fadeIn var(--transition-normal);
}

.results-menu__content {
  position: fixed;
  right: -400px;
  top: 0;
  bottom: 0;
  width: 42rem;
  background: var(--color-surface);
  box-shadow: var(--shadow-lg);
  transition: right var(--transition-normal);
  z-index: var(--z-index-modal);
  display: flex;
  flex-direction: column;
}

.results-menu--open .results-menu__content {
  right: 0;
}
</style>
