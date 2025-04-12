<template>
  <div class="guide-section">
    <div class="guide-content">
      <h2 class="guide-title">Welcome to Gazi Koşusu Simulator!</h2>
      <p class="guide-subtitle">
        Gazi Koşusu (Veteran Race) is Turkey's most prestigious horse racing event, established in
        1927 in honor of Mustafa Kemal Atatürk, the founder and the father of the Turkish Republic.
      </p>

      <div class="steps">
        <div class="step">
          <div class="step-number">1</div>
          <div class="step-content">
            <h3>Generate Horses</h3>
            <p>Click the "Generate Horses" button to create your stable of racing horses.</p>
          </div>
        </div>

        <div class="step">
          <div class="step-number">2</div>
          <div class="step-content">
            <h3>Create Race Schedule</h3>
            <p>Once horses are generated, create a race schedule with 6 exciting rounds.</p>
          </div>
        </div>

        <div class="step">
          <div class="step-number">3</div>
          <div class="step-content">
            <h3>Start the Race</h3>
            <p>Watch your horses compete in different distances from 1200m to 2200m.</p>
          </div>
        </div>
      </div>

      <div class="race-info">
        <h3>Race Information</h3>
        <ul>
          <li>Each race consists of 6 rounds with different distances</li>
          <li>10 horses compete in each round</li>
          <li>Horses' conditions affect their performance</li>
          <li>Watch the race in fullscreen mode for the best experience</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// No props or logic needed for this component
</script>

<style scoped>
.guide-section {
  background: rgba(40, 40, 40, 0.6);
  border-radius: var(--border-radius-md);
  padding: var(--spacing-xl);
  animation: fadeIn 0.5s ease-out;
  width: 100vw;
}

.guide-content {
  max-width: 800px;
  margin: 0 auto;
}

.guide-title {
  color: #fff;
  text-align: center;
  margin-bottom: 16px;
  font-size: 2em;
}

.guide-subtitle {
  color: rgba(255, 255, 255, 0.8);
  text-align: center;
  margin-bottom: 32px;
  font-size: 1.1em;
  line-height: 1.5;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
}

.steps {
  display: flex;
  flex-direction: column;
  gap: 24px;
  margin-bottom: 32px;
}

.step {
  display: flex;
  gap: 16px;
  align-items: flex-start;
}

.step-number {
  background: var(--color-primary);
  color: white;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  flex-shrink: 0;
}

.step-content {
  h3 {
    color: #fff;
    margin-bottom: 8px;
    font-size: 1.2em;
  }

  p {
    color: rgba(255, 255, 255, 0.8);
    line-height: 1.5;
  }
}

.race-info {
  background: rgba(255, 255, 255, 0.1);
  padding: 20px;
  border-radius: 8px;

  h3 {
    color: #fff;
    margin-bottom: 16px;
    font-size: 1.2em;
  }

  ul {
    list-style-type: none;
    padding: 0;
    margin: 0;

    li {
      color: rgba(255, 255, 255, 0.8);
      margin-bottom: 8px;
      padding-left: 24px;
      position: relative;

      &::before {
        content: '•';
        color: var(--color-primary);
        position: absolute;
        left: 8px;
      }
    }
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
    margin: 10px;
    padding: 16px;
  }

  .guide-title {
    font-size: 1.5em;
  }

  .step-content h3 {
    font-size: 1.1em;
  }
}
</style>
