<template>
   <div class="relative flex flex-col w-full gap-4 p-4 my-4 border-y-2 border-white dark:border-black bg-gray-800 text-white dark:bg-gray-200 dark:text-black" id="wrapper">
      
      <UILoading v-if="loading" />
      <Error v-if="errorLog" :error="errorLog" />
      <UIPhoto v-if="showImg" :photo="post.img" @close-modal="showImg = false" />

      <div class="flex w-full flex-row justify-between relative items-center mb-6">
         <div class="flex flex-row items-center gap-4">
            <div class="flex flex-row items-center gap-4 cursor-pointer" @click="$router.push(`profile/${post.profiles.id}`)">
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
         <PostMenu v-if="showPostMenu" :postId="post.id" :isMyPage="post.profiles.id == userId" @close-modal="showPostMenu = false" />
      </div>

      <h2 class="text-sm dark:bg-black dark:text-white bg-white text-black text-center sm:text-xl leading-7">
         {{ post.title }}
      </h2>

      <p>{{ post.text }}</p>
      
      <img v-if="post.img" @click="showImg = true" :src="post.img" alt="post img" class="cursor-pointer z-20 mx-auto">
      
      <div class="flex flex-row h-auto items-center">
         <PostLike :post="post" />
         <NuxtIcon @click="openPostComments(post.id)" name="comment" :class="defaultButton" class="p-1 z-20 scale-150 mr-5" />
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
const postComments = ref(null)
const showPostMenu = ref(false)
const showImg = ref(false)
const commentText = ref('')
const supabase = useSupabaseClient()
const loading = ref(false)
const errorLog = ref(null)

const userId = computed(() => localStorage.getItem('userId'))

const props = defineProps({
   post: {type: Object}
})

async function openPostComments(postId){
      loading.value = true
      if(postComments.value == null){
         try {
            postComments.value = await useFetchPostComments(supabase, postId)
         } catch (error) {
            errorLog.value = error            
         }
      } else postComments.value = null
      loading.value = false
}

async function postComment(postId, post){
   if(commentText.value){
      try {
         loading.value = true
         await usePostComment(supabase, userId.value, postId, commentText.value)
         commentText.value = ''
         postComments.value = await useFetchPostComments(supabase, postId)
         if(post.author !== userId.value){
            await supabase.from('inbox').insert({text: `@${userId.value} commented your post #${postId}: ${commentText.value}`, user_id: post.author})
         }
      } catch (error) {
         errorLog.value = error
      } finally {loading.value = false}
   }
}
</script>