<template>
  <div class="race-track">
    <div class="track-background">
      <div class="track-lane" v-for="horse in horses" :key="horse.id">
        <RaceHorse
          :id="horse.id"
          :name="horse.name"
          :color="horse.color"
          :position="horsePositions[horse.id] || 0"
          :speed="horseSpeeds[horse.id]"
        />
      </div>

      <div class="finish-line"></div>
      <div class="finish-flag"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import RaceHorse from './RaceHorse.vue'

interface Horse {
  id: number
  name: string
  color: string
  condition: number
}

interface Props {
  horses: Horse[]
  horsePositions: Record<number, number>
}

const props = defineProps<Props>()

// Calculate speed for each horse based on their position change
const horseSpeeds = computed(() => {
  const speeds: Record<number, number> = {}
  props.horses.forEach((horse) => {
    const position = props.horsePositions[horse.id] || 0
    // Convert position to speed in km/h (assuming 1px = 1m and 30ms update interval)
    speeds[horse.id] = Math.round((position * 120) / 1000) // Convert to km/h
  })
  return speeds
})
</script>

<style scoped>
.race-track {
  position: relative;
  max-width: 1600px;
  height: 90%;
  overflow-x: auto;
  background-color: var(--color-background);
  border-radius: var(--border-radius-md);

  /* Modern scrollbar styling */
  scrollbar-width: thin;
  scrollbar-color: var(--color-text-secondary) var(--color-surface);
}

.track-background {
  position: absolute;
  min-width: 1600px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-image: url('@/assets/images/race-track-bg.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  border-radius: var(--border-radius-md);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  opacity: 0.9;
}

.track-lane {
  height: 70px;
  border-bottom: 2px dashed var(--color-border);
  width: 100%;
  max-width: 1600px;
  position: relative;
  padding: var(--spacing-xs);
  background-color: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(0.25rem);
  z-index: 0;
}

.finish-line {
  position: absolute;
  right: calc(50% - 400px + 150px);
  top: 0;
  bottom: 0;
  width: 6px;
  height: 100%;
  background: linear-gradient(90deg, transparent 0%, var(--color-error) 50%, transparent 100%);
  animation: finishLinePulse 1s infinite;
}

.finish-flag {
  position: absolute;
  right: calc(50% - 400px + 150px);
  top: 0;
  width: 40px;
  height: 40px;
  background: linear-gradient(45deg, var(--color-error) 0%, var(--color-accent-light) 100%);
  clip-path: polygon(0 0, 100% 0, 100% 100%, 0 0);
  transform-origin: right;
  animation: flagWave 1s infinite;
}

@keyframes finishLinePulse {
  0%,
  100% {
    opacity: 0.5;
  }
  50% {
    opacity: 1;
  }
}

@keyframes flagWave {
  0%,
  100% {
    transform: rotate(0deg);
  }
  50% {
    transform: rotate(10deg);
  }
}

@media (max-width: 768px) {
  .race-track {
    width: 100%;
    height: 500px;
  }

  .track-background {
    min-width: 100%;
  }
}
</style>
