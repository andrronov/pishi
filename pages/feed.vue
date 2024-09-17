<template>
   <div>
      <MainSection @reload-posts="fetchPosts">
      <FastInbox class="sm:hidden" />
         
      <select @change="choosePosts" v-model="postSelect" id="posts" class="bg-gray-300 mt-3 border border-gray-200 text-gray-800 text-sm focus:ring-gray-500 focus:border-gray-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white">
      <option value="recs">Your friends posts</option>
      <option value="alls">All posts</option>
      </select>
      <UISpinner v-if="loads" class="w-full my-4" />

        <div v-if="posts" class="relative">
  
            <Post v-for="(post, index) in posts" :post="post" :key="index" />

            <div v-if="isLoadMore" class="h-52 w-full absolute bottom-0 bg-red-500 opacity-0 z-0" ref="el"></div>
            <h1 v-if="noPosts" class="p-2 text-lg font-medium text-center text-black bg-white dark:text-white dark:bg-black">There's no more posts!</h1>
        </div>
        
        <Error :error="errorLog" v-if="errorLog" />

        <p v-if="posts.length < 1 && !loads" class="text-white text-center dark:text-black">Create your first post!</p>
      </MainSection>
    </div>
</template>

<script setup>
import { useInfiniteScroll } from '@vueuse/core';

const {defaultButton, defaultTransition} = useTailwindConfig()

definePageMeta({
  layout: "default",
});

const loads = ref(false)
const errorLog = ref(null)
const noPosts = ref(false)

const userId = ref(null)

let posts = ref([])

const supabase = useSupabaseClient();

let minRange = ref(0)
let maxRange = ref(2)
const isLoadMore = ref(false)

const postSelect = ref('alls')

const el = ref(null)
useInfiniteScroll(el, () => {
   isLoadMore.value = false
   if(postSelect.value == 'alls'){
      fetchPosts()
   }
})

async function fetchPosts(){
   loads.value = true
   const {data, error} = await supabase.from('posts')
      .select('*, profiles(*), post_likes(*)')
      .order('created_at', {ascending: false})
      .range(minRange.value, maxRange.value)
   if(!error){
      posts.value.push(...data)
      loads.value = false
      isLoadMore.value = true
      minRange.value += 3
      maxRange.value += 3
      if(data.length < 1){
         noPosts.value = true
      }
   } else {
      errorLog.value = error
      loads.value = false
   }
}

async function fetchRecomendations(){
   loads.value = true
   const followings = await useFetchFollowings(supabase, userId.value)
   for(let i = 0; i < followings.length; i++){
      const {data, error} = await supabase.from('posts').select('*, profiles(*), post_likes(*)')
      .eq('author', followings[i].whos_following)
      .order('created_at', {ascending: false})
      if(!error){
         posts.value.push(...data)
      loads.value = false
      } else {
      errorLog.value = error
      loads.value = false
      }
      
   }
   loads.value = false
}

function choosePosts(){
   minRange.value = 0
   maxRange.value = 2
   noPosts.value = false
   posts.value = []
   if(postSelect.value == 'alls'){
      fetchPosts()
   } else {
      fetchRecomendations()
   }
}

onMounted(() => {
   userId.value = localStorage.getItem('userId')
   fetchPosts()
})
</script>