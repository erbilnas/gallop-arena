<template>
  <div v-if="isOpen" class="overlay" @click="closeMenu">
    <div class="side-menu" :class="{ 'side-menu-open': isOpen }" @click.stop>
      <div class="side-menu-header">
        <h2>🏆 Race Results</h2>
        <button class="close-button" @click="closeMenu">×</button>
      </div>
      <div class="side-menu-content">
        <div v-for="round in raceSchedule.rounds" :key="round.id" class="round-results">
          <h3 class="round-title">Round {{ round.id }} - {{ round.distance }}m</h3>
          <div v-if="round.results" class="results-list">
            <div
              v-for="result in round.results"
              :key="result.horseId"
              class="result-item"
              :class="{ podium: result.position <= 3 }"
            >
              <div class="position">{{ result.position }}</div>
              <div class="horse-name">{{ getHorseName(result.horseId) }}</div>
              <div class="time">{{ result.time }}s</div>
            </div>
          </div>
          <div v-else class="no-results">No results yet</div>
        </div>

        <div v-if="totalResults.length > 0" class="total-results">
          <h3 class="total-title">🏆 Total Results</h3>
          <div class="results-list">
            <div
              v-for="result in totalResults"
              :key="result.horseId"
              class="result-item"
              :class="{ podium: result.position <= 3 }"
            >
              <div class="position">{{ result.position }}</div>
              <div class="horse-name">{{ getHorseName(result.horseId) }}</div>
              <div class="points">{{ result.totalPoints }} pts</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue'
import { useRaceStore } from '../stores/raceStore'
import { storeToRefs } from 'pinia'

const store = useRaceStore()
const { raceSchedule, totalResults } = storeToRefs(store)

interface Props {
  isOpen: boolean
  horses: Array<{ id: number; name: string }>
}

const props = defineProps<Props>()
const emit = defineEmits(['close'])

const getHorseName = (horseId: number): string => {
  const horse = props.horses.find((h) => h.id === horseId)
  return horse ? horse.name : 'Unknown Horse'
}

const closeMenu = () => {
  emit('close')
}
</script>

<style scoped>
.overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 999;
  animation: fadeIn 0.3s ease-out;
}

.side-menu {
  position: fixed;
  right: -400px;
  top: 0;
  bottom: 0;
  width: 400px;
  background: rgba(30, 30, 30, 0.95);
  box-shadow: -4px 0 20px rgba(0, 0, 0, 0.3);
  transition: right 0.3s ease-out;
  z-index: 1000;
  display: flex;
  flex-direction: column;
}

.side-menu-open {
  right: 0;
}

.side-menu-header {
  padding: 20px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.side-menu-header h2 {
  color: #fff;
  margin: 0;
  font-size: 1.5em;
}

.close-button {
  background: none;
  border: none;
  color: #fff;
  font-size: 1.5em;
  cursor: pointer;
  padding: 0;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: background-color 0.2s;
}

.close-button:hover {
  background-color: rgba(255, 255, 255, 0.1);
}

.side-menu-content {
  flex: 1;
  overflow-y: auto;
  padding: 20px;
}

.round-results,
.total-results {
  margin-bottom: 30px;
}

.round-title,
.total-title {
  color: #fff;
  margin: 0 0 15px 0;
  font-size: 1.2em;
  padding-bottom: 10px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.results-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.result-item {
  display: flex;
  align-items: center;
  gap: 15px;
  padding: 10px 15px;
  background: rgba(50, 50, 50, 0.8);
  border-radius: 8px;
  color: #fff;
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
  min-width: 30px;
  font-weight: 600;
}

.horse-name {
  flex: 1;
}

.time,
.points {
  font-family: monospace;
  color: #aaa;
}

.no-results {
  color: #aaa;
  text-align: center;
  padding: 20px;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@media (max-width: 768px) {
  .side-menu {
    width: 100%;
    right: -100%;
  }
}
</style>
