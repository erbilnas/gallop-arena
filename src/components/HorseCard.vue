<template>
  <div
    class="horse-item"
    :class="{ 'is-selected': isSelected }"
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
</template>

<script setup lang="ts">
interface Horse {
  id: number
  name: string
  color: string
  condition: number
}

defineProps<{
  horse: Horse
  isSelected?: boolean
}>()

const getConditionColor = (condition: number): string => {
  if (condition >= 80) return '#4caf50'
  if (condition >= 60) return '#ff9800'
  return '#f44336'
}
</script>

<style scoped>
.horse-item {
  background: rgba(50, 50, 50, 0.8);
  border-radius: 8px;
  padding: 15px;
  animation: slideIn 0.3s ease-out;
  animation-fill-mode: both;
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease,
    border-color 0.2s ease;
  border: 2px solid transparent;
}

.horse-item:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}

.horse-item.is-selected {
  border-color: #4caf50;
  box-shadow: 0 0 0 2px rgba(76, 175, 80, 0.3);
  background: rgba(50, 50, 50, 0.9);
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
  .horse-item {
    padding: 12px;
  }
}
</style>
