<script setup lang="ts">
interface BaseCheckboxProps {
  modelValue: boolean
  label?: string
  disabled?: boolean
  id?: string
  name?: string
  required?: boolean
}

const props = withDefaults(defineProps<BaseCheckboxProps>(), {
  disabled: false,
  required: false,
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
}>()

const handleChange = (event: Event): void => {
  const target = event.target as HTMLInputElement
  emit('update:modelValue', target.checked)
}

const handleKeyDown = (event: KeyboardEvent): void => {
  if (event.key === 'Enter' || event.key === ' ') {
    event.preventDefault()
    emit('update:modelValue', !props.modelValue)
  }
}
</script>

<template>
  <label class="base-checkbox" :class="{ 'base-checkbox--disabled': disabled }">
    <input
      type="checkbox"
      :id="id"
      :name="name"
      :checked="modelValue"
      :disabled="disabled"
      :required="required"
      :aria-label="label"
      :aria-checked="modelValue"
      :aria-disabled="disabled"
      class="base-checkbox__input"
      @change="handleChange"
      @keydown="handleKeyDown"
    />
    <span class="base-checkbox__label" v-if="label">
      {{ label }}
    </span>
  </label>
</template>

<style lang="css" scoped>
.base-checkbox {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  cursor: pointer;
}

.base-checkbox--disabled {
  cursor: not-allowed;
  opacity: 0.7;
}

.base-checkbox__input {
  width: 16px;
  height: 16px;
  cursor: pointer;
  position: relative;
  appearance: none;
  border: 2px solid var(--color-border);
  border-radius: 3px;
  transition: all 0.2s ease;
}

.base-checkbox__input:checked {
  background-color: var(--color-primary);
  border-color: var(--color-primary);
}

.base-checkbox__input:focus {
  outline: none;
  box-shadow: 0 0 0 2px var(--color-primary-light);
}

.base-checkbox__input:disabled {
  cursor: not-allowed;
  background-color: var(--color-background-light);
}

.base-checkbox__label {
  font-size: var(--font-size-sm);
  color: var(--color-text);
  user-select: none;
}
</style>
