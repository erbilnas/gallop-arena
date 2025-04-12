<template>
  <header>
    <slot name="header" />
  </header>

  <main>
    <slot name="main" />
  </main>

  <footer>
    <slot name="footer" />
  </footer>

  <slot />
</template>

<style lang="css" scoped>
footer {
  background: var(--color-surface);
  padding: var(--spacing-xs);
  display: flex;
  align-items: center;
  justify-content: center;
  height: 5vh;
}
</style>
