<template>
  <div v-if="user" class="flex flex-col border-x-2 border-white dark:border-black px-2">
    <div class="flex flex-row w-full justify-between items-center">
      <img :src="user[0].avatar" alt="avatar" class="h-20 w-20 xs:h-32 xs:w-32 ">
      <div class="flex flex-col items-end xs:items-center gap-2">
        <h1 class="text-base xs:text-xl text-white dark:text-black">{{user[0].name}} {{user[0].surname}}</h1>
        <h3 class="text-sm xs:text-lg text-center text-gray-400 dark:text-gray-600">@{{ user[0].id }}</h3>
      </div>
      <div class="hidden xs:flex flex-row my-4 self-center gap-4">
        <div class="flex flex-col items-center">
          <p>Subs</p>
          <p>145</p>
        </div>
        <div class="flex flex-col items-center">
          <p>Subscripts</p>
          <p>145</p>
        </div>
      </div>
    </div>
    <div class="xs:hidden flex flex-row my-4 self-center gap-4">
      <div class="flex flex-col items-center">
        <p>Subs</p>
        <p>145</p>
      </div>
      <div class="flex flex-col items-center">
        <p>Subscripts</p>
        <p>145</p>
      </div>
    </div>
    <div class="flex flex-row items-center justify-between mt-4">
      <div class="flex flex-row items-center gap-2">
        <NuxtIcon name="info"></NuxtIcon>
        <p>Infinity to beyond</p>
      </div>
      <div class="shrink-0 flex flex-col items-end">
        <p v-if="false" class="mt-1 text-sm leading-5 text-gray-500">
          <time>3h ago</time>
        </p>
        <div v-else class="mt-1 flex items-center gap-x-1.5">
          <div class="flex-none rounded-full bg-emerald-500/20 p-1">
            <div class="h-1.5 w-1.5 rounded-full bg-emerald-500" />
          </div>
          <p class="text-sm leading-5 text-gray-500">Online</p>
        </div>
      </div>
    </div>
    <div class="h-0.5 my-4 bg-white dark:bg-black w-full"></div>
    <div class="flex flex-row w-full items-center text-white dark:text-black">
      <div :class="defaultTransition" class="p-3 flex flex-row w-2/4 justify-center items-center gap-2 border-2 border-white dark:border-black hover:text-gray-500 hover:bg-gray-200 cursor-pointer">
         <button>Subscribe</button>
      </div>
      <div :class="defaultTransition" class="p-3 flex flex-row w-2/4 justify-center items-center gap-2 border-2 border-white dark:border-black hover:text-gray-500 hover:bg-gray-200 cursor-pointer">
         <button>Message</button>
      </div>
   </div>

   <!-- posts -->
   <div v-if="userPosts">
      <div v-for="(post, index) in userPosts" :key="index">
        <Post>
          <template #postData>
            <div class="flex flex-row items-center gap-4 cursor-pointer" @click="toUser(post.profiles.id)">
               <img :src="post.profiles.avatar" class="w-12 h-12" alt="avatar">
               <div class="flex flex-col">
                  <p class="font-medium">
                     @{{ post.profiles.id }}</p>
                  <p class="text-sm text-white/50 dark:text-black/50 font-light">
                     <!-- {{ post.created_at }}</p> -->
                     {{ formatTimeAgo(new Date(post.created_at)) }}</p>
               </div>
            </div>
        </template>
         <template #postTitle>
          <h2 class="text-sm dark:bg-black dark:text-white bg-white text-black text-center sm:text-xl leading-7">
             {{ post.title }}
          </h2>
          </template>
          <template #postText>
              <p>{{ post.text }}</p>
          </template>
          <template #postImage>
              <img src="/football.jpg" alt="">
          </template>
          <template #postLikes v-if="post.post_likes">
            <div v-if="!post.isLiked" :class="defaultButton" class="flex flex-row items-center gap-1 scale-150 p-1 ml-3 mr-6">
               <NuxtIcon @click="likePost(post.id)" name="like" class="" />
               <p class="text-xs">{{ post.post_likes.length }}</p>
            </div>
            <div v-if="post.isLiked" class="flex flex-row items-center gap-1 scale-150 p-1 ml-3 mr-6 border-x border-y border-white dark:border-black bg-black text-white dark:bg-white dark:text-black cursor-pointer hover:bg-gray-700 hover:text-gray-300 dark:hover:bg-gray-300 dark:hover:text-gray-700">
               <NuxtIcon name="like" class="" />
               <p class="text-xs">{{ post.post_likes.length }}</p>
            </div>
         </template>
         <template #commentsButton>
          <NuxtIcon @click="fetchPostsComments(post.id)" name="comment" :class="defaultButton" class="p-1 scale-150 mr-5" />
          </template>
          <template #shareButton>
              <NuxtIcon name="share" :class="defaultButton" class="p-1 scale-150" />
          </template> 

          <template v-if="openComments[post.id]" #commentSection>
            <UISpinner class="self-center my-4" v-if="loads.loadComms" />
            <PostComment v-for="(comm, index) in postComments[post.id]" :key="index" :class="defaultTransition" :userAvatar="comm.avatar">
              <template #commentData>
                <div class="flex min-w-0 gap-x-4 cursor-pointer" @click="toUser(comm.profiles.id)">
                   <img class="h-12 w-12 flex-none bg-gray-50" :src="comm.profiles.avatar" alt="avatar" />
                   <div class="min-w-0 flex-auto">
                      <p class="text-sm leading-6 text-gray-400 dark:text-gray-600">
                         @{{ comm.profiles.id }}
                         | {{ formatTimeAgo(new Date(comm.created_at)) }}
                      </p>
                      <p class="mt-1 text-xs leading-5 text-gray-200 dark:text-gray-900">
                         {{ comm.text }}
                      </p>
                   </div>
                </div>
             </template>
                  <template #likes>
                     {{ comm.likes }}
                  </template>
               </PostComment>
               <p class="text-white bg-red-500 text-center my-2" v-if="errorLog">error, {{ errorLog }}</p>

               <div class="flex flex-row items-center mt-5">
                  <input @keydown.enter="postComment(post.id)" v-model="commentText" type="text" class="w-full p-2 border-2 border-white dark:border-black bg-black dark:bg-white dark:text-white">
                  <button @click="postComment(post.id)" class="font-semibold p-2 border-2 border-white dark:border-black" :class="defaultButton">Send</button>
               </div>
         </template>
        </Post>
    </div>
    </div>
    <UISpinner v-if="!userPosts" class="self-center w-full mt-4" />
  </div>


  <h2 v-if="user?.error">{{ user?.log?.message }}</h2>
</template>

<script setup>
import { formatTimeAgo } from '@vueuse/core'
const {defaultTransition, defaultButton} = useTailwindConfig()
definePageMeta({
   layout: 'profile'
})

// VARIABLES
const loads = reactive({
   loadPosts: false,
   loadComms: {}
})
const user = ref(null)
const userPosts = ref(null)
const commentText = ref('')
const route = useRoute()
const store = useUserStore()
const supabase = useSupabaseClient()
const postComments = reactive({})
const openComments = reactive({})
const errorLog = ref(null)
// -------------------


async function fetchUser(){
  const userRes = await supabase.from('profiles').select().eq('id', route.params.id)
  if(!userRes.error){
    user.value = userRes.data
    console.log(user.value);
  }
  else{
    user.value = {
      error: true,
      log: userRes.error
    }
    throw new Error(userRes.error)
  }
}

// FETCH USER POSTS
async function fetchUserPosts(){
  if(user.value){
    userPosts.value = await useFetchUserPosts(supabase, route.params.id)
  }
}
// FETCH POST COMMENTS
async function fetchPostsComments(postId){
      loads.loadComms = true
      openComments[postId] = !openComments[postId]
      postComments[postId] = await useFetchPostComments(supabase, postId)
      loads.loadComms = false
}
// POST A COMMENT
async function postComment(postId){
   const commsRes = await usePostComment(supabase, store.getUser().id, postId, commentText.value)
   if(commsRes == "true"){commentText.value = ''; fetchPostsComments(postId); openComments[postId] = true; console.log(commsRes);} 
   else{ console.log(commsRes); errorLog.value = commsRes.message }
}

// GO TO USER PROFILE
function toUser(userId){
  console.log(userId);
   navigateTo(`/profile/${userId}`)
}

onMounted(() => {
  fetchUser()
})
watchEffect(() => {
  fetchUserPosts()
})
</script>

<style>

</style>