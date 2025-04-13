<script setup lang="ts">
import { useRaceStore } from '@/stores'
import { storeToRefs } from 'pinia'
import { ref } from 'vue'
import RaceTitle from './RaceTitle.vue'
import RaceTrack from './RaceTrack.vue'

const raceStore = useRaceStore()
const { currentRace, horsePositions } = storeToRefs(raceStore)

const isHorseListVisible = ref<boolean>(false)

const handleHorseListToggle = (value: boolean): void => {
  isHorseListVisible.value = value
}
</script>

<template>
  <RaceTitle
    :round="currentRace.id"
    :distance="currentRace.distance"
    @toggle-horse-list="handleHorseListToggle"
  />

  <RaceTrack :horses="currentRace.horses" :horse-positions="horsePositions" />
</template>

<style lang="css" scoped></style>
