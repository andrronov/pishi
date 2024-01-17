<template>
  <!-- <Post /> 
  <PostComment /> -->
  <!-- <Friends /> -->
  <div v-if="posts">
    <PostTest v-for="(post, index) in posts" :key="index"
     :avatar="post.profiles.avatar"
     :nickname="post.profiles.id"
     :created_at="post.created_at"
     :title="post.title"
     :post-text="post.text"
     :post-image="post.img"
     :index="post.id"
     :likes="post.post_likes.length"
      />
  </div>
</template>

<script setup>
definePageMeta({
  layout: "default",
});

const posts = ref(null)
const postLikes = ref(null)
const supabase = useSupabaseClient()
const route = useRoute()

async function fetchPosts(){
  const postsRes = await supabase.from('posts').select('id, title, created_at, text, img, profiles(id, avatar, name, surname), post_likes(id, post_id, user_id, created_at)').order('created_at', {ascending: false})
  posts.value = postsRes.data
  console.log('posts', posts.value);
}

const aaa = await useFetchUserPosts(supabase, '8f27769c-47d6-484f-a8c2-68bb1ae69091')
console.log('aaa ', aaa);

watchEffect(() => {
  fetchPosts()
})
</script>
