<script setup lang="ts">
interface Props {
  content: string
  secondaryContent?: string
  secondaryIcon?: string
  position?: 'left' | 'right' | 'top' | 'bottom'
}

const props = withDefaults(defineProps<Props>(), {
  position: 'right',
})
</script>

<template>
  <div class="tooltip" :class="[`tooltip--${props.position}`]">
    <div class="tooltip__content">
      <div class="tooltip__primary">{{ props.content }}</div>
      <div v-if="props.secondaryContent" class="tooltip__secondary">
        <span v-if="props.secondaryIcon" class="tooltip__icon">{{ props.secondaryIcon }}</span>
        {{ props.secondaryContent }}
      </div>
    </div>
  </div>
</template>

<style lang="css" scoped>
.tooltip {
  position: absolute;
  background-color: rgba(0, 0, 0, 0.8);
  padding: var(--spacing-xs) var(--spacing-sm);
  border-radius: var(--border-radius-md);
  opacity: 0;
  transition: opacity var(--transition-fast) ease;
  pointer-events: none;
  min-width: 280px;
  text-align: center;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: var(--spacing-sm);
}

.tooltip--right {
  top: 50%;
  left: 100%;
  transform: translateY(-50%);
  margin-left: var(--spacing-sm);
}

.tooltip--right::after {
  content: '';
  position: absolute;
  top: 50%;
  left: 0;
  transform: translate(-100%, -50%);
  width: 0;
  height: 0;
  border-top: 8px solid transparent;
  border-bottom: 8px solid transparent;
  border-right: 8px solid rgba(0, 0, 0, 0.8);
}

.tooltip__content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  gap: var(--spacing-sm);
}

.tooltip__primary {
  color: var(--color-text);
  font-weight: var(--font-weight-bold);
  text-shadow: var(--shadow-sm);
  font-size: var(--font-size-base);
  font-family: var(--font-family-primary);
}

.tooltip__secondary {
  display: flex;
  align-items: center;
  gap: var(--spacing-xs);
  color: var(--color-text);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
  background-color: rgba(255, 255, 255, 0.1);
  padding: 2px 6px;
  border-radius: var(--border-radius-sm);
}

.tooltip__icon {
  font-size: var(--font-size-base);
}
</style>
