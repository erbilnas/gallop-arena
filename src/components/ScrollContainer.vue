<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'

interface ScrollContainerProps {
  maxHeight?: string
  scrollAmount?: number
}

interface ScrollContainerEmits {
  (e: 'scroll', position: number): void
}

const props = withDefaults(defineProps<ScrollContainerProps>(), {
  maxHeight: '100%',
  scrollAmount: 50,
})

const emit = defineEmits<ScrollContainerEmits>()

const scrollContainer = ref<HTMLElement | null>(null)
const isDragging = ref<boolean>(false)
const startY = ref<number>(0)
const scrollTop = ref<number>(0)

const startDrag = (e: MouseEvent): void => {
  if (!scrollContainer.value) return
  isDragging.value = true
  startY.value = e.pageY
  scrollTop.value = scrollContainer.value.scrollTop
  scrollContainer.value.style.cursor = 'grabbing'
}

const onDrag = (e: MouseEvent): void => {
  if (!isDragging.value || !scrollContainer.value) return
  e.preventDefault()
  const y = e.pageY
  const walk = (y - startY.value) * 2
  scrollContainer.value.scrollTop = scrollTop.value - walk
  emit('scroll', scrollContainer.value.scrollTop)
}

const stopDrag = (): void => {
  if (!scrollContainer.value) return
  isDragging.value = false
  scrollContainer.value.style.cursor = 'grab'
}

// Keyboard navigation
const handleKeyDown = (e: KeyboardEvent): void => {
  if (!scrollContainer.value) return

  switch (e.key) {
    case 'ArrowUp':
      e.preventDefault()
      scrollContainer.value.scrollTop -= props.scrollAmount
      break
    case 'ArrowDown':
      e.preventDefault()
      scrollContainer.value.scrollTop += props.scrollAmount
      break
    case 'PageUp':
      e.preventDefault()
      scrollContainer.value.scrollTop -= props.scrollAmount * 2
      break
    case 'PageDown':
      e.preventDefault()
      scrollContainer.value.scrollTop += props.scrollAmount * 2
      break
    case 'Home':
      e.preventDefault()
      scrollContainer.value.scrollTop = 0
      break
    case 'End':
      e.preventDefault()
      scrollContainer.value.scrollTop = scrollContainer.value.scrollHeight
      break
  }
  emit('scroll', scrollContainer.value.scrollTop)
}

const handleScroll = (): void => {
  if (!scrollContainer.value) return
  emit('scroll', scrollContainer.value.scrollTop)
}

onMounted(() => {
  if (scrollContainer.value) {
    scrollContainer.value.style.cursor = 'grab'
    scrollContainer.value.addEventListener('mousedown', startDrag)
    scrollContainer.value.addEventListener('mousemove', onDrag)
    scrollContainer.value.addEventListener('mouseup', stopDrag)
    scrollContainer.value.addEventListener('mouseleave', stopDrag)
    scrollContainer.value.addEventListener('keydown', handleKeyDown)
    scrollContainer.value.addEventListener('scroll', handleScroll)
  }
})

onUnmounted(() => {
  if (scrollContainer.value) {
    scrollContainer.value.removeEventListener('mousedown', startDrag)
    scrollContainer.value.removeEventListener('mousemove', onDrag)
    scrollContainer.value.removeEventListener('mouseup', stopDrag)
    scrollContainer.value.removeEventListener('mouseleave', stopDrag)
    scrollContainer.value.removeEventListener('keydown', handleKeyDown)
    scrollContainer.value.removeEventListener('scroll', handleScroll)
  }
})
</script>

<template>
  <div
    ref="scrollContainer"
    class="scroll-container"
    :style="{ maxHeight: props.maxHeight }"
    tabindex="0"
  >
    <slot></slot>
  </div>
</template>

<style lang="css" scoped>
.scroll-container {
  max-height: 100%;
  overflow-y: auto;
  overflow-x: hidden;
  position: relative;
  scrollbar-width: none;
  -ms-overflow-style: none;
  cursor: grab;
  user-select: none;
  height: 100%;
  outline: none;
}

.scroll-container:focus-visible {
  outline: 2px solid var(--primary-color);
  outline-offset: 2px;
}

.scroll-container:active {
  cursor: grabbing;
}

/* Custom scrollbar for better visibility */
.scroll-container::-webkit-scrollbar {
  width: 8px;
}

.scroll-container::-webkit-scrollbar-track {
  background: var(--color-surface);
  border-radius: var(--border-radius-sm);
}

.scroll-container::-webkit-scrollbar-thumb {
  background-color: rgba(255, 255, 255, 0.2);
  border-radius: var(--border-radius-sm);
  border: 2px solid var(--color-surface);
}

.scroll-container::-webkit-scrollbar-thumb:hover {
  background-color: rgba(255, 255, 255, 0.3);
}
</style>
