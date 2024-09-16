<template>
<div class="fixed top-0 left-0 w-full h-full bg-red-700 opacity-80 z-50 flex justify-center items-center">
  <div class="bg-white dark:bg-black text-black dark:text-white p-4 rounded-md">
    <p class="text-lg font-medium mb-4">Error</p>
    <p class="text-sm text-gray-800 dark:text-gray-200 mb-6">{{ error }}</p>
    <button class="bg-gray-100 dark:bg-black text-black dark:text-white py-2 px-4 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700" @click="$router.push('/')">Back to main page</button>
  </div>
</div>
</template>

<script setup>
const props = defineProps({
   error: {type: Object}
})
</script>