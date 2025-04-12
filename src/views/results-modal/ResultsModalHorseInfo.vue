<script setup lang="ts">
import type { Horse } from '@/types'

interface Props {
  horse: Horse
}

const props = defineProps<Props>()
</script>

<template>
  <div class="horse-info">
    <div class="horse-info__color" :style="{ backgroundColor: props.horse.color }"></div>
    <span class="horse-info__name">{{ props.horse.name }}</span>
  </div>
</template>

<style lang="css" scoped>
.horse-info {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
}

.horse-info__color {
  width: 16px;
  height: 16px;
  border-radius: var(--border-radius-full);
  box-shadow: var(--shadow-sm);
}

.horse-info__name {
  color: var(--color-text);
}
</style>
