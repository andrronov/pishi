<template>
   <div class="w-full px-px">
     <div class="w-full bg-black dark:bg-white px-1 mt-2">
       <Disclosure v-slot="{ open }">
         <DisclosureButton
           class="flex w-full justify-center bg-gray-100 text-center text-lg font-medium text-white"
         >
           <span class="bg-white w-full px-4 py-2 mb-2 text-black dark:text-white dark:bg-black">Fast chip</span>
           <ChevronUpIcon
             :class="open ? 'rotate-180 transform' : ''"
             class="text-purple-500 hidden"
           />
         </DisclosureButton>
         <DisclosurePanel>
           <SidebarRight />
         </DisclosurePanel>
       </Disclosure>
     </div>
   </div>
 </template>
 
 <script setup>
 import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/vue'
 </script>
 