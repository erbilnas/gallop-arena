<script setup lang="ts">
interface Props {
  title: string
  description: string
}

defineProps<Props>()
</script>

<template>
  <div class="game-mechanic">
    <h4 class="game-mechanic__title">{{ title }}</h4>
    <p class="game-mechanic__description">{{ description }}</p>
  </div>
</template>

<style lang="css" scoped>
.game-mechanic {
  background: rgba(255, 255, 255, 0.05);
  padding: var(--spacing-md);
  border-radius: var(--border-radius-sm);
  transition: transform var(--transition-normal);

  &:hover {
    transform: translateY(-5px);
  }
}

.game-mechanic__title {
  color: var(--color-text);
  margin-bottom: var(--spacing-sm);
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-medium);
}

.game-mechanic__description {
  color: var(--color-text-secondary);
  line-height: 1.5;
  font-size: var(--font-size-base);
}
</style>
