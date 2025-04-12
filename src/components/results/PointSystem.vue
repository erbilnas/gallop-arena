<template>
  <div class="point-system">
    <h3>Point System</h3>
    <div class="point-rules">
      <div v-for="(points, position) in POINT_SYSTEM" :key="position" class="point-rule">
        <span class="point-number">{{ position }}st</span>
        <span class="point-value">{{ points }} points</span>
      </div>
    </div>
    <div class="point-note">
      <p>
        Points are awarded based on finishing position, with 10 points per position (1st place gets
        100 points, 2nd gets 90, and so on). Total points are calculated by summing up points earned
        in each round. The horse with the highest total points wins the championship!
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
const POINT_SYSTEM = {
  1: 100,
  2: 90,
  3: 80,
  4: 70,
  5: 60,
  6: 50,
  7: 40,
  8: 30,
  9: 20,
  10: 10,
}
</script>

<style scoped>
.point-system {
  background: rgba(255, 255, 255, 0.05);
  border-radius: var(--border-radius-md);
  padding: var(--spacing-lg);
  margin-bottom: var(--spacing-lg);
}

.point-system h3 {
  color: var(--color-text);
  margin: 0 0 var(--spacing-md) 0;
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-semibold);
}

.point-rules {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: var(--spacing-md);
  margin-bottom: var(--spacing-md);
}

.point-rule {
  background: rgba(255, 255, 255, 0.03);
  padding: var(--spacing-md);
  border-radius: var(--border-radius-md);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--spacing-xs);
}

.point-number {
  color: var(--color-warning);
  font-weight: var(--font-weight-semibold);
  font-size: var(--font-size-lg);
}

.point-value {
  color: var(--color-success);
  font-size: var(--font-size-sm);
}

.point-note {
  color: var(--color-text-secondary);
  font-size: var(--font-size-sm);
  line-height: var(--line-height-normal);
  text-align: center;
}
</style>
