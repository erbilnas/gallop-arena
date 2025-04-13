<script setup lang="ts">
import { BaseModal } from '@/components'
import { useHorseStore, useResultsStore, useUIStore } from '@/stores'
import { storeToRefs } from 'pinia'
import ResultsModalPointSystem from './ResultsModalPointSystem.vue'
import ResultsModalTable from './ResultsModalTable.vue'

const horseStore = useHorseStore()
const resultsStore = useResultsStore()
const uiStore = useUIStore()

const { horses } = storeToRefs(horseStore)
const { totalResults } = storeToRefs(resultsStore)
const { showResultsModal } = storeToRefs(uiStore)
</script>

<template>
  <BaseModal title="🏆 Race Results 🏆" @close="showResultsModal = false" data-test="results-modal">
    <ResultsModalPointSystem />
    <ResultsModalTable :results="totalResults" :horses="horses" />
  </BaseModal>
</template>

<style lang="css" scoped></style>
