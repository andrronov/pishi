<template>
   <Error v-if="errorLog" :error="errorLog" />
   <div @click.once="setLike" :class="likeStyle" class="relative flex z-20 flex-row items-center gap-1 hover:bg-gray-700 hover:text-gray-300 dark:hover:bg-gray-300 dark:hover:text-gray-700 border-px border-white dark:border-black scale-150 p-1 ml-3 mr-6 cursor-pointer">
      <NuxtIcon name="like" class="" />
      <p class="text-xs">{{ post.post_likes.length }}</p>
   </div>
</template>

<script setup>
const { defaultButton } = useTailwindConfig()

const props = defineProps({
   post: {type: Array}
})

const userId = ref(null)
const isUserLiked = ref(false)
const supabase = useSupabaseClient()
const errorLog = ref(null)

const likeStyle = computed(() => defaultButton && isUserLiked.value ? 'text-gray-100 dark:text-gray-900 bg-black dark:bg-white' : 'bg-gray-100 text-black dark:text-gray-100 dark:bg-black')

async function setLike(){
   if(isUserLiked.value === false){
      try {
         props.post.post_likes.length ++
         isUserLiked.value = true
         await supabase.from('post_likes').insert({post_id: props.post.id, user_id: userId.value})
      } catch (error) {
         errorLog.value = error
         console.error(error);
      }
   } else {
      try {
         props.post.post_likes.length > 1 ? props.post.post_likes.length -- : props.post.post_likes.length = 0
         isUserLiked.value = false
         await supabase.from('post_likes').delete().eq('post_id', props.post.id).eq('user_id', userId.value)
      } catch (error) {
         errorLog.value = error
         console.error(error);
      }
   }
}

onMounted(() => {
   userId.value = localStorage.getItem('userId')
   isUserLiked.value = props.post.post_likes.some(item => item.user_id == userId.value);
})
</script>