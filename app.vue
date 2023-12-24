<!-- <template>
  <NuxtLayout>
   <NuxtPage />
  </NuxtLayout>
</template>

<script setup>
const lightMode = ref(false)
</script>

<style>

</style> -->

<script setup>
const user = useSupabaseUser()
</script>

<template>
  <div class="container" style="padding: 50px 0 100px 0">
    <Account v-if="user" />
    <Auth v-else />
  </div>
</template>