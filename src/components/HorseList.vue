<template>
  <div
    class="horse-list"
    ref="scrollContainer"
    @mousedown="startDrag"
    @mousemove="onDrag"
    @mouseup="stopDrag"
    @mouseleave="stopDrag"
  >
    <div class="scroll-hint">
      <span class="scroll-icon">🖱️</span>
      Scroll or drag to see all horses
    </div>
    <h3 class="list-title">
      <span class="title-icon">🐴</span>
      Available Horses ({{ horses.length }})
    </h3>
    <div class="horse-grid">
      <div
        v-for="horse in horses"
        :key="horse.id"
        class="horse-item"
        :style="{ '--delay': `${horse.id * 0.05}s` }"
      >
        <div class="horse-header">
          <div class="horse-color" :style="{ backgroundColor: horse.color }"></div>
          <div class="horse-name">{{ horse.name }}</div>
        </div>
        <div class="horse-condition">
          <div class="condition-label">Condition</div>
          <div class="condition-bar">
            <div
              class="condition-fill"
              :style="{
                width: `${horse.condition}%`,
                background: getConditionColor(horse.condition),
              }"
            ></div>
            <span class="condition-value">{{ horse.condition }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, ref } from 'vue'

interface Horse {
  id: number
  name: string
  color: string
  condition: number
}

defineProps<{
  horses: Horse[]
}>()

const scrollContainer = ref<HTMLElement | null>(null)
const isDragging = ref(false)
const startY = ref(0)
const scrollTop = ref(0)

const startDrag = (e: MouseEvent) => {
  if (!scrollContainer.value) return
  isDragging.value = true
  startY.value = e.pageY - scrollContainer.value.offsetTop
  scrollTop.value = scrollContainer.value.scrollTop
  scrollContainer.value.style.cursor = 'grabbing'
}

const onDrag = (e: MouseEvent) => {
  if (!isDragging.value || !scrollContainer.value) return
  e.preventDefault()
  const y = e.pageY - scrollContainer.value.offsetTop
  const walk = (y - startY.value) * 2
  scrollContainer.value.scrollTop = scrollTop.value - walk
}

const stopDrag = () => {
  if (!scrollContainer.value) return
  isDragging.value = false
  scrollContainer.value.style.cursor = 'grab'
}

const getConditionColor = (condition: number): string => {
  if (condition >= 80) return '#4caf50'
  if (condition >= 60) return '#ff9800'
  return '#f44336'
}
</script>

<style scoped>
.horse-list {
  background: rgba(40, 40, 40, 0.6);
  border-radius: 12px;
  padding: 20px;
  animation: fadeIn 0.5s ease-out;
  max-height: 100%;
  overflow-y: auto;
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE and Edge */
  cursor: grab;
  user-select: none;
}

.horse-list:active {
  cursor: grabbing;
}

.horse-list::-webkit-scrollbar {
  display: none; /* Chrome, Safari, Opera */
}

.scroll-hint {
  display: flex;
  align-items: center;
  gap: 8px;
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.9em;
  margin-bottom: 15px;
  padding: 8px 12px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 6px;
  animation: fadeIn 0.5s ease-out;
}

.scroll-icon {
  font-size: 1.2em;
}

.list-title {
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

.horse-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 15px;
  padding-right: 10px;
  position: relative;
}

.horse-grid::after {
  content: 'Scroll with mouse wheel';
  position: absolute;
  bottom: -25px;
  right: 10px;
  color: rgba(255, 255, 255, 0.5);
  font-size: 0.8em;
  font-style: italic;
}

.horse-item {
  background: rgba(50, 50, 50, 0.8);
  border-radius: 8px;
  padding: 15px;
  animation: slideIn 0.3s ease-out;
  animation-fill-mode: both;
  transition: transform 0.2s ease;
}

.horse-item:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}

.horse-header {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 10px;
}

.horse-color {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

.horse-name {
  color: #fff;
  font-weight: 500;
  font-size: 1.1em;
}

.horse-condition {
  margin-top: 10px;
}

.condition-label {
  color: #aaa;
  font-size: 0.9em;
  margin-bottom: 5px;
}

.condition-bar {
  height: 20px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  overflow: hidden;
  position: relative;
}

.condition-fill {
  height: 100%;
  border-radius: 10px;
  transition: width 0.5s ease;
}

.condition-value {
  position: absolute;
  right: 8px;
  top: 50%;
  transform: translateY(-50%);
  color: #fff;
  font-size: 0.8em;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.5);
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
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (max-width: 768px) {
  .horse-grid {
    grid-template-columns: 1fr;
  }

  .horse-item {
    padding: 12px;
  }
}

/* Modern scrollbar styling */
.horse-list::-webkit-scrollbar {
  width: 8px;
}

.horse-list::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 4px;
}

.horse-list::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.2);
  border-radius: 4px;
  transition: background 0.2s ease;
}

.horse-list::-webkit-scrollbar-thumb:hover {
  background: rgba(255, 255, 255, 0.3);
}
</style>
