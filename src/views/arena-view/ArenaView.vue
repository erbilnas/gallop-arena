<script setup lang="ts">
import { useSound } from '@/composables'
import { useHorseStore, useRaceStore, useUIStore } from '@/stores'
import { storeToRefs } from 'pinia'
import { onMounted, onUnmounted, ref, watch } from 'vue'
import GuideSection from './guide-section'
import HorseList from './horse-list'
import { RaceView } from './race-view'

const horseStore = useHorseStore()
const raceStore = useRaceStore()
const uiStore = useUIStore()
const { horses } = storeToRefs(horseStore)
const { isRoundInProgress, currentRace, isRoundComplete } = storeToRefs(raceStore)
const { isAutoNext } = storeToRefs(uiStore)

const { playSound, stopSound } = useSound()

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
    playSound('horse', '/src/assets/sounds/horse-running.mp3', { loop: true })
    if (!document.fullscreenElement) {
      toggleFullscreen()
    }
  } else {
    stopSound('horse')
  }
})

// Watch for round completion and handle auto-next
watch([isRoundComplete, isAutoNext], ([isComplete, autoNext]) => {
  if (isComplete && autoNext && !raceStore.isLastRound) {
    // Add a small delay before advancing to the next round
    // This ensures the UI has time to update and Cypress can detect the changes
    setTimeout(() => {
      raceStore.handleNextRound()
    }, 1000)
  }
})

const toggleFullscreen = async (): Promise<void> => {
  try {
    if (!document.fullscreenElement) {
      await document.documentElement.requestFullscreen()
      isFullscreen.value = true
    } else {
      if (document.exitFullscreen) {
        await document.exitFullscreen()
        isFullscreen.value = false
      }
    }
  } catch (err) {
    console.error('Error attempting to toggle fullscreen:', err)
  }
}

// Add fullscreen change event listener
onMounted(() => {
  document.addEventListener('fullscreenchange', () => {
    isFullscreen.value = Boolean(document.fullscreenElement)
  })
})

onUnmounted(() => {
  document.removeEventListener('fullscreenchange', () => {
    isFullscreen.value = Boolean(document.fullscreenElement)
  })
})
</script>

<template>
  <div class="arena" data-test="arena">
    <div class="arena__container">
      <template v-if="!horses.length">
        <GuideSection />
      </template>

      <template v-else>
        <HorseList v-if="isHorseListVisible" :horses data-test="horse-list" />

        <div v-if="currentRace" class="arena__race" data-test="race-view">
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
