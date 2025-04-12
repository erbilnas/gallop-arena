<template>
  <button
    :disabled="disabled"
    class="button"
    :class="[
      { 'button--disabled': disabled },
      { 'button--primary': primary },
      { 'button--icon': hasIcon },
      { 'button--xs': size === 'xs' },
      { 'button--small': size === 'small' },
      { 'button--large': size === 'large' },
    ]"
    @click="$emit('click')"
  >
    <span v-if="icon" class="button__icon">{{ icon }}</span>
    <slot></slot>
  </button>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  disabled?: boolean
  primary?: boolean
  icon?: string
  size?: 'xs' | 'small' | 'medium' | 'large'
}>()

defineEmits<{
  (e: 'click'): void
}>()

const hasIcon = computed(() => props.icon !== undefined)
</script>

<style scoped>
.button {
  display: flex;
  align-items: center;
  gap: var(--spacing-xs);
  padding: var(--spacing-sm) var(--spacing-md);
  background: var(--color-surface);
  color: var(--color-text);
  border: none;
  border-radius: var(--border-radius-md);
  cursor: pointer;
  font-weight: var(--font-weight-medium);
  transition: all var(--transition-normal);
  min-width: 160px;
  justify-content: center;
  box-shadow: var(--shadow-sm);
  font-family: var(--font-family-primary);
  font-size: var(--font-size-base);
}

.button:hover:not(.button--disabled) {
  transform: translateY(-2px);
  box-shadow: var(--shadow-md);
}

.button:active:not(.button--disabled) {
  transform: translateY(1px);
  box-shadow: var(--shadow-sm);
}

.button--primary {
  background: linear-gradient(135deg, var(--color-primary) 0%, var(--color-primary-dark) 100%);
}

.button__icon {
  font-size: var(--font-size-lg);
}

.button--disabled {
  opacity: 0.5;
  cursor: not-allowed;
  background: var(--color-surface);
}

.button--xs {
  padding: var(--spacing-xxs) var(--spacing-xs);
  min-width: auto;
  font-size: var(--font-size-xs);
  gap: var(--spacing-xxs);
}

.button--small {
  padding: var(--spacing-xs) var(--spacing-sm);
  min-width: auto;
  font-size: var(--font-size-sm);
}

.button--large {
  padding: var(--spacing-md) var(--spacing-lg);
  min-width: 180px;
  font-size: var(--font-size-lg);
}

@media (max-width: 768px) {
  .button {
    padding: var(--spacing-xs) var(--spacing-sm);
    min-width: 140px;
    font-size: var(--font-size-sm);
  }
}

@media (max-width: 480px) {
  .button {
    width: 100%;
  }
}
</style>
