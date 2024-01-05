<template>
   <div :class="{'dark': lightMode}">
      <div class="bg-black text-white dark:bg-white ">
         <div class="min-h-full">
            <div class="grid grid-cols-12 mx-auto sm:px-6 lg:max-w-7xl lg:px-8 lg:gap-5">
               <!-- left sidebar -->
               <div class="md:block xs-col-span-1 xl:col-span-2">
                  <div class="sticky top-0">
                     <SidebarLeft />
                  </div>
               </div>
 
               <!-- main content -->
               <main class="col-span-12 md:col-span-8 xl:col-span-6">
                  <slot />
               </main>
 
               <!-- right sidebar -->
               <div class="col-span-12 md:block xl:col-span-4 md:col-span-3">
                  <div class="sticky top-0">
                     <SidebarRightProfile />
                  </div>
               </div>
            </div>
         </div>
      </div>
   </div>
 </template>

<script setup>
const lightMode = ref(false)
</script>