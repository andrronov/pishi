<template>
   <div class="flex flex-col h-screen">
     <NuxtLink to="/feed">
       <h1 class="pishi p-1 my-1 text-white dark:text-black xs:text-xl sm:text-2xl text-center hover:text-gray-300" :class="defaultTransition">PISHI</h1>
     </NuxtLink>
     <div class="mt-2 space-y-3">
        <NuxtLink v-for="(tab, index) in sidebarTabs" :key=index :to="tab.link" :class="$route.name === tab.name.toLocaleLowerCase() ? 'bg-white text-black dark:bg-black dark:text-white' : 'font-normal dark:text-black text-white'" class="flex flex-row border-y-2 border-white dark:border-black hover:font-bold items-center sm:justify-start justify-center p-3 gap-1">
            <nuxt-icon :name="tab.icon" />
            <p class="hidden sm:block">{{ tab.name }}</p>
        </NuxtLink>
      </div>

   </div>
 </template>
 
 <script setup>
const {defaultTransition} = useTailwindConfig()

// исправить ссылки для messages + freinds
const sidebarTabs = ref([
  {icon: 'home', name: 'Feed', link: '/feed'},
  {icon: 'bell', name: 'Inbox', link: '/inbox'},
  {icon: 'envelope', name: 'Messages', link: '/messages'},
  {icon: 'user-group', name: 'Friends', link: '/friends'},
  {icon: 'camera', name: 'Photos', link: '/photos'},
  {icon: 'settings', name: 'Settings', link: '/settings'},
])
 </script>