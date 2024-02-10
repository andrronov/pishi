<template>
   <div v-if="true">
     <div class="relative z-10" @close="navigateTo('/photos')">
       <div>
         <div class="fixed inset-0 bg-gray-900 dark:bg-gray-400 bg-opacity-75 transition-opacity"/>
       </div>
 
       <div class="fixed inset-0 z-10 flex justify-center items-center w-full">
          <div v-if="images" class="flex flex-col h-full relative w-full gap-6 snap-y snap-mandatory overflow-y-scroll items-center justify-center text-center">
             <div v-for="(photo, index) in images" :key="index" class="flex flex-col px-4 relative justify-center items-center snap-always h-full snap-center shrink-0 w-full">
                <div class="bg-black dark:bg-white relative z-50 flex flex-col gap-4 justify-center items-center transform overflow-hidden text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                   <div @click="navigateTo(`/profile/${photo.profiles.id}`)" class="flex flex-row items-center self-start ml-5 mt-4 bg-black dark:bg-white gap-2">
                      <img :src="photo.profiles.avatar" class="w-10 h-10" alt="">
                      <div class="flex flex-col text-xs xs:text-sm">
                        <p class="text-gray-300 dark:text-gray-700">{{ photo.profiles.id }}</p>
                        <p class="text-gray-500">{{ formatTimeAgo(new Date(photo.created_at)) }}  #{{ photo.id }}</p>
                      </div>
                   </div>
                     <div class="bg-black dark:bg-white px-4 pb-4 pt-3">
                        <div class="sm:flex sm:items-start">
                           <img :src="photo.img" class="shrink-0 w-fit h-auto max-h-96 object-cover shadow-xl bg-white" alt="">
                        </div>
                        <h2 v-if="eRror" class="text-sm dark:bg-black dark:text-red-300 bg-white text-red-700 text-center sm:text-xl leading-7">
                           Something went wrong: {{ eRror.message }}
                        </h2>
                     </div>
                  <div v-if="photo.photos_likes" class="flex flex-row items-center justify-between mb-4 mt-2 self-center w-full">
                     <div v-if="!photo.photos_likes.find(islike)" @click="likePhoto(photo.id, photo.author)" class="flex flex-row items-center gap-1 ml-5 scale-150 p-2 cursor-pointer border bg-black border-white dark:border-black text-white dark:text-black">
                        <NuxtIcon name="like" class="" />
                        <p class="text-xs">{{ photo.photos_likes.length }}</p>
                     </div>
                     <div v-if="photo.photos_likes.find(islike)" @click="unlikePhoto(photo.id)" class="flex flex-row items-center gap-1 ml-5 scale-150 p-2 cursor-pointer border bg-white border-white dark:border-black text-black dark:text-black">
                        <NuxtIcon name="like" class="" />
                        <p class="text-xs">{{ photo.photos_likes.length }}</p>
                     </div>
                   <button @click="navigateTo('/photos')" class="py-2 px-3 border border-white dark:border-black text-white dark:text-black mr-2">X</button>
                  </div>
               </div>
               <p v-if="index == 0" class="text-white dark:text-black text-xl">Scroll for more</p>

               <UISpinner class="w-full justify-self-center" v-if="imgLoad" />
            </div>
            <div v-if="isLoadMore" class="h-48 w-full z-50 bottom-0 -mt-36 bg-red-500 opacity-0" ref="el">aaaaa</div>
            <p v-if="noPhotos" class="text-white dark:text-black text-xl">That's all :(</p>
         </div>
      </div>
   </div>
</div>
 </template>
 
 <script setup>
definePageMeta({
   layout: 'chat'
})

import { formatTimeAgo } from '@vueuse/core'
import { useInfiniteScroll } from '@vueuse/core';

const el = ref(null)
useInfiniteScroll(el, () => {
   isLoadMore.value = false
   loadPhotos()
   console.log('seen');
})
 
const supabase = useSupabaseClient()
const session = await supabase.auth.getSession();
const route = useRoute()
 
const isLoadMore = ref(false)
const imgLoad = ref(false)
const eRror = ref(null)
const images = ref([])
const minRange = ref(0)
const maxRange = ref(3)
const noPhotos = ref(false)

 
async function loadPhotoURL(){
   imgLoad.value = true
   const {data, error} = await supabase.from('photos').select('*, profiles(*), photos_likes(*)').eq('id', route.params.id)
   console.log(data);
   console.log(error);
   if(!error){
      images.value.push(...data)
      imgLoad.value = false
      setTimeout(() => {
         isLoadMore.value = true
      }, 2500);
   } else {
      eRror.value = error
      imgLoad.value = false
      throw new Error(error)
   }
}

async function loadPhotos(){
   imgLoad.value = true
   const {data, error} = await supabase.from('random_photos')
      .select('*, profiles(*), photos_likes(*)')
      .range(minRange.value, maxRange.value)
   if(!error){
      images.value.push(...data)
      isLoadMore.value = true
      minRange.value += 4
      maxRange.value += 4
      imgLoad.value = false
      if(data.length < 1){
         noPhotos.value = true
         isLoadMore.value = false
      }
   } else {
      imgLoad.value = false
      eRror.value = error
      throw new Error(error)
   }
}

function islike(el){
  return el.user_id == session.data.session.user.id
}

async function likePhoto(photoId, photoAuthor){
   const {error} = await supabase.from('photos_likes').insert({user_id: session.data.session.user.id, photo_id: photoId})
   if(!error){
      loadPhotos()
      await supabase.from('inbox').insert({text: `@${session.data.session.user.id} liked your photo #${photoId}`, user_id: photoAuthor})
   } else{
      eRror.value = error
      throw new Error(error)
   }
   console.log(error);
}
async function unlikePhoto(photoId){
   const {error} = await supabase.from('photos_likes').delete().eq('photo_id', photoId).eq('user_id', session.data.session.user.id)
   if(!error){
      loadPhotos()
   } else{
      eRror.value = error
      throw new Error(error)
   }
   console.log(error);
}

watchEffect(() => {
   loadPhotoURL()
})
 </script>
 