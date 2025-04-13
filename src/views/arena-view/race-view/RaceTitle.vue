<script setup lang="ts">
import { BaseAlert, BaseBadge, BaseCheckbox } from '@/components/common'
import { useUIStore } from '@/stores'
import { storeToRefs } from 'pinia'
import { ref } from 'vue'

defineProps<{
  round: number
  distance: number
}>()

const uiStore = useUIStore()
const { isAutoNext } = storeToRefs(uiStore)

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
  (e: 'update:auto-next', value: boolean): void
}>()

defineExpose({
  isHorseListVisible,
  toggleHorseList,
})
</script>

<template>
  <div class="race-title" data-test="race-title">
    <div class="race-title__header" data-test="race-title-header">
      <h3 class="race-title__heading" data-test="race-title-heading">
        <BaseBadge size="small" success data-test="round-badge">Round {{ round }}</BaseBadge>
        <BaseBadge size="small" info data-test="distance-badge">{{ distance }}m</BaseBadge>
      </h3>

      <BaseCheckbox
        v-model="isAutoNext"
        label="Auto Next Round"
        data-test="auto-next-checkbox"
        @update:modelValue="(value) => emit('update:auto-next', value)"
      />
    </div>

    <BaseAlert
      v-if="isAlertVisible"
      type="info"
      message="Hover over horses to see their stats"
      size="small"
      class="race-title__alert"
      closable
      data-test="stats-alert"
      @close="handleAlertClose"
    />
  </div>
</template>

<style lang="css" scoped>
.race-title {
  display: flex;
  flex-direction: column;
}

.race-title__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--spacing-md);
}

.race-title__heading {
  display: flex;
  gap: var(--spacing-md);
}
</style>
