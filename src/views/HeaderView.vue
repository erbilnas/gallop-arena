<script setup lang="ts">
import { BaseButton } from '@/components/common'
import { useUIStore } from '@/stores'
import { storeToRefs } from 'pinia'

const uiStore = useUIStore()
const { buttons } = storeToRefs(uiStore)
</script>

<template>
  <div class="header-controls" data-test="header-controls">
    <BaseButton
      v-for="button in buttons"
      :key="button.id"
      v-bind="button"
      @click="button.action"
      size="small"
      primary
      :data-test="`header-button-${button.id}`"
    >
      {{ button.text }}
    </BaseButton>
  </div>
</template>

<style lang="css" scoped>
.header-controls {
  background: var(--color-surface);
  padding: var(--spacing-xs);
  animation: fadeIn 0.5s ease-out;
  display: flex;
  gap: var(--spacing-sm);
  justify-content: center;
}
</style>
