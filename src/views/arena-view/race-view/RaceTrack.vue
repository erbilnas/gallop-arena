<script setup lang="ts">
import type { Horse } from '@/types'
import { computed } from 'vue'
import RaceHorse from './RaceHorse.vue'

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

<template>
  <div class="race-track" data-test="race-track">
    <div class="race-track__background">
      <div class="race-track__lane" v-for="horse in horses" :key="horse.id" data-test="race-lane">
        <RaceHorse
          :id="horse.id"
          :name="horse.name"
          :color="horse.color"
          :position="horsePositions[horse.id] || 0"
          :speed="horseSpeeds[horse.id]"
          data-test="race-horse"
        />
      </div>

      <div class="race-track__finish-line" data-test="finish-line"></div>
      <div class="race-track__finish-flag" data-test="finish-flag"></div>
    </div>
  </div>
</template>

<style lang="css" scoped>
.race-track {
  position: relative;
  max-width: 1600px;
  height: 75%;
  overflow-x: auto;
  background-color: var(--color-background);
  border-radius: var(--border-radius-md);

  /* Modern scrollbar styling */
  scrollbar-width: thin;
  scrollbar-color: var(--color-text-secondary) var(--color-surface);
}

.race-track__background {
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

.race-track__lane {
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

.race-track__finish-line {
  position: absolute;
  right: calc(50% - 400px + 150px);
  top: 0;
  bottom: 0;
  width: 6px;
  height: 100%;
  background: linear-gradient(90deg, transparent 0%, var(--color-error) 50%, transparent 100%);
  animation: finishLinePulse 1s infinite;
}

.race-track__finish-flag {
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
</style>
