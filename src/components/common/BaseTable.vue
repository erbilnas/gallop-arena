<template>
  <table :class="['base-table', { 'base-table--striped': striped }]">
    <thead>
      <tr>
        <th v-for="(header, index) in headers" :key="index">
          {{ header }}
        </th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="(row, index) in rows"
        :key="index"
        :class="[
          { 'base-table__row--selected': isSelected(index) },
          { 'base-table__row--hoverable': hoverable },
        ]"
        @click="handleRowClick(index, row)"
        @mouseenter="handleMouseEnter(index, row)"
        @mouseleave="handleMouseLeave(index, row)"
      >
        <slot :row="row" :index="index"></slot>
      </tr>
    </tbody>
  </table>
</template>

<script setup lang="ts">
import { ref } from 'vue'

interface Props {
  headers: string[]
  striped?: boolean
  rows: unknown[]
  hoverable?: boolean
  selectable?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  striped: false,
  hoverable: false,
  selectable: false,
})

const emit = defineEmits<{
  (e: 'row-click', index: number, row: unknown): void
  (e: 'row-mouseenter', index: number, row: unknown): void
  (e: 'row-mouseleave', index: number, row: unknown): void
  (e: 'row-select', index: number, row: unknown): void
}>()

const selectedRows = ref<Set<number>>(new Set())

const isSelected = (index: number): boolean => {
  return props.selectable && selectedRows.value.has(index)
}

const handleRowClick = (index: number, row: unknown) => {
  emit('row-click', index, row)

  if (props.selectable) {
    if (selectedRows.value.has(index)) {
      selectedRows.value.delete(index)
    } else {
      selectedRows.value.add(index)
    }
    emit('row-select', index, row)
  }
}

const handleMouseEnter = (index: number, row: unknown) => {
  emit('row-mouseenter', index, row)
}

const handleMouseLeave = (index: number, row: unknown) => {
  emit('row-mouseleave', index, row)
}
</script>

<style scoped>
.base-table {
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  background-color: var(--color-background-secondary);
  color: var(--color-text);
  border-radius: var(--border-radius-md);
  overflow: hidden;
}

.base-table th {
  background-color: var(--color-background-secondary);
  font-weight: var(--font-weight-semibold);
  padding: var(--spacing-md);
  text-align: left;
  color: var(--color-text);
  font-size: var(--font-size-lg);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-bottom: none;
}

.base-table td {
  padding: var(--spacing-md);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  border-right: 1px solid rgba(255, 255, 255, 0.1);
}

.base-table--striped tbody tr:nth-child(odd) {
  background-color: rgba(255, 255, 255, 0.05);
}

.base-table__row--hoverable {
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.base-table__row--hoverable:hover {
  background-color: rgba(255, 255, 255, 0.1);
}

.base-table__row--selected {
  background-color: rgba(var(--color-primary-rgb), 0.1);
}

@media (max-width: 768px) {
  .base-table th,
  .base-table td {
    padding: var(--spacing-sm);
    font-size: var(--font-size-sm);
  }
}
</style>
