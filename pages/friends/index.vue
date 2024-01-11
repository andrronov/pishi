<template>
   <div class="flex flex-row items-center">
      <input type="text" placeholder="Find a friend" class="w-full p-3 bg-black dark:bg-white dark:text-black dark:border-black border-2 border-white text-white">
      <button class="bg-white text-black py-3 border-y-2 border-white cursor-pointer hover:text-gray-600">Search</button>
   </div>
   <Friends :currentTab="0" />
</template>

<script setup>
definePageMeta({
   layout: 'default'
})
const route = useRoute()
console.log(route);
</script>

<style>

</style>