<script setup lang="ts">
import AppHeader from '~/components/AppHeader.vue';
</script>

<template>
  <div class="centered-layout">
    <AppHeader @add-book="$emit('add-book')" />
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
  align-items: center;
  background: #f9fafb;
}

main {
  padding: 1.5rem 0;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style> 