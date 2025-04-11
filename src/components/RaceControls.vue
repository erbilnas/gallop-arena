<template>
  <div class="controls">
    <div class="controls-container">
      <button
        @click="generateHorses"
        :disabled="isRaceInProgress || horses.length > 0"
        class="control-button"
        :class="{ 'button-disabled': isRaceInProgress || horses.length > 0 }"
      >
        <span class="button-icon">🐴</span>
        Generate Horses
      </button>
      <button
        @click="generateRaceSchedule"
        :disabled="horses.length === 0 || isRaceInProgress || currentRace"
        class="control-button"
        :class="{ 'button-disabled': horses.length === 0 || isRaceInProgress || currentRace }"
      >
        <span class="button-icon">📅</span>
        Generate Schedule
      </button>
      <button
        @click="startRace"
        :disabled="!currentRace || isRaceInProgress || isRoundComplete"
        class="control-button primary"
        :class="{ 'button-disabled': !currentRace || isRaceInProgress || isRoundComplete }"
      >
        <span class="button-icon">🏁</span>
        Start Race
      </button>
      <button
        @click="handleNextRound"
        :disabled="!isRoundComplete || isLastRound"
        class="control-button"
        :class="{ 'button-disabled': !isRoundComplete || isLastRound }"
      >
        <span class="button-icon">⏭️</span>
        Next Round
      </button>
      <button
        @click="showResults"
        :disabled="horses.length === 0"
        class="control-button"
        :class="{ 'button-disabled': horses.length === 0 }"
      >
        <span class="button-icon">📊</span>
        Results
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRaceStore } from '../stores/raceStore'
import { storeToRefs } from 'pinia'
import { defineEmits } from 'vue'

const emit = defineEmits(['showResults'])

const store = useRaceStore()
const { generateHorses, generateRaceSchedule, startRace, nextRound } = store

// Use storeToRefs to maintain reactivity
const { horses, currentRace, isRaceInProgress, isRoundComplete, isLastRound } = storeToRefs(store)

// Modify nextRound to start the race automatically
const handleNextRound = () => {
  nextRound()
  if (!isLastRound.value) {
    startRace()
  }
}

const showResults = () => {
  emit('showResults')
}
</script>

<style scoped>
.controls {
  background: rgba(40, 40, 40, 0.6);
  border-radius: 12px;
  padding: 20px;
  margin-bottom: 20px;
  animation: fadeIn 0.5s ease-out;
  position: sticky;
  top: 0;
  z-index: 100;
  backdrop-filter: blur(8px);
}

.controls-container {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  justify-content: center;
}

.control-button {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 20px;
  background: rgba(50, 50, 50, 0.8);
  color: #fff;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.3s ease;
  min-width: 160px;
  justify-content: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

.control-button:hover:not(.button-disabled) {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
}

.control-button:active:not(.button-disabled) {
  transform: translateY(1px);
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
}

.control-button.primary {
  background: linear-gradient(135deg, #4caf50 0%, #45a049 100%);
}

.button-icon {
  font-size: 1.2em;
}

.button-disabled {
  opacity: 0.5;
  cursor: not-allowed;
  background: rgba(50, 50, 50, 0.4);
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (max-width: 768px) {
  .controls {
    padding: 15px;
  }

  .controls-container {
    gap: 8px;
  }

  .control-button {
    padding: 10px 15px;
    min-width: 140px;
    font-size: 0.9em;
  }
}

@media (max-width: 480px) {
  .controls-container {
    flex-direction: column;
  }

  .control-button {
    width: 100%;
  }
}
</style>
