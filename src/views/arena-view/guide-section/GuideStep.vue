<script setup lang="ts">
interface Props {
  number: number
  title: string
  description: string
  items: readonly string[]
}

defineProps<Props>()
</script>

<template>
  <div class="step">
    <div class="step__number">{{ number }}</div>
    <div class="step__content">
      <h3 class="step__title">{{ title }}</h3>
      <p class="step__description">{{ description }}</p>
      <ul class="step__list">
        <li class="step__item" v-for="(item, itemIndex) in items" :key="itemIndex">{{ item }}</li>
      </ul>
    </div>
  </div>
</template>

<style lang="css" scoped>
.step {
  display: flex;
  gap: var(--spacing-lg);
  align-items: flex-start;
  background: rgba(255, 255, 255, 0.05);
  padding: var(--spacing-lg);
  border-radius: var(--border-radius-md);
  transition: transform var(--transition-normal);

  &:hover {
    transform: translateX(5px);
  }
}

.step__number {
  background: var(--color-primary);
  color: var(--color-text);
  width: 36px;
  height: 36px;
  border-radius: var(--border-radius-full);
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: var(--font-weight-bold);
  font-size: var(--font-size-lg);
  flex-shrink: 0;
}

.step__content {
  flex: 1;
}

.step__title {
  color: var(--color-text);
  margin-bottom: var(--spacing-sm);
  font-size: var(--font-size-xl);
  font-weight: var(--font-weight-medium);
}

.step__description {
  color: var(--color-text-secondary);
  line-height: 1.6;
  margin-bottom: var(--spacing-sm);
}

.step__list {
  list-style-type: none;
  padding: 0;
  margin: 0;
}

.step__item {
  color: var(--color-text-secondary);
  margin-bottom: var(--spacing-xs);
  padding-left: var(--spacing-xl);
  position: relative;

  &::before {
    content: '•';
    color: var(--color-primary);
    position: absolute;
    left: var(--spacing-xs);
  }
}
</style>
