<script setup lang="ts">
defineProps<{
  horseCount: number
}>()
</script>

<template>
  <h3 class="horse-list-header">
    <span class="horse-list-header__icon">🐴</span>
    <span class="horse-list-header__text"> Available Horses ({{ horseCount }}) </span>
  </h3>
</template>

<style lang="css" scoped>
.horse-list-header {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  color: var(--color-text);
  margin-bottom: var(--spacing-lg);
  font-size: var(--font-size-xl);
  font-weight: var(--font-weight-bold);
}

.horse-list-header__icon {
  font-size: var(--font-size-2xl);
}

.horse-list-header__text {
  font-family: var(--font-family-primary);
}
</style>
