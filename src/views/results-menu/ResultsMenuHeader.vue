<script setup lang="ts">
import { BaseButton } from '@/components'

defineEmits<{
  (e: 'close'): void
}>()
</script>

<template>
  <div class="results-menu-header">
    <h2>🏆 Race Results</h2>

    <BaseButton class="close-button" @click="$emit('close')" size="small">Close</BaseButton>
  </div>
</template>

<style lang="css" scoped>
.results-menu-header {
  padding: 20px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.results-menu-header h2 {
  color: #fff;
  margin: 0;
  font-size: 1.5em;
}
</style>
