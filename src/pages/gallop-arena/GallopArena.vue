<template>
  <div class="arena" :class="{ 'is-fullscreen': isFullscreen }">
    <div class="container">
      <ArenaControls class="controls" @show-results="handleShowResultsMenu" />

      <div class="content">
        <GuideSection v-if="!horses.length" />

        <HorseList
          v-if="isHorseListVisible"
          :horses="horses"
          :class="{ 'is-hidden': !isHorseListVisible }"
        />

        <div v-if="currentRace" class="race">
          <RaceTitle
            :round="currentRace.id"
            :distance="currentRace.distance"
            @toggle-horse-list="handleHorseListToggle"
          />

          <RaceTrack :horses="currentRace.horses" :horse-positions="horsePositions" />
        </div>
      </div>
    </div>

    <footer class="footer">
      <p class="footer__text">
        © {{ new Date().getFullYear() }} Erbil Nas. All rights reserved. Version: {{ version }}
      </p>
    </footer>

    <ResultsModal
      v-if="isResultsModalVisible"
      :is-open="showResultsModal"
      :results="totalResults"
      :horses="horses"
      @close="handleCloseResultsModal"
    />

    <ResultsSideMenu :is-open="showResultsMenu" :horses="horses" @close="handleCloseResultsMenu" />
  </div>
</template>

<script setup lang="ts">
import '@/assets/design-system/animations.css'
import { useSound, useVersion } from '@/composables'
import { useRaceStore } from '@/stores/raceStore'
import { storeToRefs } from 'pinia'
import { computed, ref, watch } from 'vue'
import ArenaControls from './views/ArenaControls.vue'
import GuideSection from './views/GuideSection.vue'
import HorseList from './views/HorseList.vue'
import RaceTitle from './views/race-area/RaceTitle.vue'
import RaceTrack from './views/race-area/RaceTrack.vue'
import ResultsModal from './views/results/ResultsModal.vue'
import ResultsSideMenu from './views/results/ResultsSideMenu.vue'

// Store
const store = useRaceStore()
const { version } = useVersion()
const {
  horses,
  currentRace,
  horsePositions,
  totalResults,
  isLastRound,
  isRoundComplete,
  isRoundInProgress,
} = storeToRefs(store)

// Sound
const { playHorseSound, stopHorseSound } = useSound()

// State
const showResultsModal = ref<boolean>(false)
const showResultsMenu = ref<boolean>(false)
const isFullscreen = ref<boolean>(false)
const isHorseListVisible = ref<boolean>(false)

// Computed
const isResultsModalVisible = computed<boolean>(() => {
  const shouldShow = isLastRound.value && totalResults.value.length > 0 && isRoundComplete.value
  console.log('Modal visibility check:', {
    isLastRound: isLastRound.value,
    hasResults: totalResults.value.length > 0,
    isRoundComplete: isRoundComplete.value,
    shouldShow,
  })
  return shouldShow
})

// Watchers
watch(
  horses,
  (newHorses) => {
    if (newHorses.length > 0) {
      isHorseListVisible.value = true
    }
  },
  { immediate: true },
)

watch(
  [isLastRound, totalResults, isRoundComplete],
  ([isLast, results, isComplete]) => {
    console.log('Modal visibility conditions changed:', {
      isLastRound: isLast,
      hasResults: results.length > 0,
      isRoundComplete: isComplete,
    })
    if (isLast && results.length > 0 && isComplete) {
      console.log('Showing results modal')
      showResultsModal.value = true
    }
  },
  { immediate: true },
)

// Watch for new rounds to play sound
watch(isRoundInProgress, (inProgress) => {
  if (inProgress) {
    playHorseSound()
    if (!document.fullscreenElement) {
      toggleFullscreen()
    }
  } else {
    stopHorseSound()
  }
})

// Methods
const handleShowResultsMenu = (): void => {
  showResultsMenu.value = true
}

const handleCloseResultsModal = (): void => {
  showResultsModal.value = false
}

const handleCloseResultsMenu = (): void => {
  showResultsMenu.value = false
}

const handleHorseListToggle = (value: boolean): void => {
  isHorseListVisible.value = value
}

const toggleFullscreen = (): void => {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen()
    isFullscreen.value = true
  }
}
</script>

<style scoped>
.arena {
  height: 100vh;
  display: flex;
  flex-direction: column;

  &.is-fullscreen {
    background: var(--color-background);
  }

  .container {
    background: var(--color-background);
    padding: var(--spacing-lg);
    animation: fadeIn var(--transition-normal);
    flex: 1;
    display: flex;
    flex-direction: column;
    overflow: hidden;

    .content {
      display: grid;
      grid-template-columns: 1fr;
      gap: var(--spacing-lg);
      flex: 1;
      overflow: hidden;
      position: relative;

      @media (min-width: 64rem) {
        grid-template-columns: 18.75rem 1fr;
      }

      .race {
        background: var(--color-surface);
        border-radius: var(--border-radius-md);
        padding: var(--spacing-lg);
        animation: slideUp var(--transition-normal);
        scrollbar-width: auto;
        scrollbar-color: var(--color-text-secondary) transparent;

        @media (max-width: 48rem) {
          height: 60vh;
        }
      }
    }
  }

  @media (max-width: 48rem) {
    .container {
      padding: var(--spacing-md);
    }
  }
}

.footer {
  background: var(--color-surface);
  padding: var(--spacing-xs);
  display: flex;
  align-items: center;
  justify-content: center;
  height: 5vh;

  &__text {
    color: var(--color-text-secondary);
    font-size: var(--font-size-sm);
  }
}
</style>
