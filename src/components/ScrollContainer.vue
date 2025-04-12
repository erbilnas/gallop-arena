<script setup lang="ts">
import { ref } from 'vue'

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

<template>
  <div
    class="scroll-container"
    ref="scrollContainer"
    @mousedown="startDrag"
    @mousemove="onDrag"
    @mouseup="stopDrag"
    @mouseleave="stopDrag"
  >
    <slot></slot>
  </div>
</template>

<style lang="css" scoped>
.scroll-container {
  max-height: 100%;
  overflow-y: auto;
  scrollbar-width: none;
  -ms-overflow-style: none;
  cursor: grab;
  user-select: none;
  height: 100%;
}

.scroll-container:active {
  cursor: grabbing;
}
</style>
