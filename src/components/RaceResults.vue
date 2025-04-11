<template>
  <div class="race-results">
    <h3 class="results-title">
      <span class="title-icon">🏆</span>
      Round Results
    </h3>
    <div class="results-container">
      <div
        v-for="(result, index) in results"
        :key="result.horseId"
        class="result-item"
        :class="{ podium: index < 3 }"
        :style="{ '--delay': `${index * 0.1}s` }"
      >
        <div class="position">
          <span class="position-number">{{ result.position }}</span>
          <span class="position-suffix">{{ getPositionSuffix(result.position) }}</span>
        </div>
        <div class="horse-info">
          <div class="horse-name">{{ getHorseName(result.horseId) }}</div>
          <div class="horse-time">{{ result.time }}s</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'

interface Horse {
  id: number
  name: string
}

interface RaceResult {
  horseId: number
  position: number
  time: number
}

interface Props {
  results: RaceResult[]
  horses: Horse[]
}

const props = defineProps<Props>()

const getHorseName = (horseId: number): string => {
  const horse = props.horses.find((h) => h.id === horseId)
  return horse ? horse.name : 'Unknown Horse'
}

const getPositionSuffix = (position: number): string => {
  const suffixes = ['st', 'nd', 'rd']
  const index = position - 1
  return index < 3 ? suffixes[index] : 'th'
}
</script>

<style scoped>
.race-results {
  background: rgba(40, 40, 40, 0.6);
  border-radius: 12px;
  padding: 20px;
  margin-top: 20px;
  animation: fadeIn 0.5s ease-out;
}

.results-title {
  display: flex;
  align-items: center;
  gap: 10px;
  color: #fff;
  margin-bottom: 20px;
  font-size: 1.2em;
}

.title-icon {
  font-size: 1.4em;
}

.results-container {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.result-item {
  display: flex;
  align-items: center;
  gap: 15px;
  padding: 12px 15px;
  background: rgba(50, 50, 50, 0.8);
  border-radius: 8px;
  animation: slideIn 0.3s ease-out;
  animation-fill-mode: both;
  transition: transform 0.2s ease;
}

.result-item:hover {
  transform: translateX(5px);
}

.podium {
  background: linear-gradient(90deg, rgba(50, 50, 50, 0.8) 0%, rgba(60, 60, 60, 0.9) 100%);
}

.podium:nth-child(1) {
  background: linear-gradient(90deg, rgba(255, 215, 0, 0.2) 0%, rgba(50, 50, 50, 0.8) 100%);
}

.podium:nth-child(2) {
  background: linear-gradient(90deg, rgba(192, 192, 192, 0.2) 0%, rgba(50, 50, 50, 0.8) 100%);
}

.podium:nth-child(3) {
  background: linear-gradient(90deg, rgba(205, 127, 50, 0.2) 0%, rgba(50, 50, 50, 0.8) 100%);
}

.position {
  display: flex;
  align-items: baseline;
  gap: 2px;
  min-width: 40px;
}

.position-number {
  font-size: 1.2em;
  font-weight: 600;
  color: #fff;
}

.position-suffix {
  font-size: 0.8em;
  color: #aaa;
}

.horse-info {
  flex: 1;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.horse-name {
  color: #fff;
  font-weight: 500;
}

.horse-time {
  color: #aaa;
  font-family: monospace;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateX(-20px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@media (max-width: 768px) {
  .race-results {
    padding: 15px;
  }

  .result-item {
    padding: 10px;
  }

  .horse-name {
    font-size: 0.9em;
  }
}
</style>
