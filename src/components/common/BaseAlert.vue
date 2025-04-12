<script setup lang="ts">
import { computed } from 'vue'

type AlertType = 'info' | 'success' | 'warning' | 'error'

const props = defineProps<{
  type?: AlertType
  message: string
  closable?: boolean
  size?: 'small' | 'medium' | 'large'
}>()

const emit = defineEmits<{
  (e: 'close'): void
}>()

const alertClasses = computed(() => ({
  'base-alert': true,
  [`base-alert--${props.type}`]: props.type,
  [`base-alert--${props.size}`]: props.size,
}))

const handleClose = (): void => {
  emit('close')
}
</script>

<template>
  <div :class="alertClasses" role="alert">
    <div class="base-alert__content">
      <span class="base-alert__icon">
        <slot name="icon">
          <span v-if="type === 'info'">ℹ️</span>
          <span v-else-if="type === 'success'">✅</span>
          <span v-else-if="type === 'warning'">⚠️</span>
          <span v-else-if="type === 'error'">❌</span>
        </slot>
      </span>
      <p class="base-alert__message">{{ message }}</p>
    </div>
    <button v-if="closable" class="base-alert__close" @click="handleClose" aria-label="Close alert">
      ×
    </button>
  </div>
</template>

<style lang="css" scoped>
.base-alert {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--spacing-md);
  border-radius: var(--border-radius-md);
  margin-bottom: var(--spacing-md);
  background-color: var(--color-background-secondary);
  border: 1px solid var(--color-border);
}

.base-alert__content {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
}

.base-alert__icon {
  font-size: 1.25rem;
}

.base-alert__message {
  margin: 0;
  color: var(--color-text);
  font-size: var(--font-size-sm);
}

.base-alert__close {
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: var(--color-text-secondary);
  padding: 0;
  line-height: 1;
}

.base-alert--info {
  background-color: var(--color-info-light);
  border-color: var(--color-info);
}

.base-alert--success {
  background-color: var(--color-success-light);
  border-color: var(--color-success);
}

.base-alert--warning {
  background-color: var(--color-warning-light);
  border-color: var(--color-warning);
}

.base-alert--error {
  background-color: var(--color-error-light);
  border-color: var(--color-error);
}

.base-alert--small {
  padding: var(--spacing-xs);
}

.base-alert--small .base-alert__icon {
  font-size: 1rem;
}

.base-alert--small .base-alert__message {
  font-size: var(--font-size-xs);
}

.base-alert--small .base-alert__close {
  font-size: 1.25rem;
}

.base-alert--large {
  padding: var(--spacing-lg);
}

.base-alert--large .base-alert__icon {
  font-size: 1.5rem;
}

.base-alert--large .base-alert__message {
  font-size: var(--font-size-md);
}

.base-alert--large .base-alert__close {
  font-size: 1.75rem;
}
</style>
