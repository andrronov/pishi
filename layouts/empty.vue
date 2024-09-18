<template>
  <div :class="{'dark': lightMode}">
    <div class="h-screen">
      <slot />
    </div>
  </div>
</template>

<script setup>
const lightMode = ref(false)
const userThemeStore = useThemeStore()

watchEffect(() => {
   lightMode.value = userThemeStore.theme
})
</script>

<style>

</style>