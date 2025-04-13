<script setup lang="ts">
import { BaseTooltip } from '@/components'
import { computed } from 'vue'

interface Props {
  id: number
  name: string
  color: string
  position: number
  speed: number
}

const props = defineProps<Props>()

// Generate a random number between 1 and 21 for the horse sprite
const horseSprite = computed(() => {
  return new URL(`/src/assets/sprites/horse-${props.id}.png`, import.meta.url).href
})
</script>

<template>
  <div
    class="race-horse"
    :style="{
      backgroundColor: props.color,
      left: `${props.position || 0}px`,
      transform: `translateX(${props.position || 0}px)`,
    }"
    data-test="race-horse"
  >
    <div class="race-horse__content" data-test="horse-animation">
      <img :src="horseSprite" :alt="props.name" class="race-horse__icon" data-test="horse-sprite" />
    </div>

    <BaseTooltip
      :content="props.name"
      :secondary-content="`${props.speed} km/h`"
      secondary-icon="⚡"
      data-test="horse-tooltip"
      class="race-horse__tooltip"
    />
  </div>
</template>

<style lang="css" scoped>
.race-horse {
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

.race-horse__content {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
}

.race-horse__icon {
  width: 80%;
  height: 80%;
  object-fit: contain;
  animation: horseRun 0.3s infinite;
}

.race-horse:hover :deep(.tooltip) {
  opacity: 1;
}

.race-horse__tooltip {
  pointer-events: auto;
}
</style>
