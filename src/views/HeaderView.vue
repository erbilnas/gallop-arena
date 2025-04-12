<script setup lang="ts">
import { BaseButton } from '@/components/common'
import { useRaceControls } from '@/composables'

const { buttons } = useRaceControls()
</script>

<template>
  <div class="header-controls">
    <BaseButton
      v-for="button in buttons"
      :key="button.id"
      v-bind="button"
      @click="button.action"
      size="small"
      primary
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
