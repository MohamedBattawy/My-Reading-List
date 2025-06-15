<template>
  <div class="centered-layout">
    <AppHeader />
    <main>
      <slot />
    </main>
  </div>
</template>

<style scoped>
.centered-layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

main {
  padding: 1.5rem 0;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style> 