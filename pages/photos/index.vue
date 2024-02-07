<template>
  <div v-if="photosLoading" class="flex flex-col w-full h-screen items-center justify-center">
    <UISpinner />
  </div>
  <div v-if="photos" class="h-screen border-x border-white dark:border-black px-1 xs:px-2 overflow-y-auto grid grid-cols-2 xs:grid-cols-3 gap-3 xs:gap-4 place-items-center">
    <img v-for="(photo, index) in photos" :key="index" :src="photo.img" class="object-cover w-full h-auto" @click="toPhoto(photo)" alt="photo">
  </div>
</template>

<script setup>
const supabase = useSupabaseClient()
const photos = ref(null)
const photosLoading = ref(false)

async function fetchPhotos(){
  photosLoading.value = true
  const {data, error} = await supabase.from('photos').select()
  if(!error){
    photos.value = data
    photosLoading.value = false
  } else {
    photosLoading.value = false
    throw new Error(error)
  }
}

function toPhoto(photo){
  navigateTo(`/photos/${photo.id}`)
}

watchEffect(() => {
  fetchPhotos()
})
</script>

<style>

</style>