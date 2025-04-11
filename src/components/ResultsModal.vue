<template>
  <div v-if="isOpen" class="modal-overlay" @click="closeModal">
    <div class="modal-content" @click.stop>
      <div class="modal-header">
        <h2>🏆 Race Results 🏆</h2>
        <button class="close-button" @click="closeModal">×</button>
      </div>
      <div class="modal-body">
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
            <tr
              v-for="result in results"
              :key="result.horseId"
              :class="{ podium: result.position <= 3 }"
            >
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
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue'

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
  isOpen: boolean
  results: TotalResult[]
  horses: Horse[]
}

const props = defineProps<Props>()
const emit = defineEmits(['close'])

const getHorseName = (horseId: number): string => {
  const horse = props.horses.find((h) => h.id === horseId)
  return horse ? horse.name : 'Unknown Horse'
}

const closeModal = () => {
  emit('close')
}
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  animation: fadeIn 0.3s ease-out;
}

.modal-content {
  background: rgba(30, 30, 30, 0.95);
  border-radius: 12px;
  padding: 24px;
  width: 90%;
  max-width: 800px;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  animation: slideUp 0.3s ease-out;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.modal-header h2 {
  color: #fff;
  margin: 0;
  font-size: 1.5em;
}

.close-button {
  background: none;
  border: none;
  color: #fff;
  font-size: 1.5em;
  cursor: pointer;
  padding: 0;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: background-color 0.2s;
}

.close-button:hover {
  background-color: rgba(255, 255, 255, 0.1);
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
  padding: 12px;
  text-align: left;
  border: 1px solid #444;
}

th {
  background-color: #3e3e3e;
  font-weight: 600;
}

tr.podium {
  background: linear-gradient(90deg, rgba(50, 50, 50, 0.8) 0%, rgba(60, 60, 60, 0.9) 100%);
}

tr.podium:nth-child(1) {
  background: linear-gradient(90deg, rgba(255, 215, 0, 0.2) 0%, rgba(50, 50, 50, 0.8) 100%);
}

tr.podium:nth-child(2) {
  background: linear-gradient(90deg, rgba(192, 192, 192, 0.2) 0%, rgba(50, 50, 50, 0.8) 100%);
}

tr.podium:nth-child(3) {
  background: linear-gradient(90deg, rgba(205, 127, 50, 0.2) 0%, rgba(50, 50, 50, 0.8) 100%);
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes slideUp {
  from {
    transform: translateY(50px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

@media (max-width: 768px) {
  .modal-content {
    width: 95%;
    padding: 16px;
  }

  th,
  td {
    padding: 8px;
    font-size: 0.9em;
  }
}
</style>
