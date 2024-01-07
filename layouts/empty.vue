<template>
  <div :class="{'dark': lightMode}">
    <div class="h-screen">
      <slot />
    </div>
  </div>
</template>

<script setup>
const lightMode = ref(false)
</script>

<style>

</style>