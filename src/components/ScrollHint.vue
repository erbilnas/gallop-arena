<script setup lang="ts"></script>

<template>
  <div class="scroll-hint">
    <span class="scroll-hint__icon">🖱️</span>
    <span>Scroll or drag to see all horses</span>
  </div>
</template>

<style lang="css" scoped>
.scroll-hint {
  display: flex;
  align-items: center;
  gap: var(--spacing-xs);
  color: var(--color-text);
  font-size: var(--font-size-sm);
  font-family: var(--font-family-primary);
  margin-bottom: var(--spacing-md);
  padding: var(--spacing-xs) var(--spacing-sm);
  background: var(--color-info);
  border-radius: var(--border-radius-md);
  animation: fadeIn var(--transition-normal);
}

.scroll-hint__icon {
  font-size: var(--font-size-md);
}
</style>
