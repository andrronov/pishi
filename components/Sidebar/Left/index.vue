<template>
   <div class="flex flex-col h-screen">
     <NuxtLink to="/">
       <h1 class="pishi p-2 my-2 text-white dark:text-black text-2xl text-center hover:text-gray-300 light:text-black" :class="defaultTransition">PISHI</h1>
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
     </div>
   </div>
 </template>
 
 <script setup>
 const {defaultTransition} = useTailwindConfig()
 </script>
 
 <style>
 
 </style>