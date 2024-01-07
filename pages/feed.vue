<template>
  <div>
    <MainSection :loading="loading">
      <div>
         <Post v-for="(post, index) in posts" :key="index">
            <template v-slot:postData>
               <img src="/me.jpg" class="w-12 h-12" alt="avatar">
               <div class="flex flex-col">
                  <p class="font-medium">@{{ post.author }}</p>
                  <p class="text-sm text-white/50 dark:text-black/50 font-light">today</p>
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
    </MainSection>
  </div>
</template>

<script setup>
definePageMeta({
  layout: "default",
});

const loading = ref(false);

const user = useSupabaseUser();
const supabase = useSupabaseClient();
const session = await supabase.auth.getSession();
const store = useUserStore();

// STORE USER DATA
const { data, pending, error, refresh } = await useAsyncData("", () => {
  const userID = session.data.session.user.id;
  supabase
    .from("profiles").select().eq("id", userID)
    .then((result) => {
      if (result.data.length) {
        store.updateUser(result.data[0]);
      }
    });
});

// UPLOAD POSTS
let posts = ref(null)
watchEffect(async () => {
   const postsResponse = await supabase.from('posts').select().order('created_at')
   posts.value = postsResponse.data
   console.log(posts.value);
})
</script>
