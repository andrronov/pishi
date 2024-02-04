<template>
  <div class="flex flex-col w-full py-4">
   <h2 class="p-2 text-lg text-white dark:text-black text-center border-2 border-white w-full mb-4">Settings</h2>
      <label class="relative inline-flex items-center cursor-pointer">
         <input type="checkbox" v-model="isLight" @change="setMode" class="sr-only peer">
         <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
         <span class="ms-3 text-sm font-medium text-white dark:text-black dark:text-gray-300">Light mode</span>
      </label>
 
  </div>
</template>

<script setup>
const store = useUserStore()
const isLight = ref(false)

onMounted(() => {
   const localData = localStorage.getItem('mode') 
   isLight.value = JSON.parse(localData)
})

function setMode(){
   localStorage.setItem('mode', JSON.stringify(isLight.value))
   reloadNuxtApp({path: '/feed'})
   // navigateTo('/feed')
}
</script>

<style>

</style>