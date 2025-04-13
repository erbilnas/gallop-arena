<script setup lang="ts">
import { DefaultLayout } from '@/layouts'
import { useRaceStore, useResultsStore, useUIStore } from '@/stores'
import { ArenaView, FooterView, HeaderView, ResultsMenu, ResultsModal } from '@/views'
import { storeToRefs } from 'pinia'
import { computed, watch } from 'vue'

const raceStore = useRaceStore()
const resultsStore = useResultsStore()
const uiStore = useUIStore()

const { isLastRound, isRoundComplete } = storeToRefs(raceStore)
const { totalResults } = storeToRefs(resultsStore)
const { showResultsMenu, showResultsModal } = storeToRefs(uiStore)

const isResultsModalVisible = computed<boolean>(
  () => isLastRound.value && totalResults.value.length > 0 && isRoundComplete.value,
)

watch(isResultsModalVisible, (value) => {
  if (value) {
    showResultsModal.value = true
  }
})
</script>

<template>
  <DefaultLayout>
    <template #header>
      <HeaderView />
    </template>

    <template #main>
      <ArenaView />
    </template>

    <template #footer>
      <FooterView />
    </template>

    <div class="portal">
      <ResultsModal v-if="showResultsModal" />

      <ResultsMenu v-if="showResultsMenu" />
    </div>
  </DefaultLayout>
</template>

<style lang="css"></style>
