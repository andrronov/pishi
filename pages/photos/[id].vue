<template>
   <div as="template" v-if="true">
     <div as="div" class="relative z-10" @close="navigateTo('/photos')">
       <div
         as="template"
         enter="ease-out duration-300"
         enter-from="opacity-0"
         enter-to="opacity-100"
         leave="ease-in duration-200"
         leave-from="opacity-100"
         leave-to="opacity-0"
       >
         <div
           class="fixed inset-0 bg-gray-900 dark:bg-gray-200 bg-opacity-75 transition-opacity"
         />
       </div>
 
       <div class="fixed inset-0 z-10 w-screen overflow-y-scroll snap-mandatory">
         <div class="flex min-h-full items-center justify-center p-4 text-center sm:items-center sm:p-0">
           <div class="bg-black">
             <div ref="target" class="relative flex flex-col transform overflow-hidden rounded-lg text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
               <div v-if="image" class="bg-black dark:bg-gray-100 px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                  <div class="sm:flex sm:items-start">
                     <img :src="image[0].img" alt="">
                  </div>
                  <h2 v-if="eRror" class="text-sm dark:bg-black dark:text-red-300 bg-white text-red-700 text-center sm:text-xl leading-7">
                     Something went wrong: {{ eRror.message }}
                  </h2>
               </div>
               <UISpinner class="w-full justify-self-center" v-if="imgLoad" />
               <div class="flex flex-row h-auto items-center mb-4 mt-2 self-center">
                  <div v-if="true" class="flex flex-row items-center gap-1 scale-150 p-1 cursor-pointer border border-white">
                     <NuxtIcon name="like" class="" />
                     <!-- <p class="text-xs">{{ post.post_likes.length }}</p> -->
                     <p class="text-xs">2</p>
                  </div>
                  <!-- <div v-if="post.post_likes.find(islike)" @click="unlikePost(post.id)" class="flex flex-row items-center gap-1 scale-150 p-1 ml-3 mr-6 border-x border-y border-white dark:border-black bg-black text-white dark:bg-white dark:text-black cursor-pointer hover:bg-gray-700 hover:text-gray-300 dark:hover:bg-gray-300 dark:hover:text-gray-700">
                     <NuxtIcon name="like" class="" />
                     <p class="text-xs">{{ post.post_likes.length }}</p>
                  </div> -->
               </div>
             </div>
           </div>
         </div>
       </div>
     </div>
   </div>
 </template>
 
 <script setup>
definePageMeta({
   layout: 'chat'
})

import { onClickOutside } from '@vueuse/core'
const target = ref(null)
onClickOutside(target, event => navigateTo('/photos'))
 
const supabase = useSupabaseClient()
const session = await supabase.auth.getSession();
const route = useRoute()
 
const loading = ref(false)
const imgLoad = ref(false)
const eRror = ref(null)
const image = ref(null)
const minRange = ref(0)
const maxRange = ref(3)
 
async function loadPhotoURL(){
   imgLoad.value = true
   const {data, error} = await supabase.from('photos').select().eq('id', route.params.id)
   if(!error){
      image.value = data
      imgLoad.value = false
   } else {
      eRror.value = error
      imgLoad.value = false
      throw new Error(error)
   }
}

async function loadPhotos(){
   const {data, error} = await supabase.from('photos').select().limit(3)
}

watchEffect(() => {
   loadPhotoURL()
})
 </script>
 