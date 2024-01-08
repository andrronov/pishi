<template>
  <div>
    <MainSection @reload-posts="fetchPosts" :loading="loading">
      <div v-if="posts">
         <Post v-for="(post, index) in posts" :key="index">
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
            <template v-slot:postLikes><p class="text-xs">1,9K</p></template>
         </Post>
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
   }
}

// LOAD POSTS
let posts = ref(null)
watchEffect(async () => {
   fetchPosts()
})
</script>
