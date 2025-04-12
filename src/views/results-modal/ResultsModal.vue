<script setup lang="ts">
import { BaseModal } from '@/components'
import { useStore } from '@/stores'
import { storeToRefs } from 'pinia'
import ResultsModalPointSystem from './ResultsModalPointSystem.vue'
import ResultsModalTable from './ResultsModalTable.vue'

const store = useStore()
const { showResultsModal, totalResults, horses } = storeToRefs(store)
</script>

<template>
  <BaseModal title="🏆 Race Results 🏆" @close="showResultsModal = false">
    <ResultsModalPointSystem />
    <ResultsModalTable :results="totalResults" :horses="horses" />
  </BaseModal>
</template>

<style lang="css" scoped></style>
