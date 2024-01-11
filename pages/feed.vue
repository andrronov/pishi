<template>
  <div>
    <MainSection @reload-posts="fetchPosts" :loading="loads.loadPosts">
      <div v-if="posts">

         <!-- POST CONTENT -->

         <div v-for="(post, index) in posts" :key="index">
            <Post>
               <template v-slot:postData>
                  <img :src="post.profiles.avatar" class="w-12 h-12" alt="avatar">
                  <div class="flex flex-col">
                     <p class="font-medium">
                        @{{ post.profiles.id }}</p>
                     <p class="text-sm text-white/50 dark:text-black/50 font-light">
                        <!-- {{ post.created_at }}</p> -->
                        {{ formatTimeAgo(new Date(post.created_at)) }}</p>
                  </div>
               </template>
               <template v-slot:postTitle>
                  <h2 class="text-sm dark:bg-black dark:text-white bg-white text-black text-center sm:text-xl leading-7">
                     {{ post.title }}
                  </h2>
               </template>
               <template v-slot:postText>
                  <p>{{ post.text }}</p>
               </template>
               <template v-slot:postImage>
                  <img src="/football.jpg" alt="">
               </template>

               <!-- POST INTERFACE -->

               <template v-slot:postLikes v-if="post.post_likes">
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
               <template v-slot:commentsButton>
                  <NuxtIcon @click="fetchPostsComments(post.id)" name="comment" :class="defaultButton" class="p-1 scale-150 mr-5" />
               </template>
               <template v-slot:shareButton>
                  <NuxtIcon name="share" :class="defaultButton" class="p-1 scale-150" />
               </template> 
               <template v-if="openComments[post.id]" v-slot:commentSection>
                  <UISpinner class="self-center my-4" v-if="loads.loadComms" />
                  <PostComment v-for="(comm, index) in postComments[post.id]" :key="index" :class="defaultTransition">
                        <template v-slot:nickname>
                           @{{ comm.profiles.id }}
                        </template>
                        <template v-slot:created_at>
                           | {{ formatTimeAgo(new Date(comm.created_at)) }}
                        </template>
                        <template v-slot:commentary>
                           {{ comm.text }}
                        </template>
                        <template v-slot:likes>
                           {{ comm.likes }}
                        </template>
                     </PostComment>
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

const user = useSupabaseUser();
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
      const commsResponse = await supabase.from('post_comments').select('*, profiles(*)').eq('post', postId)
      if(!commsResponse.error){
         postComments[postId] = commsResponse.data
         console.log(postComments);
         loads.loadComms = false
      } else{
         loads.loadComms = false
         console.error(commsResponse.error);
         throw new Error(commsResponse.error)
      }
   // if(!openComments[postId]){
   //    console.log(openComments);
   //    console.log('closed', postId);
   // }
}
// POST A COMMENT
async function postComment(postId){
   console.log('comm', commentText.value, 'post id', postId);;
   // const commentRes = await supabase.from('post_comments').insert({author: session.data.session.user.id})
   const commentRes = await supabase.from('post_comments').insert({author: store.getUser().id, post: postId, text: commentText.value})
   if(!commentRes.error){
      commentText.value = ''
      fetchPostsComments(postId)
      openComments[postId] = true
   }
}

// FETCH LIKES
async function fetchLikes(){}

// LIKE A POST
async function likePost(postId){}

// LOAD POSTS
watchEffect(async () => {
   fetchPosts()
})
</script>
