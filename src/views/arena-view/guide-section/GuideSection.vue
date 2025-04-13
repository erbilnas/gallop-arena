<script setup lang="ts">
import { GUIDE_CONTENT } from '@/constants'
import GuideGameMechanic from './GuideGameMechanic.vue'
import GuideStep from './GuideStep.vue'
</script>

<template>
  <div class="guide-section" data-test="guide-section">
    <div class="guide-section__content">
      <h2 class="guide-section__title">{{ GUIDE_CONTENT.title }}</h2>
      <p class="guide-section__subtitle">
        {{ GUIDE_CONTENT.subtitle }}
      </p>

      <div class="guide-section__steps">
        <GuideStep
          v-for="(step, index) in GUIDE_CONTENT.steps"
          :key="index"
          :number="index + 1"
          :title="step.title"
          :description="step.description"
          :items="step.items"
        />
      </div>

      <div class="guide-section__race-info">
        <h3 class="guide-section__race-info-title">{{ GUIDE_CONTENT.gameMechanics.title }}</h3>
        <div class="guide-section__info-grid">
          <GuideGameMechanic
            v-for="(card, index) in GUIDE_CONTENT.gameMechanics.cards"
            :key="index"
            :title="card.title"
            :description="card.description"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="css" scoped>
.guide-section {
  background: rgba(40, 40, 40, 0.6);
  border-radius: var(--border-radius-md);
  padding: var(--spacing-xl);
  animation: fadeIn 0.5s ease-out;
  width: 97vw;
  overflow-y: auto;
  position: relative;
  scrollbar-width: thin;
  scrollbar-color: var(--color-primary) rgba(255, 255, 255, 0.1);
}

.guide-section__content {
  max-width: 1000px;
  margin: 0 auto;
}

.guide-section__title {
  color: var(--color-text);
  text-align: center;
  margin-bottom: var(--spacing-md);
  font-size: var(--font-size-3xl);
  font-weight: var(--font-weight-bold);
}

.guide-section__subtitle {
  color: var(--color-text-secondary);
  text-align: center;
  margin-bottom: var(--spacing-2xl);
  font-size: var(--font-size-lg);
  line-height: 1.6;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
}

.guide-section__steps {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-2xl);
  margin-bottom: var(--spacing-3xl);
}

.guide-section__race-info {
  background: rgba(255, 255, 255, 0.1);
  padding: var(--spacing-xl);
  border-radius: var(--border-radius-md);
  margin-bottom: var(--spacing-2xl);
}

.guide-section__race-info-title {
  color: var(--color-text);
  margin-bottom: var(--spacing-xl);
  font-size: var(--font-size-xl);
  font-weight: var(--font-weight-medium);
  text-align: center;
}

.guide-section__info-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: var(--spacing-lg);
}
</style>
