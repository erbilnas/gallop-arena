<template>
  <div class="race-title-container">
    <h3 class="race-title">
      <BaseBadge size="small" success>Round {{ round }}</BaseBadge>
      <BaseBadge size="small" info>{{ distance }}m</BaseBadge>

      <p class="hover-info">ℹ️ Hover over horses to see their stats</p>
    </h3>
  </div>
</template>

<script setup lang="ts">
import { BaseBadge } from '@/components/common'
import { ref } from 'vue'

defineProps<{
  round: number
  distance: number
}>()

const isHorseListVisible = ref<boolean>(true)

const toggleHorseList = (): void => {
  isHorseListVisible.value = !isHorseListVisible.value
  // Emit the event to parent component
  emit('toggle-horse-list', isHorseListVisible.value)
}

const emit = defineEmits<{
  (e: 'toggle-horse-list', value: boolean): void
}>()

defineExpose({
  isHorseListVisible,
  toggleHorseList,
})
</script>

<style scoped>
.race-title-container {
  display: flex;
  margin-bottom: var(--spacing-lg);
}

.race-title {
  display: flex;
  gap: var(--spacing-md);
  align-items: center;
  color: var(--color-text);
  font-family: var(--font-family-primary);
}

.hover-info {
  font-size: 0.875rem;
  color: var(--color-text-secondary);
  margin: 0;
  opacity: 0.8;
}

.horse-list-toggle {
  min-width: auto;
}

@media (max-width: 768px) {
  .race-title {
    flex-direction: column;
    align-items: flex-start;
  }
}
</style>
