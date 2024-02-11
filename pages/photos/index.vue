<template>
  <!-- <div class="flex flex-col w-full h-screen items-center justify-center">
    <UISpinner v-if="photosLoading" />
  </div> -->
  <div class="flex flex-col relative justify-between">
    <div v-if="photos" class="border-x border-white dark:border-black px-1 xs:px-2 overflow-y-auto grid grid-cols-2 xs:grid-cols-3 gap-3 xs:gap-4 place-items-center">
      <img v-for="(photo, index) in photos" :key="index" :src="photo.img" class="object-cover w-full h-fit cursor-pointer hover:border-2 hover:-p-1 hover:border-white" @click="toPhoto(photo)" alt="photo">
    </div>
    <UISpinner v-if="photosLoading" />

    <p v-if="noPhotos" class="text-xl mt-4 mb-2 text-center text-white dark:text-black">That's all :(</p>
    <div v-if="isLoadMore" class="h-24 z-50 -mt-8 w-48 bg-red-500 opacity-0" ref="el"></div>
  </div>
  </template>

<script setup>
import { useInfiniteScroll } from '@vueuse/core';

const supabase = useSupabaseClient()
const photos = ref([])
const photosLoading = ref(false)
const isLoadMore = ref(false)
const noPhotos = ref(false)
let minRange = ref(0)
let maxRange = ref(11)

const el = ref(null)
useInfiniteScroll(el, () => {
  console.log('aaaa');
   isLoadMore.value = false
   fetchPhotos()
})

async function fetchPhotos(){
  photosLoading.value = true
  const {data, error} = await supabase.from('photos').select().order('created_at', {ascending: false})
    .range(minRange.value, maxRange.value)
    console.log(data);
  if(!error){
    photos.value.push(...data)
    photosLoading.value = false
      isLoadMore.value = true
      minRange.value += 12
      maxRange.value += 12
      if(data.length < 1){
         noPhotos.value = true
         isLoadMore.value = false
      }
  } else {
    photosLoading.value = false
    throw new Error(error)
  }
}

function toPhoto(photo){
  navigateTo(`/photos/${photo.id}`)
}

onMounted(() => {
  fetchPhotos()
})
</script>

<style>

</style>