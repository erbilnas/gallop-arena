<script setup lang="ts">
import { useVersion } from '@/composables/useVersion'

const { version } = useVersion()
</script>

<template>
  <p class="text">
    © {{ new Date().getFullYear() }} Erbil Nas. All rights reserved. Version {{ version }}
  </p>
</template>

<style lang="css" scoped>
.text {
  color: var(--color-text-secondary);
  font-size: var(--font-size-sm);
}
</style>
