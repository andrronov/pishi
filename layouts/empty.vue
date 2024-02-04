<template>
  <div :class="{'dark': lightMode}">
    <div class="h-screen">
      <slot />
    </div>
  </div>
</template>

<script setup>
const store = useUserStore()
const lightMode = ref(false)

onMounted(() => {
   const localData = localStorage.getItem('mode') 
   lightMode.value = JSON.parse(localData)
})
</script>

<style>

</style>