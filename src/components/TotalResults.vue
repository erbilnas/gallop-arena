<template>
  <div class="total-results">
    <h3>Total Results</h3>
    <table>
      <thead>
        <tr>
          <th>Position</th>
          <th>Horse</th>
          <th>Total Points</th>
          <th>Round Points</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="result in results" :key="result.horseId">
          <td>{{ result.position }}</td>
          <td>{{ getHorseName(result.horseId) }}</td>
          <td>{{ result.totalPoints }}</td>
          <td>
            <div v-for="round in result.rounds" :key="round.round">
              Round {{ round.round }}: {{ round.points }}
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'

interface Horse {
  id: number
  name: string
}

interface RoundPoints {
  round: number
  points: number
}

interface TotalResult {
  horseId: number
  position: number
  totalPoints: number
  rounds: RoundPoints[]
}

interface Props {
  results: TotalResult[]
  horses: Horse[]
}

const props = defineProps<Props>()

const getHorseName = (horseId: number): string => {
  const horse = props.horses.find((h) => h.id === horseId)
  return horse ? horse.name : 'Unknown Horse'
}
</script>

<style scoped>
.total-results {
  margin-top: 20px;
}

table {
  width: 100%;
  border-collapse: collapse;
  background-color: #2e2e2e;
  color: #f5f5f5;
  border-radius: 8px;
  overflow: hidden;
}

th,
td {
  padding: 8px;
  text-align: left;
  border: 1px solid #444;
}

th {
  background-color: #3e3e3e;
}
</style>
