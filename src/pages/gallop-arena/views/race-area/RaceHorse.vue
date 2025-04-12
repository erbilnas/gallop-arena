<template>
  <div
    class="horse"
    :style="{
      backgroundColor: props.color,
      left: `${props.position || 0}px`,
    }"
    @transitionstart="playHorseSound"
  >
    <div class="horse-content">
      <img :src="horseSprite" :alt="props.name" class="horse-icon" />
    </div>
    <div class="horse-tooltip">
      <div class="horse-name">{{ props.name }}</div>
      <div class="horse-speed">
        <span class="speed-icon">⚡</span>
        {{ props.speed }} km/h
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useSound } from '@/composables'
import { computed } from 'vue'

interface Props {
  id: number
  name: string
  color: string
  position: number
  speed: number
}

const props = defineProps<Props>()
const { playHorseSound } = useSound()

// Generate a random number between 1 and 21 for the horse sprite
const horseSprite = computed(() => {
  return new URL(`/src/assets/sprites/horse-${props.id}.png`, import.meta.url).href
})
</script>

<style scoped>
.horse {
  position: absolute;
  width: 50px;
  height: 50px;
  border-radius: var(--border-radius-lg);
  transition: left var(--transition-fast) linear;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: var(--shadow-lg);
  animation: horsePulse 1s infinite;
  transform: translateX(0);
  will-change: left;
  left: 0;
  background: linear-gradient(135deg, v-bind('props.color') 0%, rgba(255, 255, 255, 0.1) 100%);
  border: 2px solid rgba(255, 255, 255, 0.2);
  cursor: pointer;
  margin-left: var(--spacing-xs);
}

.horse-content {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
}

.horse-icon {
  width: 80%;
  height: 80%;
  object-fit: contain;
  animation: horseRun 0.3s infinite;
}

.horse-tooltip {
  position: absolute;
  top: 50%;
  left: 100%;
  transform: translateY(-50%);
  margin-left: var(--spacing-sm);
  background-color: rgba(0, 0, 0, 0.8);
  padding: var(--spacing-xs) var(--spacing-sm);
  border-radius: var(--border-radius-md);
  opacity: 0;
  transition: opacity var(--transition-fast) ease;
  pointer-events: none;
  min-width: 280px;
  text-align: center;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: var(--spacing-sm);
}

.horse-tooltip::after {
  content: '';
  position: absolute;
  top: 50%;
  left: 0;
  transform: translate(-100%, -50%);
  width: 0;
  height: 0;
  border-top: 8px solid transparent;
  border-bottom: 8px solid transparent;
  border-right: 8px solid rgba(0, 0, 0, 0.8);
}

.horse:hover .horse-tooltip {
  opacity: 1;
}

.horse-name {
  color: var(--color-text);
  font-weight: var(--font-weight-bold);
  text-shadow: var(--shadow-sm);
  font-size: var(--font-size-base);
  font-family: var(--font-family-primary);
}

.horse-speed {
  display: flex;
  align-items: center;
  gap: var(--spacing-xs);
  color: var(--color-text);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
  background-color: rgba(255, 255, 255, 0.1);
  padding: 2px 6px;
  border-radius: var(--border-radius-sm);
}

.speed-icon {
  font-size: var(--font-size-base);
}

@keyframes horsePulse {
  0%,
  100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.02);
  }
}

@keyframes horseRun {
  0%,
  100% {
    transform: translateX(0);
  }
  50% {
    transform: translateX(3px);
  }
}

@media (max-width: 768px) {
  .horse {
    width: 120px;
    height: 45px;
  }

  .horse-name {
    font-size: var(--font-size-base);
  }
}
</style>
