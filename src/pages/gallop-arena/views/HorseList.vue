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
      <HorseCard
        v-for="horse in sortedHorses"
        :key="horse.id"
        :horse="horse"
        :is-selected="isHorseSelected(horse.id)"
      />

      <div class="scroll-hint">
        <span class="scroll-icon">🖱️</span>
        Scroll or drag to see all horses
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import HorseCard from '@/components/HorseCard.vue'
import { useRaceStore } from '@/stores/raceStore'
import { storeToRefs } from 'pinia'
import { computed, ref } from 'vue'

interface Horse {
  id: number
  name: string
  color: string
  condition: number
}

const props = defineProps<{
  horses: Horse[]
}>()

const store = useRaceStore()
const { currentRace } = storeToRefs(store)

const isHorseSelected = (horseId: number): boolean => {
  return currentRace.value?.horses.some((horse) => horse.id === horseId) ?? false
}

const sortedHorses = computed(() => {
  return [...props.horses].sort((a, b) => {
    const aSelected = isHorseSelected(a.id)
    const bSelected = isHorseSelected(b.id)

    if (aSelected && !bSelected) return -1
    if (!aSelected && bSelected) return 1
    return 0
  })
})

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

@media (max-width: 768px) {
  .horse-grid {
    grid-template-columns: 1fr;
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
