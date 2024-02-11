<template>
  <div class="flex flex-col w-full py-4 relative h-screen">
   <h2 class="p-2 text-lg text-white dark:text-black text-center border-2 border-white dark:border-black w-full mb-4">Settings</h2>
   <label class="relative inline-flex items-center cursor-pointer">
      <input type="checkbox" v-model="isLight" @change="setMode" class="sr-only peer">
      <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
      <span class="ms-3 text-sm font-medium text-white dark:text-black">Light mode</span>
   </label>
   <button @click="logOutUser" class="p-2 w-full mb-2 -ml-px hover:bg-gray-500 bg-black border-2 border-white dark:text-red-500 text-red-500 dark:border-black dark:bg-white absolute bottom-0">Log out</button>
  </div>
</template>

<script setup>
const store = useUserStore()
const isLight = ref(false)
const supabase = useSupabaseClient()

onMounted(() => {
   const localData = localStorage.getItem('mode') 
   isLight.value = JSON.parse(localData)
})

function setMode(){
   localStorage.setItem('mode', JSON.stringify(isLight.value))
   reloadNuxtApp({path: '/feed'})
   // navigateTo('/feed')
}

async function logOutUser(){
  const isOut = confirm('Are you sure you want to log out?')
  console.log(isOut);
  if(isOut){
   await supabase.auth.signOut()
   navigateTo('/login')
  }
 }
</script>

<style>

</style>