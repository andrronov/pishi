<template>
   <div class="relative flex flex-col w-full gap-4 p-4 my-4 border-y-2 border-white dark:border-black bg-gray-800 text-white dark:bg-gray-200 dark:text-black" id="wrapper">
      
      <UILoading v-if="loading" />

      <div class="flex w-full flex-row justify-between relative items-center mb-6">
         <div class="flex flex-row items-center gap-4">
            <div class="flex flex-row items-center gap-4 cursor-pointer" @click="toUser(post.profiles.id)">
               <img :src="post.profiles.avatar" class="w-12 object-cover z-20 h-12" alt="avatar">
               <div class="flex flex-col">
                  <p class="font-medium">
                     @{{ post.profiles.id }}</p>
                  <p class="text-sm text-white/50 dark:text-black/50 font-light">
                     {{ formatTimeAgo(new Date(post.created_at)) }} #{{ post.id }}</p>
               </div>
            </div>
         </div>
         <NuxtIcon name="threepoints" @click="showPostMenu = true" class="justify-self-end cursor-pointer" />
         <PostMenu v-if="showPostMenu" :isMyPage="post.profiles.id == userId" :show="showPostMenu" @delete="$emit('delete')" @close-modal="showPostMenu = false" />
      </div>

      <h2 class="text-sm dark:bg-black dark:text-white bg-white text-black text-center sm:text-xl leading-7">
         {{ post.title }}
      </h2>

      <p>{{ post.text }}</p>
      
      <img v-if="post.img" @click="openImg(post.img)" :src="post.img" alt="post img" class="cursor-pointer z-20 mx-auto">
      
      <div class="flex flex-row h-auto items-center">
         <PostLike :post="post" />
         <NuxtIcon @click="fetchPostsComments(post.id)" name="comment" :class="defaultButton" class="p-1 z-20 scale-150 mr-5" />
         <!-- <NuxtIcon name="share" :class="defaultButton" class="p-1 scale-150" /> -->
      </div>
      
      <div class="overflow-y-scroll max-h-56" v-if="postComments">
         <div class="flex flex-row items-center mt-5">
            <input @keydown.enter="postComment(post.id, post)" v-model="commentText" type="text" class="w-full p-2 border-2 border-white dark:border-black bg-black dark:bg-white dark:text-black">
            <button @click="postComment(post.id, post)" class="font-semibold p-2 border-2 border-white dark:border-black" :class="defaultButton">Send</button>
          </div>
         <PostComment v-for="(comm, index) in postComments" :comm="comm" :key="index" :class="defaultTransition" />
      </div>
   </div>
</template>
<!-- Разобраться с лайками (как на пост, так и на коммент) -->
<script setup>
import { formatTimeAgo } from '@vueuse/core'

const { defaultButton, defaultTransition } = useTailwindConfig()
const supabase = useSupabaseClient()
const postComments = ref(null)
const loading = ref(false)
const showPostMenu = ref(false)

const userId = computed(() => localStorage.getItem('userId'))

const props = defineProps({
   post: {type: Object}
})

// FETCH COMMENTS
async function fetchPostsComments(postId){
      loading.value = true
      if(postComments.value == null){
         const data =  await useFetchPostComments(supabase, postId)
         postComments.value = data
      } else postComments.value = null
      loading.value = false
}
</script>