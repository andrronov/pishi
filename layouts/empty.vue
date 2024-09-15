<template>
  <div :class="{'dark': lightMode}">
    <div class="h-screen">
      <slot />
    </div>
  </div>
</template>

<script setup>
const lightMode = ref(false)
onMounted(() => lightMode.value = JSON.parse(localStorage.getItem('mode')))
</script>

<style>

</style>