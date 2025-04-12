<template>
  <div class="controls">
    <div class="container">
      <BaseButton
        @click="generateHorses"
        :disabled="isGenerateHorsesDisabled"
        icon="🐴"
        primary
        size="small"
      >
        Prepare Your Stable
      </BaseButton>

      <BaseButton
        @click="generateRaceSchedule"
        :disabled="isGenerateScheduleDisabled"
        icon="📅"
        primary
        size="small"
      >
        Generate Race Schedule
      </BaseButton>

      <BaseButton @click="startRace" :disabled="isStartRaceDisabled" icon="🏁" primary size="small">
        {{ isLastRound ? 'Finish Race' : 'Start Race' }}
      </BaseButton>

      <BaseButton
        @click="handleNextRound"
        :disabled="isNextRoundDisabled"
        icon="⏭️"
        primary
        size="small"
      >
        Next Round
      </BaseButton>

      <BaseButton @click="showResults" :disabled="isResultsDisabled" icon="📊" primary size="small">
        Results
      </BaseButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import { BaseButton } from '@/components/common'
import { useRaceStore } from '@/stores/raceStore'
import { storeToRefs } from 'pinia'
import { computed, defineEmits } from 'vue'

// Emits
const emit = defineEmits(['showResults'])

// Store
const store = useRaceStore()
const { generateHorses, generateRaceSchedule, startRace, nextRound } = store
const { horses, currentRace, isRaceInProgress, isRoundComplete, isLastRound } = storeToRefs(store)

// Computed
const isGenerateHorsesDisabled = computed(() => isRaceInProgress.value || horses.value.length > 0)
const isGenerateScheduleDisabled = computed(
  () => horses.value.length === 0 || isRaceInProgress.value || !!currentRace.value,
)
const isStartRaceDisabled = computed(
  () => !currentRace.value || isRaceInProgress.value || isRoundComplete.value,
)
const isNextRoundDisabled = computed(() => !isRoundComplete.value || isLastRound.value)
const isResultsDisabled = computed(() => horses.value.length === 0)

// Methods
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
  border-radius: var(--border-radius-md);
  padding: var(--spacing-xs);
  margin-bottom: var(--spacing-md);
  animation: fadeIn 0.5s ease-out;
  position: sticky;
  top: 0;
  z-index: 100;
  backdrop-filter: blur(8px);

  .container {
    display: flex;
    gap: 12px;
    flex-wrap: wrap;
    justify-content: center;
  }
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

    .container {
      gap: 8px;
    }
  }
}

@media (max-width: 480px) {
  .container {
    flex-direction: column;
  }
}
</style>
