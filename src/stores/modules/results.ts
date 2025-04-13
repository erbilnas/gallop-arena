import { HORSE_CONFIG, POINT_SYSTEM_CONFIG } from '@/constants'
import type { TotalResult } from '@/types'
import { defineStore } from 'pinia'
import { computed } from 'vue'
import { useRaceStore } from './race'

/**
 * Store for managing and calculating race results
 * Handles:
 * - Calculating points for each horse based on their position
 * - Aggregating results across all rounds
 * - Determining final standings
 */
export const useResultsStore = defineStore('results', () => {
  const raceStore = useRaceStore()

  /**
   * Computed property that calculates the total results for all horses across all rounds
   * Returns an array of TotalResult objects sorted by total points
   */
  const totalResults = computed<TotalResult[]>(() => {
    // Step 1: Flatten all round results into a single array
    const allResults = raceStore.raceSchedule.rounds.flatMap(
      (round) =>
        round.results?.map((result) => ({
          horseId: result.horseId,
          // Calculate points based on position (higher position = more points)
          points:
            (HORSE_CONFIG.HORSES_PER_RACE - result.position + 1) *
            POINT_SYSTEM_CONFIG.POINTS_PER_POSITION,
          round: round.id,
          time: result.time,
        })) || [],
    )

    // Step 2: Aggregate results by horse
    const horseTotals = allResults.reduce(
      (acc, result) => {
        // Initialize horse record if it doesn't exist
        if (!acc[result.horseId]) {
          acc[result.horseId] = {
            horseId: result.horseId,
            totalPoints: 0,
            rounds: [],
            time: 0,
          }
        }

        // Update horse's total points and round details
        acc[result.horseId].totalPoints += result.points
        acc[result.horseId].rounds.push({
          round: result.round,
          points: result.points,
          time: result.time || 0,
        })
        acc[result.horseId].time += result.time || 0

        return acc
      },
      {} as Record<
        number,
        {
          horseId: number
          totalPoints: number
          rounds: { round: number; points: number; time: number }[]
          time: number
        }
      >,
    )

    // Step 3: Convert to array, sort by total points, and add final positions
    const finalResults = Object.values(horseTotals)
      .sort((a, b) => b.totalPoints - a.totalPoints)
      .map((result, index) => ({
        horseId: result.horseId,
        position: index + 1,
        totalPoints: result.totalPoints,
        rounds: result.rounds,
        time: result.time || 0,
      }))

    return finalResults
  })

  return {
    totalResults,
  }
})
