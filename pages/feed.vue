<template>
   <div>
      <MainSection @reload-posts="fetchPosts">
      <FastInbox class="sm:hidden" />
         
      <select @change="choosePosts" v-model="postSelect" id="posts" class="bg-gray-300 mt-3 border border-gray-200 text-gray-800 text-sm focus:ring-gray-500 focus:border-gray-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white">
      <option value="recs">Recomendations</option>
      <option value="alls">All posts</option>
      </select>

        <div v-if="posts" class="relative">
  
           <!-- POST CONTENT -->
  
           <div v-for="(post, index) in posts" :key="index">
              <Post>
                 <template #postData>
                     <div class="flex flex-row items-center gap-4 cursor-pointer" @click="toUser(post.profiles.id)">
                        <img :src="post.profiles.avatar" class="w-12 object-cover z-20 h-12" alt="avatar">
                        <div class="flex flex-col">
                           <p class="font-medium">
                              @{{ post.profiles.id }}</p>
                           <p class="text-sm text-white/50 dark:text-black/50 font-light">
                              {{ formatTimeAgo(new Date(post.created_at)) }} #{{ post.id }}</p>
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
                 <template v-if="post.img" #postImage>
                    <img @click="openImg(post.img)" :src="post.img" alt="post img" class="cursor-pointer z-20 mx-auto">
                  </template>
  
                 <!-- POST INTERFACE -->
  
                 <template #postLikes v-if="post.post_likes">
                  <div v-if="!post.post_likes.find(islike)" @click="likePost(post.id, post.author)" :class="defaultButton" class="flex z-20 flex-row items-center gap-1 scale-150 p-1 ml-3 mr-6 cursor-pointer">
                     <NuxtIcon name="like" class="" />
                     <p class="text-xs">{{ post.post_likes.length }}</p>
                  </div>
                  <div v-if="post.post_likes.find(islike)" @click="unlikePost(post.id)" class="flex flex-row items-center gap-1 z-20 scale-150 p-1 ml-3 mr-6 border-x border-y border-white dark:border-black bg-black text-white dark:bg-white dark:text-black cursor-pointer hover:bg-gray-700 hover:text-gray-300 dark:hover:bg-gray-300 dark:hover:text-gray-700">
                     <NuxtIcon name="like" class="" />
                     <p class="text-xs">{{ post.post_likes.length }}</p>
                  </div>
               </template>

                 <template #commentsButton>
                    <NuxtIcon @click="fetchPostsComments(post.id)" name="comment" :class="defaultButton" class="p-1 z-20 scale-150 mr-5" />
                 </template>
                 <template #shareButton>
                    <NuxtIcon name="share" :class="defaultButton" class="p-1 scale-150" />
                 </template> 
                 <template v-if="openComments[post.id]" #commentSection>
                  <div class="flex flex-row items-center mt-5">
                     <input @keydown.enter="postComment(post.id, post)" v-model="commentText" type="text" class="w-full p-2 border-2 border-white dark:border-black bg-black dark:bg-white dark:text-black">
                     <button @click="postComment(post.id, post)" class="font-semibold p-2 border-2 border-white dark:border-black" :class="defaultButton">Send</button>
                   </div>
                   <div v-if="loads.loadComms" class="flex flex-col items-center w-full my-4">
                     <UISpinner />
                  </div>
                    <PostComment v-for="(comm, index) in postComments[post.id]" :key="index" :class="defaultTransition">
                       <template #commentData>
                           <div class="flex min-w-0 z-20 gap-x-4 cursor-pointer" @click="toUser(post.profiles.id)">
                              <img class="h-12 w-12 object-cover flex-none bg-gray-50" :src="comm.profiles.avatar" alt="avatar" />
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
                           <div v-if="comm.post_comment_likes.find(isLikedComment)" class="shrink-0 z-20 flex flex-col items-center cursor-pointer hover:bg-gray-700 dark:hover:bg-gray-300" @click="unlikeComment(comm, post.id)">
                              <p class="text-sm text-blue-400 dark:text-blue-600">
                                {{ comm?.post_comment_likes.length }}
                              </p>
                              <p class="mt-1 text-2xl leading-5 text-blue-500">
                                <NuxtIcon name="heart" />
                              </p>
                            </div>
                           <div v-if="!comm.post_comment_likes.find(isLikedComment)" class="shrink-0 flex z-20 flex-col items-center cursor-pointer hover:bg-gray-700 dark:hover:bg-gray-300" @click="likeComment(comm, post.id)">
                              <p class="text-sm text-gray-400 dark:text-gray-600">
                                {{ comm?.post_comment_likes.length }}
                              </p>
                              <p class="mt-1 text-2xl leading-5 text-gray-500 z-20">
                                <NuxtIcon name="heart" />
                              </p>
                            </div>
                          </template>
                       </PostComment>
                       <p class="text-white bg-red-500 text-center my-2" v-if="errorLog">error, {{ errorLog }}</p>
                 </template>
                 </Post>
               </div>
               <div class="flex flex-col items-center w-full my-4">
                  <UISpinner v-if="loads.loadPosts" />
               </div>
               <div v-if="isLoadMore" class="h-52 w-full absolute bottom-0 bg-red-500 opacity-0 z-0" ref="el"></div>
               <h1 v-if="noPosts" class="p-2 text-lg font-medium text-center text-black bg-white dark:text-white dark:bg-black">There's no more posts!</h1>
           <Photo :show="openPhoto" :photo="photoView" @close-modal="openPhoto = false" />
        </div>
        <h3 v-else>Error: {{ errorLog }}</h3>
        <p v-if="posts.length < 1" class="text-white text-center dark:text-black">Create your first post!</p>
      </MainSection>
    </div>
</template>

<script setup>
import { formatTimeAgo } from '@vueuse/core'
import { useInfiniteScroll } from '@vueuse/core';

const {defaultButton, defaultTransition} = useTailwindConfig()

definePageMeta({
  layout: "default",
});

// VARIABLES ---------
const loads = reactive({
   loadPosts: false,
   loadComms: {}
})
const errorLog = ref(null)
const noPosts = ref(false)

let posts = ref([])

let postComments = reactive({})
const openComments = reactive({})
const commentText = ref('')

const openPhoto = ref(false)
const photoView = ref(null)

const supabase = useSupabaseClient();
const session = await supabase.auth.getSession();
const store = useUserStore();

let minRange = ref(0)
let maxRange = ref(2)
const isLoadMore = ref(false)

const postSelect = ref('recs')
// ---------------------

// STORE USER DATA
const { data, pending, error, refresh } = await useAsyncData("", () => {
   const userID = session.data.session.user.id;
   console.log('uId ', userID);
   supabase
   .from("profiles").select().eq("id", userID)
   .then((result) => {
      if (result.data.length) {
         store.updateUser(result.data[0]);
      } else{console.log('no result')}
   });
});

const el = ref(null)
useInfiniteScroll(el, () => {
   isLoadMore.value = false
   if(postSelect.value == 'alls'){
      fetchPosts()
   }
})

// FETCH POSTS
async function fetchPosts(){
   loads.loadPosts = true
   console.log('rang v', minRange.value, maxRange.value);
   const {data, error} = await supabase.from('posts')
      .select('*, profiles(*), post_likes(*)')
      .order('created_at', {ascending: false})
      .range(minRange.value, maxRange.value)
   if(!error){
      posts.value.push(...data)
      console.log(posts.value);
      loads.loadPosts = false
      isLoadMore.value = true
      minRange.value += 3
      maxRange.value += 3
      if(data.length < 1){
         noPosts.value = true
      }
   } else {
      errorLog.value = error
      loads.loadPosts = false
      console.log(error);
      throw Error(error)
   }
}

// FETCH COMMENTS
async function fetchPostsComments(postId){
      loads.loadComms = true
      openComments[postId] = !openComments[postId]
      postComments[postId] = await useFetchPostComments(supabase, postId)
      loads.loadComms = false
}

// POST A COMMENT
async function postComment(postId, post){
   if(commentText.value){
      errorLog.value = null
      const commsRes = await usePostComment(supabase, store.getUser().id, postId, commentText.value)
      if(commsRes){
         if(post.author !== session.data.session.user.id){
            await supabase.from('inbox').insert({text: `@${session.data.session.user.id} commented your post #${postId}: ${commentText.value}`, user_id: post.author})
         }
         fetchPostsComments(postId)
         commentText.value = ''
         openComments[postId] = true
      } 
      else{ console.log(commsRes); errorLog.value = commsRes.message }
   } else {
      errorLog.value = 'You cannot post empty comment'
   }
}

// FIND IF LIKED
function islike(el){
  return el.user_id == session.data.session.user.id
}
function isLikedComment(el){
   return el.liked_user_id == session.data.session.user.id
}

// LIKE/UNLIKE POST
async function likePost(postId, postAuthor){
  const {data, error} = await supabase.from('post_likes').insert({post_id: postId, user_id: session.data.session.user.id}).select()
  if(data){
   const {data, error} = await supabase.from('posts')
      .select('*, profiles(*), post_likes(*)')
      .order('created_at', {ascending: false})
   posts.value = data
   if(postAuthor !== session.data.session.user.id){
      await supabase.from('inbox').insert({text: `@${session.data.session.user.id} liked your post #${postId}`, user_id: postAuthor}   )
   }
  } else {
    console.log(error);
  }
}
async function unlikePost(postId){
  const {data, error} = await supabase.from('post_likes').delete().eq('post_id', postId).eq('user_id', session.data.session.user.id).select()
  if(data){
   const {data, error} = await supabase.from('posts')
      .select('*, profiles(*), post_likes(*)')
      .order('created_at', {ascending: false})
   posts.value = data
  } else {
    console.log(error);
  }
}

// GO TO USER PROFILE
function toUser(userId){
   navigateTo(`/profile/${userId}`)
}

// OPEN PHOTO
function openImg(img){
  openPhoto.value = true
  photoView.value = img
}

async function likeComment(comm, postId){
   const {data, error} = await supabase.from('post_comment_likes').insert({liked_user_id: session.data.session.user.id, comment_id: comm.id})
   if(!error){
      fetchPostsComments(postId)
      openComments[postId] = true
   } else {
      throw new Error(error)
   }
   console.log(error);
}
async function unlikeComment(comm, postId){
   const {data, error} = await supabase.from('post_comment_likes').delete().eq('comment_id', comm.id).eq('liked_user_id', session.data.session.user.id)
   if(!error){
      fetchPostsComments(postId)
      openComments[postId] = true
   } else {
      throw new Error(error)
   }
   console.log(error);
}

async function fetchRecomendations(){
   loads.loadPosts = true
   const followings = await useFetchFollowings(supabase, session.data.session.user.id)
   for(let i = 0; i < followings.length; i++){
      const {data, error} = await supabase.from('posts').select('*, profiles(*), post_likes(*)')
      .eq('author', followings[i].whos_following)
      .order('created_at', {ascending: false})
      if(!error){
         posts.value.push(...data)
      loads.loadPosts = false
      } else {
      errorLog.value = error
      loads.loadPosts = false
      console.log(error);
      throw Error(error)
      }
      
   }
   loads.loadPosts = false
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

// LOAD POSTS
onMounted(() => {
   fetchRecomendations()
})
</script>