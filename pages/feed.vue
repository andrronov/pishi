<template>
  <div>
    <MainSection @reload-posts="fetchPosts" :loading="loading">
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

               <template v-slot:postLikes>
                  <p class="text-xs">1,9K</p></template>
               <template v-slot:commentsButton>
                  <NuxtIcon @click="fetchPostsComments(post.id)" name="comment" class="bg-white text-black dark:bg-black dark:text-white hover:bg-gray-300 hover:text-gray-800 dark:hover:bg-gray-700 dark:hover:text-gray-300 p-1 scale-150 mr-5 cursor-pointer" />
               </template>
               <template v-slot:shareButton>
                  <NuxtIcon name="share" class="bg-white text-black dark:bg-black dark:text-white hover:bg-gray-300 hover:text-gray-800 dark:hover:bg-gray-700 dark:hover:text-gray-300 p-1 scale-150 cursor-pointer" />
               </template> 
               <template v-if="openComments[post.id]" v-slot:commentSection>
                  <UISpinner class="self-center my-4" v-if="commsLoading" />
                  <PostComment v-for="(comm, index) in postComments" :key="index">
                        <template v-slot:nickname>
                           @{{ comm.profiles.id }}
                        </template>
                        <template v-slot:created_at>
                           | {{ formatTimeAgo(new Date(comm.profiles.created_at)) }}
                        </template>
                        <template v-slot:commentary>
                           {{ comm.text }}
                        </template>
                        <template v-slot:likes>
                           {{ comm.likes }}
                        </template>
                     </PostComment>
                     <div class="flex flex-row items-center mt-5">
                        <input @keydown.enter="postComment" v-model="commentText" type="text" class="w-full p-2 border-2 border-white dark:border-black bg-black dark:bg-white dark:text-white">
                        <button @click="postComment" class="text-white font-semibold p-2 border-2 border-white dark:text-black dark:border-black hover:bg-gray-500">Send</button>
                     </div>
               </template>
               </Post>
         </div>
         <p v-if="posts.length < 1" class="text-white text-center dark:text-black">Create your first post!</p>
      </div>
      <h3 v-else>Error: {{ errorLog }}</h3>
    </MainSection>
  </div>
</template>

<script setup>
import { formatTimeAgo } from '@vueuse/core'

definePageMeta({
  layout: "default",
});

const loading = ref(false);
const errorLog = ref(null)

const user = useSupabaseUser();
const supabase = useSupabaseClient();
const session = await supabase.auth.getSession();
const store = useUserStore();

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

async function fetchPosts(){
   loading.value = true
   const postsResponse = await supabase.from('posts').select('id, title, created_at, text, img, profiles(id, avatar, name, surname)').order('created_at', {ascending: false})
   if(!postsResponse.error){
      posts.value = postsResponse.data
      console.log('posts', postsResponse);
      loading.value = false
   } else {
      errorLog.value = postsResponse.error
      loading.value = false
      throw new Error(postsResponse.error)
   }
}

let postComments = ref(null)
const commentText = ref('')
const openComments = reactive({})
const commsLoading = ref(false)

async function fetchPostsComments(postId){
   commsLoading.value = true
   openComments[postId] = !openComments[postId]
   const commsResponse = await supabase.from('post_comments').select('*, profiles(*)').eq('post', postId)
   if(!commsResponse.error){
      postComments.value = commsResponse.data
      console.log(postComments.value);
      commsLoading.value = false
   } else{
      commsLoading.value = false
      console.error(commsResponse.error);
      throw new Error(commsResponse.error)
   }
   if(!openComments[postId]){
      postComments.value = null
   }
}
function postComment(){
   console.log(commentText.value);
}

// LOAD POSTS
let posts = ref(null)
watchEffect(async () => {
   fetchPosts()
})
</script>
