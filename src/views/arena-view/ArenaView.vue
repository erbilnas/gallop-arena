<script setup lang="ts">
import { useSound } from '@/composables'
import { useStore } from '@/stores'
import { storeToRefs } from 'pinia'
import { ref, watch } from 'vue'
import GuideSection from './guide-section'
import HorseList from './horse-list'
import { RaceView } from './race-view'

const store = useStore()
const { horses, isRoundInProgress, currentRace } = storeToRefs(store)

const { playHorseSound, stopHorseSound } = useSound()

const isFullscreen = ref<boolean>(false)
const isHorseListVisible = ref<boolean>(false)

watch(
  horses,
  (newHorses: typeof horses.value) => {
    isHorseListVisible.value = newHorses.length > 0
  },
  { immediate: true },
)

watch(isRoundInProgress, (inProgress: boolean) => {
  if (inProgress) {
    playHorseSound()
    if (!document.fullscreenElement) {
      toggleFullscreen()
    }
  } else {
    stopHorseSound()
  }
})

const toggleFullscreen = (): void => {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen()
    isFullscreen.value = true
  }
}
</script>

<template>
  <div class="arena">
    <div class="arena__container">
      <template v-if="!horses.length">
        <GuideSection />
      </template>

      <template v-else>
        <HorseList v-if="isHorseListVisible" :horses />

        <div v-if="currentRace" class="arena__race">
          <RaceView />
        </div>
      </template>
    </div>
  </div>
</template>

<style lang="css" scoped>
.arena {
  display: flex;
  flex-direction: column;
  padding: var(--spacing-lg);
}

.arena__container {
  animation: fadeIn var(--transition-normal);
  display: grid;
  gap: var(--spacing-lg);
  grid-template-columns: 18.75rem 1fr;
}

.arena__race {
  animation: slideUp var(--transition-normal);
  background: var(--color-surface);
  block-size: 100vh;
  border-radius: var(--border-radius-md);
  padding: var(--spacing-lg);
  scrollbar-color: var(--color-text-secondary) transparent;
  scrollbar-width: auto;
}
</style>
