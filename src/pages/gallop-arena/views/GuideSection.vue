<template>
  <div class="guide-section">
    <div class="guide-content">
      <h2 class="guide-title">{{ GUIDE_CONTENT.title }}</h2>
      <p class="guide-subtitle">
        {{ GUIDE_CONTENT.subtitle }}
      </p>

      <div class="scroll-indicator">
        <span class="scroll-text">{{ GUIDE_CONTENT.scrollIndicator.text }}</span>
        <div class="scroll-arrow">↓</div>
      </div>

      <div class="steps">
        <div v-for="(step, index) in GUIDE_CONTENT.steps" :key="index" class="step">
          <div class="step-number">{{ index + 1 }}</div>
          <div class="step-content">
            <h3>{{ step.title }}</h3>
            <p>{{ step.description }}</p>
            <ul>
              <li v-for="(item, itemIndex) in step.items" :key="itemIndex">{{ item }}</li>
            </ul>
          </div>
        </div>
      </div>

      <div class="race-info">
        <h3>{{ GUIDE_CONTENT.gameMechanics.title }}</h3>
        <div class="info-grid">
          <div
            v-for="(card, index) in GUIDE_CONTENT.gameMechanics.cards"
            :key="index"
            class="info-card"
          >
            <h4>{{ card.title }}</h4>
            <p>{{ card.description }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { GUIDE_CONTENT } from '@/constants/guide-content'
</script>

<style scoped>
.guide-section {
  background: rgba(40, 40, 40, 0.6);
  border-radius: var(--border-radius-md);
  padding: var(--spacing-xl);
  animation: fadeIn 0.5s ease-out;
  width: 100vw;
  height: 80vh;
  overflow-y: auto;
  position: relative;
  scrollbar-width: thin;
  scrollbar-color: var(--color-primary) rgba(255, 255, 255, 0.1);

  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background: rgba(255, 255, 255, 0.1);
    border-radius: var(--border-radius-sm);
  }

  &::-webkit-scrollbar-thumb {
    background-color: var(--color-primary);
    border-radius: var(--border-radius-sm);
  }

  &::-webkit-scrollbar-thumb:hover {
    background-color: var(--color-primary-dark);
  }
}

.guide-content {
  max-width: 1000px;
  margin: 0 auto;
}

.guide-title {
  color: var(--color-text);
  text-align: center;
  margin-bottom: var(--spacing-md);
  font-size: var(--font-size-3xl);
  font-weight: var(--font-weight-bold);
}

.guide-subtitle {
  color: var(--color-text-secondary);
  text-align: center;
  margin-bottom: var(--spacing-2xl);
  font-size: var(--font-size-lg);
  line-height: 1.6;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
}

.steps {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-2xl);
  margin-bottom: var(--spacing-3xl);
}

.step {
  display: flex;
  gap: var(--spacing-lg);
  align-items: flex-start;
  background: rgba(255, 255, 255, 0.05);
  padding: var(--spacing-lg);
  border-radius: var(--border-radius-md);
  transition: transform var(--transition-normal);

  &:hover {
    transform: translateX(5px);
  }
}

.step-number {
  background: var(--color-primary);
  color: var(--color-text);
  width: 36px;
  height: 36px;
  border-radius: var(--border-radius-full);
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: var(--font-weight-bold);
  font-size: var(--font-size-lg);
  flex-shrink: 0;
}

.step-content {
  h3 {
    color: var(--color-text);
    margin-bottom: var(--spacing-sm);
    font-size: var(--font-size-xl);
    font-weight: var(--font-weight-medium);
  }

  p {
    color: var(--color-text-secondary);
    line-height: 1.6;
    margin-bottom: var(--spacing-sm);
  }

  ul {
    list-style-type: none;
    padding: 0;
    margin: 0;

    li {
      color: var(--color-text-secondary);
      margin-bottom: var(--spacing-xs);
      padding-left: var(--spacing-xl);
      position: relative;

      &::before {
        content: '•';
        color: var(--color-primary);
        position: absolute;
        left: var(--spacing-xs);
      }
    }
  }
}

.race-info {
  background: rgba(255, 255, 255, 0.1);
  padding: var(--spacing-xl);
  border-radius: var(--border-radius-md);
  margin-bottom: var(--spacing-2xl);

  h3 {
    color: var(--color-text);
    margin-bottom: var(--spacing-xl);
    font-size: var(--font-size-xl);
    font-weight: var(--font-weight-medium);
    text-align: center;
  }
}

.info-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: var(--spacing-lg);
}

.info-card {
  background: rgba(255, 255, 255, 0.05);
  padding: var(--spacing-md);
  border-radius: var(--border-radius-sm);
  transition: transform var(--transition-normal);

  &:hover {
    transform: translateY(-5px);
  }

  h4 {
    color: var(--color-text);
    margin-bottom: var(--spacing-sm);
    font-size: var(--font-size-lg);
    font-weight: var(--font-weight-medium);
  }

  p {
    color: var(--color-text-secondary);
    line-height: 1.5;
    font-size: var(--font-size-base);
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (max-width: 768px) {
  .guide-section {
    margin: var(--spacing-xs);
    padding: var(--spacing-md);
    height: 70vh;
  }

  .guide-title {
    font-size: var(--font-size-2xl);
  }

  .step-content h3 {
    font-size: var(--font-size-lg);
  }

  .info-grid {
    grid-template-columns: 1fr;
  }
}

.scroll-indicator {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--spacing-xs);
  padding: var(--spacing-lg);
  border-radius: 0 0 var(--border-radius-md) var(--border-radius-md);
  position: relative;
  z-index: var(--z-index-sticky);
}

.scroll-text {
  color: var(--color-text-secondary);
  font-size: var(--font-size-base);
  text-align: center;
  font-weight: var(--font-weight-medium);
  text-shadow: var(--shadow-sm);
}

.scroll-arrow {
  color: var(--color-primary);
  font-size: var(--font-size-2xl);
  animation: bounce 2s infinite;
  text-shadow: var(--shadow-sm);
}

@keyframes bounce {
  0%,
  20%,
  50%,
  80%,
  100% {
    transform: translateY(0);
  }
  40% {
    transform: translateY(-8px);
  }
  60% {
    transform: translateY(-4px);
  }
}
</style>
