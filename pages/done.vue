<template>
  <div class="w-screen text-white h-screen gap-4 flex flex-col items-center justify-center bg-black">
    <p class="text-xl">That's all!</p>
    <button @click="navigateTo('/login')" class="border border-white p-2 hover:bg-gray-600 hover:text-gray-300">Get back to the login page</button>
  </div>
</template>

<script setup>
definePageMeta({
   layout: 'empty'
})
</script>