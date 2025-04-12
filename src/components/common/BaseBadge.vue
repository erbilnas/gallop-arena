<template>
  <span
    class="badge"
    :class="[
      { 'badge--primary': primary },
      { 'badge--success': success },
      { 'badge--info': info },
      { 'badge--xs': size === 'xs' },
      { 'badge--small': size === 'small' },
      { 'badge--large': size === 'large' },
    ]"
  >
    <slot></slot>
  </span>
</template>

<script setup lang="ts">
defineProps<{
  primary?: boolean
  success?: boolean
  info?: boolean
  size?: 'xs' | 'small' | 'medium' | 'large'
}>()
</script>

<style scoped>
.badge {
  display: inline-flex;
  align-items: center;
  gap: var(--spacing-xxs);
  padding: var(--spacing-xxs) var(--spacing-sm);
  background: rgba(255, 255, 255, 0.1);
  color: var(--color-text);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: var(--border-radius-full);
  font-weight: var(--font-weight-medium);
  min-width: auto;
  justify-content: center;
  box-shadow: none;
  font-family: var(--font-family-primary);
  font-size: var(--font-size-sm);
  transition: all var(--transition-fast);
  backdrop-filter: blur(4px);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.badge--primary {
  background: rgba(76, 175, 80, 0.1);
  border-color: var(--color-primary);
  color: var(--color-primary);
}

.badge--success {
  background: rgba(76, 175, 80, 0.1);
  border-color: var(--color-success);
  color: var(--color-success);
}

.badge--info {
  background: rgba(33, 150, 243, 0.1);
  border-color: var(--color-info);
  color: var(--color-info);
}

.badge--xs {
  padding: var(--spacing-xxs) var(--spacing-xs);
  font-size: var(--font-size-xs);
  gap: var(--spacing-xxs);
}

.badge--small {
  padding: var(--spacing-xxs) var(--spacing-sm);
  font-size: var(--font-size-sm);
}

.badge--large {
  padding: var(--spacing-xs) var(--spacing-md);
  font-size: var(--font-size-base);
}

@media (max-width: 768px) {
  .badge {
    padding: var(--spacing-xxs) var(--spacing-xs);
    font-size: var(--font-size-xs);
  }
}

@media (max-width: 480px) {
  .badge {
    width: auto;
  }
}
</style>
