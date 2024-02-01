<template>
   <div :class="{'dark': lightMode}">
      <div class="bg-black text-white dark:bg-white ">
         <div class="min-h-full">
            <div class="grid grid-cols-12 mx-auto sm:px-6 gap-3 lg:max-w-7xl lg:px-8 lg:gap-5">
               <!-- left sidebar -->
               <div class="md:block col-span-2 xs:col-span-1 sm:col-span-2">
                  <div class="sticky top-0">
                     <SidebarLeft />
                  </div>
               </div>
 
               <!-- main content -->
               <main class="col-span-10 xs:col-span-11 md:col-span-10">
                  <slot />
               </main>
 
            </div>
         </div>
      </div>
   </div>
 </template>

<script setup>
const lightMode = ref(false)
</script>