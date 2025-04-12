<script setup lang="ts">
import { BaseAlert, BaseBadge } from '@/components/common'
import { ref } from 'vue'

defineProps<{
  round: number
  distance: number
}>()

const isHorseListVisible = ref<boolean>(true)
const isAlertVisible = ref<boolean>(true)

const toggleHorseList = (): void => {
  isHorseListVisible.value = !isHorseListVisible.value
  // Emit the event to parent component
  emit('toggle-horse-list', isHorseListVisible.value)
}

const handleAlertClose = (): void => {
  isAlertVisible.value = false
}

const emit = defineEmits<{
  (e: 'toggle-horse-list', value: boolean): void
}>()

defineExpose({
  isHorseListVisible,
  toggleHorseList,
})
</script>

<template>
  <div class="race-title">
    <h3 class="race-title__heading">
      <BaseBadge size="small" success>Round {{ round }}</BaseBadge>
      <BaseBadge size="small" info>{{ distance }}m</BaseBadge>
    </h3>

    <BaseAlert
      v-if="isAlertVisible"
      type="info"
      message="Hover over horses to see their stats"
      size="small"
      class="race-title__alert"
      closable
      @close="handleAlertClose"
    />
  </div>
</template>

<style lang="css" scoped>
.race-title {
  display: flex;
  flex-direction: column;
}

.race-title__heading {
  display: flex;
  gap: var(--spacing-md);
}
</style>
