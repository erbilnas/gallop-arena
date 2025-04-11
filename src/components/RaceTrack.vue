<template>
  <div class="race-track">
    <div class="track-background">
      <div class="track-lane" v-for="horse in horses" :key="horse.id">
        <div
          class="horse"
          :style="{
            backgroundColor: horse.color,
            left: `${horsePositions[horse.id] || 0}px`,
          }"
        >
          <div class="horse-content">
            <div class="horse-name">{{ horse.name }}</div>
            <div class="horse-icon">🐎</div>
          </div>
        </div>
      </div>
    </div>
    <div class="finish-line">
      <div class="finish-flag"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'

interface Horse {
  id: number
  name: string
  color: string
}

interface Props {
  horses: Horse[]
  horsePositions: Record<number, number>
}

defineProps<Props>()
</script>

<style scoped>
.race-track {
  position: relative;
  width: 100%;
  height: 1600px;
  overflow: auto;
}

.track-background {
  position: absolute;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.track-lane {
  height: 80px;
  padding: 20px 0 0 20px;
  border-bottom: 2px dashed rgba(255, 255, 255, 0.2);
}

.finish-line {
  position: absolute;
  right: 150px;
  top: 0;
  bottom: 0;
  width: 6px;
  background: linear-gradient(90deg, transparent 0%, #ff4444 50%, transparent 100%);
  animation: finishLinePulse 1s infinite;
}

.finish-flag {
  position: absolute;
  right: 150px;
  top: 0;
  width: 40px;
  height: 40px;
  background: linear-gradient(45deg, #ff4444 0%, #ff8888 100%);
  clip-path: polygon(0 0, 100% 0, 100% 100%, 0 0);
  transform-origin: right;
  animation: flagWave 1s infinite;
}

.horse {
  position: absolute;
  width: 140px;
  height: 50px;
  border-radius: 25px;
  transition: left 0.1s linear;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  animation: horsePulse 1s infinite;
  transform: translateX(0);
  will-change: left;
}

.horse-content {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 0 15px;
}

.horse-name {
  color: white;
  font-weight: 600;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
  font-size: 1.1em;
}

.horse-icon {
  font-size: 1.4em;
  animation: horseRun 0.3s infinite;
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
  .race-track {
    height: 700px;
  }

  .horse {
    width: 120px;
    height: 45px;
  }

  .horse-name {
    font-size: 1em;
  }
}
</style>
