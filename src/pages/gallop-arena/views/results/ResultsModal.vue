<template>
  <BaseModal :is-open="isOpen" title="🏆 Race Results 🏆" @close="closeModal">
    <PointSystem />
    <ResultsTable :results="results" :horses="horses" />
  </BaseModal>
</template>

<script setup lang="ts">
import { BaseModal } from '@/components/common'
import PointSystem from '@/components/results/PointSystem.vue'
import ResultsTable from '@/components/results/ResultsTable.vue'
import { defineEmits, defineProps } from 'vue'

interface Horse {
  id: number
  name: string
  color: string
}

interface RoundPoints {
  round: number
  points: number
  time?: number
}

interface TotalResult {
  horseId: number
  position: number
  totalPoints: number
  rounds: RoundPoints[]
}

interface Props {
  isOpen: boolean
  results: TotalResult[]
  horses: Horse[]
}

defineProps<Props>()
const emit = defineEmits(['close'])

const closeModal = () => {
  emit('close')
}
</script>

<style scoped></style>
