<template>
  <div class="horse-race-game">
    <div class="game-container">
      <RaceControls class="controls-section" @show-results="showResultsMenu = true" />

      <div class="content-wrapper">
        <HorseList v-if="horses.length > 0" :horses="horses" class="horse-list-section" />

        <div v-if="currentRace" class="race-section">
          <div class="race-info">
            <h3 class="race-title">
              <span class="round-badge">Round {{ currentRace.id }}</span>
              <span class="distance-badge">{{ currentRace.distance }}m</span>
            </h3>
            <RaceTrack :horses="currentRace.horses" :horse-positions="horsePositions" />
          </div>
        </div>
      </div>
    </div>

    <ResultsModal
      v-if="isLastRound && totalResults.length > 0 && isRoundComplete"
      :is-open="showResultsModal"
      :results="totalResults"
      :horses="horses"
      @close="closeResultsModal"
    />

    <ResultsSideMenu :is-open="showResultsMenu" :horses="horses" @close="closeResultsMenu" />
  </div>
</template>

<script setup lang="ts">
import { useRaceStore } from '../stores/raceStore'
import { storeToRefs } from 'pinia'
import { ref, watch } from 'vue'
import RaceTrack from './RaceTrack.vue'
import RaceControls from './RaceControls.vue'
import HorseList from './HorseList.vue'
import ResultsModal from './ResultsModal.vue'
import ResultsSideMenu from './ResultsSideMenu.vue'

const store = useRaceStore()
const { horses, currentRace, horsePositions, totalResults, isLastRound, isRoundComplete } =
  storeToRefs(store)
const showResultsModal = ref(false)
const showResultsMenu = ref(false)

// Watch for the last round to be completed
watch(
  [isLastRound, totalResults],
  ([isLast, results]) => {
    if (isLast && results.length > 0) {
      showResultsModal.value = true
    }
  },
  { immediate: true },
)

const closeResultsModal = () => {
  showResultsModal.value = false
}

const closeResultsMenu = () => {
  showResultsMenu.value = false
}
</script>

<style scoped>
.horse-race-game {
  height: 100vh;
  width: 100vw;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.game-container {
  background: rgba(30, 30, 30, 0.8);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(10px);
  padding: 24px;
  animation: fadeIn 0.5s ease-out;
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.content-wrapper {
  display: grid;
  grid-template-columns: 1fr;
  gap: 24px;
  margin-top: 24px;
  flex: 1;
  overflow: hidden;
}

.race-section {
  background: rgba(40, 40, 40, 0.6);
  border-radius: 12px;
  padding: 20px;
  animation: slideUp 0.5s ease-out;
}

.race-title {
  display: flex;
  gap: 12px;
  align-items: center;
  margin-bottom: 20px;
  color: #fff;
}

.round-badge {
  background: #4caf50;
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 0.9em;
  font-weight: 600;
}

.distance-badge {
  background: #2196f3;
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 0.9em;
  font-weight: 600;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (min-width: 1024px) {
  .content-wrapper {
    grid-template-columns: 300px 1fr;
  }
}

@media (max-width: 768px) {
  .game-container {
    padding: 16px;
  }

  .race-title {
    flex-direction: column;
    align-items: flex-start;
  }
}
</style>
