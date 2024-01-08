<template>
   <div class="flex flex-col h-screen">
     <NuxtLink to="/">
       <h1 class="pishi p-2 my-2 text-white dark:text-black text-2xl text-center hover:text-gray-300" :class="defaultTransition">PISHI</h1>
     </NuxtLink>
     <div class="mt-2 space-y-3">
       <SidebarLeftTab active>
         <template v-slot:icon>
           <nuxt-icon name="home"></nuxt-icon>
         </template>
         <template v-slot:name>
           Feed
         </template>
       </SidebarLeftTab>
       
       <SidebarLeftTab>
         <template v-slot:icon>
           <nuxt-icon name="bell"></nuxt-icon>
         </template>
         <template v-slot:name>
           Notifications
         </template>
       </SidebarLeftTab>
       <SidebarLeftTab>
         <template v-slot:icon>
           <nuxt-icon name="envelope"></nuxt-icon>
         </template>
         <template v-slot:name>
           Messages
         </template>
       </SidebarLeftTab>
       <SidebarLeftTab>
         <template v-slot:icon>
           <nuxt-icon name="user-group"></nuxt-icon>
         </template>
         <template v-slot:name>
           Friends
         </template>
       </SidebarLeftTab>
       <SidebarLeftTab>
         <template v-slot:icon>
           <nuxt-icon name="camera"></nuxt-icon>
         </template>
         <template v-slot:name>
           Photos
         </template>
       </SidebarLeftTab>
       <button class="p-4 bg-black border-y-2 w-full border-white dark:bg-white dark:text-black dark:border-black" @click="logOutUser">Log out</button>
     </div>

     <div class="flex flex-row items-center justify-center px-2 py-2 mx-auto mt-auto mb-5 cursor-pointer w-14 xl:w-full hover:bg-gray-800 hover:text-gray-300 dark:hover:bg-gray-400">

            <div v-if="user" class="flex flex-row">
                <img :src="user.avatar" class="w-10 h-10">
                <div class="flex-col hidden ml-2 xl:block">
                    <h1 v-if="user" class="text-sm font-bold text-gray-300 dark:text-gray-800">
                        {{ user.name }} {{ user.surname }}
                        <!-- Andrew Andronov -->
                    </h1> 
                    <h1 v-else class="text-sm font-bold text-gray-300 dark:text-gray-800">
                        Undefined
                    </h1> 
                    <p class="text-sm text-gray-400 dark:text-gray-700">
                        @{{ user.id }}
                        <!-- @andrronov -->
                    </p>
                </div>
            </div>
            <UISpinner v-else />

            <!-- ICON -->
            <!-- <div class="hidden ml-auto xl:block">
                <div class="w-6 h-6">
                  -->
                    <!-- <ChevronDownIcon /> -->
                <!-- </div>
            </div> -->



        </div>
   </div>
 </template>
 
 <script setup>
 const {defaultTransition} = useTailwindConfig()

 const supabase = useSupabaseClient()

 async function logOutUser(){
  await supabase.auth.signOut()
  navigateTo('/login')
 }

 
const user = ref(null)

watchEffect(() => {
user.value = useGetUserStore()
})
setTimeout(() => {
  console.log(user.value);  
}, 3000);
 </script>
 
 <style>
 
 </style>