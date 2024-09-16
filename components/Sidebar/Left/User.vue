<template>
   <div class="flex flex-row items-center justify-center mt-auto mb-5 xs:w-full cursor-pointer hover:bg-gray-900 hover:text-gray-300 dark:hover:bg-gray-400">

      <div v-if="user.id" @click="$router.push(`/profile/${user.id}`)" class="flex flex-row w-full">
          <img :src="user.avatar" class="object-cover w-full h-full sm:w-10 sm:h-10 xl:w-12 xl:h-12">
          <div class="flex-col ml-2 hidden sm:block">
              <h1 v-if="user" class="text-sm hidden sm:block font-bold text-gray-300 dark:text-gray-800">
                  {{ user.name }} {{ user.surname }}
              </h1> 
              <h1 v-else class="text-sm font-bold text-gray-300 dark:text-gray-800">
                  Undefined
              </h1> 
              <p class="text-[10px] break-words hidden sm:block text-gray-400 dark:text-gray-700">
                  @{{ user.id }}
              </p>
          </div>
      </div>
      <UISpinner v-else />
  </div>
</template>

<script setup>
const userStore = useUserStore()
const user = ref(null)
watchEffect(() => {
    user.value =  userStore.getUser()
})
</script>