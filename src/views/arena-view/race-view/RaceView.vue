<script setup lang="ts">
import { useStore } from '@/stores'
import { storeToRefs } from 'pinia'
import { ref } from 'vue'
import RaceTitle from './RaceTitle.vue'
import RaceTrack from './RaceTrack.vue'

const store = useStore()
const { currentRace, horsePositions } = storeToRefs(store)

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
