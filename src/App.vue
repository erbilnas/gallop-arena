<script setup lang="ts">
import { DefaultLayout } from '@/layouts'
import { useStore } from '@/stores'
import { ArenaView, FooterView, HeaderView, ResultsMenu, ResultsModal } from '@/views'
import { storeToRefs } from 'pinia'
import { computed, watch } from 'vue'

const store = useStore()
const { showResultsMenu, isLastRound, totalResults, isRoundComplete, showResultsModal } =
  storeToRefs(store)

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
