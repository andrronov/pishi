<template>
   <form>
     <div class="space-y-12 text-gray-200 dark:text-gray-900 bg-black dark:bg-gray-100">
       <div class="border-b border-gray-900/10 pb-12">
         <h2 class="text-sm dark:bg-black dark:text-white bg-white text-black text-center sm:text-xl leading-7">What's new?</h2>
         <div class="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
           <div class="sm:col-span-3">
             <label for="username" class="block text-sm sm:text-xl font-medium leading-6">Write a title</label>
             <div class="mt-2">
               <div class="flex shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-gray-800 focus-within:ring-2 focus-within:ring-inset focus-within:ring-gray-600 sm:max-w-md">
                 <input type="text" name="username" id="username" autocomplete="username" class="block flex-1 w-full border-0 bg-transparent py-1.5 pl-1  placeholder: focus:ring-0 sm:text-sm sm:leading-6" />
               </div>
             </div>
           </div>
 
           <div class="col-span-full">
             <label for="about" class="block text-sm sm:text-xl font-medium leading-6 ">Write a story</label>
             <div class="mt-2">
               <textarea id="about" name="about" rows="5" class="block w-full bg-black dark:bg-white border-0 py-1.5  shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-gray-800 placeholder: focus:ring-2 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6" />
             </div>
           </div>
 
           <div class="col-span-full">
             <label for="photo" class="block text-sm sm:text-xl font-medium leading-6 ">Photo</label>
             <div class="mt-2 flex items-center gap-x-3">
               <NuxtIcon name="user-circle" />
               <button type="button" class=" bg-white px-2.5 py-1.5 text-sm sm:text-base shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">Change</button>
             </div>
           </div>
         </div>
       </div>
       
     </div>
   </form>
 </template>
 
 <script setup>
 </script>