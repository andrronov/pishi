<template>
   <div>
      <MainSection @reload-posts="fetchPosts" :loading="loads.loadPosts">
        <div v-if="posts">
  
           <!-- POST CONTENT -->
  
           <div v-for="(post, index) in posts" :key="index">
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
  
                 <!-- POST INTERFACE -->
  
                 <template #postLikes v-if="post.post_likes">
                    <div v-if="!post.isLiked" :class="defaultButton" class="flex flex-row items-center gap-1 scale-150 p-1 ml-3 mr-6">
                       <NuxtIcon @click="likePost(post.id)" name="like" class="" />
                       <p class="text-xs">{{ post.post_likes.length }}</p>
                    </div>
                    <div v-if="post.isLiked" class="flex flex-row items-center gap-1 scale-150 p-1 ml-3 mr-6 border-x border-y border-white dark:border-black bg-black text-white dark:bg-white dark:text-black cursor-pointer hover:bg-gray-700 hover:text-gray-300 dark:hover:bg-gray-300 dark:hover:text-gray-700">
                       <NuxtIcon name="like" class="" />
                       <p class="text-xs">{{ post.post_likes.length }}</p>
                    </div>
                    
                    <!-- <div class="flex flex-row items-center gap-1 scale-150 p-1 ml-3 mr-6 border-x border-y border-white dark:border-black bg-black text-white dark:bg-white dark:text-black cursor-pointer hover:bg-gray-700 hover:text-gray-300 dark:hover:bg-gray-300 dark:hover:text-gray-700">
                    <NuxtIcon @click="likePost(post.id)" v-model="post.isLiked" name="like" :class="post.isLiked ? 'text-green-500' : 'text-red-500' "  />
                       <p class="text-xs">{{ post.post_likes.length }}</p>
                    </div> -->
                 </template>
                 <template #commentsButton>
                    <NuxtIcon @click="fetchPostsComments(post.id)" name="comment" :class="defaultButton" class="p-1 scale-150 mr-5" />
                 </template>
                 <template #shareButton>
                    <NuxtIcon name="share" :class="defaultButton" class="p-1 scale-150" />
                 </template> 
                 <template v-if="openComments[post.id]" #commentSection>
                    <UISpinner class="self-center my-4" v-if="loads.loadComms" />
                    <PostComment v-for="(comm, index) in postComments[post.id]" :key="index" :class="defaultTransition">
                       <template #commentData>
                           <div class="flex min-w-0 gap-x-4 cursor-pointer" @click="toUser(post.profiles.id)">
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
        <h3 v-else>Error: {{ errorLog }}</h3>
        <p v-if="posts.length < 1" class="text-white text-center dark:text-black">Create your first post!</p>
      </MainSection>
    </div>
</template>

<script setup>
import { formatTimeAgo } from '@vueuse/core'
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

let posts = reactive({})

let postComments = reactive({})
const openComments = reactive({})
const commentText = ref('')

let likes = reactive({})
const isLiked = ref(false)

const supabase = useSupabaseClient();
const session = await supabase.auth.getSession();
const store = useUserStore();
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

// FETCH POSTS
async function fetchPosts(){
   loads.loadPosts = true
   const postsResponse = await supabase.from('posts').select('id, title, created_at, text, img, profiles(id, avatar, name, surname), post_likes(id, post_id, user_id, created_at)').order('created_at', {ascending: false})
   if(!postsResponse.error){
      posts = postsResponse.data
      console.log('psts', posts);
      // check if liked
      posts.forEach(post => {
         post.post_likes.forEach(el => post.isLiked = (el.user_id == store.getUser().id))
      })
      loads.loadPosts = false
   } else {
      errorLog.value = postsResponse.error
      loads.loadPosts = false
      console.log(postsResponse.error);
      throw Error(postsResponse.error)
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
async function postComment(postId){
   const commsRes = await usePostComment(supabase, store.getUser().id, postId, commentText.value)
   if(commsRes){commentText.value = ''; fetchPostsComments(postId); openComments[postId] = true; console.log(commsRes);} 
   else{ console.log(commsRes); errorLog.value = commsRes.message }
}

// FETCH LIKES
async function fetchLikes(){}

// LIKE A POST
async function likePost(postId){}

// GO TO USER PROFILE
function toUser(userId){
   navigateTo(`/profile/${userId}`)
}

// LOAD POSTS
onMounted(() => {
   fetchPosts()
})
</script>