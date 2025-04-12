import { RACE_CONFIG } from '@/constants'
import { computed, ref, watch, type Ref } from 'vue'
import type { RaceSchedule } from '../../types/horse'

export const useResultsModule = (raceSchedule: Ref<RaceSchedule>) => {
  const scheduleRef = ref(raceSchedule.value)
  const showResultsMenu = ref(false)
  const showResultsModal = ref(false)

  // Update the schedule reference when the input changes
  watch(
    raceSchedule,
    (newSchedule) => {
      scheduleRef.value = newSchedule
    },
    { deep: true },
  )

  const totalResults = computed(() => {
    console.log(
      'Calculating total results for rounds:',
      scheduleRef.value.rounds.map((r) => ({ id: r.id, hasResults: !!r.results })),
    )

    const allResults = scheduleRef.value.rounds.flatMap(
      (round) =>
        round.results?.map((result) => ({
          horseId: result.horseId,
          points:
            (RACE_CONFIG.HORSES_PER_RACE - result.position + 1) * RACE_CONFIG.POINTS_PER_POSITION,
          round: round.id,
        })) || [],
    )

    console.log('All results collected:', allResults)

    const horseTotals = allResults.reduce(
      (acc, result) => {
        if (!acc[result.horseId]) {
          acc[result.horseId] = {
            horseId: result.horseId,
            totalPoints: 0,
            rounds: [],
          }
        }
        acc[result.horseId].totalPoints += result.points
        acc[result.horseId].rounds.push({
          round: result.round,
          points: result.points,
        })
        return acc
      },
      {} as Record<
        number,
        { horseId: number; totalPoints: number; rounds: { round: number; points: number }[] }
      >,
    )

    const finalResults = Object.values(horseTotals)
      .sort((a, b) => b.totalPoints - a.totalPoints)
      .map((result, index) => ({
        ...result,
        position: index + 1,
      }))

    console.log('Final total results:', finalResults)
    return finalResults
  })

  return {
    totalResults,
    showResultsMenu,
    showResultsModal,
  }
}
