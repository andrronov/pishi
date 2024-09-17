<template>
  <UILoading v-if="loading" />

  <div class="flex flex-col flex-wrap border-x-2 pt-4 border-white dark:border-black px-2">
    <div class="flex flex-row w-full justify-between items-center">
      <img v-if="user?.avatar" @click="photoView = user.avatar" :src="user.avatar" alt="avatar" class="h-28 w-28 object-cover xs:h-32 xs:w-32 cursor-pointer">
      <img v-else class="h-28 w-28 object-cover xs:h-32 xs:w-32 cursor-pointer bg-gray-600 dark:bg-gray-400">
      <div v-if="user?.id" class="hidden xs:flex flex-col items-end xs:items-center gap-2">
        <h1 class="text-base xs:text-xl text-white dark:text-black">{{user.name}} {{user.surname}}</h1>
        <h3 class="text-xs xs:text-sm text-center text-gray-400 dark:text-gray-600">@{{ user.id }}</h3>
      </div>
      <div @click="navigateTo(`/friends/${user.id}`)" class="flex flex-row my-4 cursor-pointer self-center gap-4 text-white dark:text-black">
        <div class="flex flex-col items-center">
          <p>Subs</p>
          <p v-if="userFollowers">{{ userFollowers.length }}</p>
          <p v-else>-</p>
        </div>
        <div class="flex flex-col items-center">
          <p>Subscripts</p>
          <p v-if="userFollowings">{{ userFollowings.length }}</p>
          <p v-else>-</p>
        </div>
      </div>
    </div>
    <div v-if="user?.id" class="xs:hidden my-4 flex flex-col items-start self-center gap-2">
      <h1 class="text-base xs:text-xl self-center text-white dark:text-black">{{user.name}} {{user.surname}}</h1>
      <h3 class="text-sm xs:text-lg text-center text-gray-400 dark:text-gray-600">@{{ user.id }}</h3>
    </div>
    <div class="flex flex-col items-center justify-between mt-4">
      <div class="flex flex-row items-center gap-2 my-2" v-if="user?.profile_status">
        <NuxtIcon name="info" class="text-white dark:text-black"></NuxtIcon>
        <p class="text-white dark:text-black">{{ user.profile_status }}</p>
      </div>
      <OnlineStatus :prmtrs="$route.params.id" />
    </div>

    <div class="h-0.5 my-4 bg-white dark:bg-black w-full"></div>

    <div v-if="userId != $route.params.id" class="flex flex-row w-full items-center text-white dark:text-black">
         <button v-if="!isSubed" :class="defaultTransition" @click="subUser" class="p-3 flex flex-row w-2/4 justify-center items-center gap-2 border-2 border-white dark:border-black hover:text-gray-500 hover:bg-gray-200 cursor-pointer">Subscribe</button>
         <button v-else :class="defaultTransition" class="p-3 bg-white text-black dark:bg-black dark:text-white flex flex-row w-2/4 justify-center items-center gap-2 border-2 border-white dark:border-black hover:text-gray-500 hover:bg-gray-200 cursor-pointer" @click="unSubUser">Subscribed</button>
         <button @click="toChatWithUser" :class="defaultTransition" class="p-3 flex flex-row w-2/4 justify-center items-center gap-2 border-2 border-white dark:border-black hover:text-gray-500 hover:bg-gray-200 cursor-pointer">Message</button>
   </div>

   <button v-else @click="showChangeProfileModal = true" class="p-3 bg-white dark:bg-black text-black dark:text-white mt-1 hover:bg-gray-500" :class="defaultTransition">Change profile</button>

   <!-- photos -->
   <div v-if="userPhotos.length > 0" class="text-white dark:text-black">
      <h3 class="mt-4 text-xl mb-4">Photos</h3>
    <div class="flex flex-col bg-gray-800 dark:bg-gray-200 border-y-2 border-white dark:border-black py-2 overflow-x-auto">
      <div class="flex flex-row items-center gap-2">
        <img v-for="(photo, index) in userPhotos" :key="index" :src="photo?.img" @click="toPhoto(photo)" class="object-cover w-24 h-24 cursor-pointer hover:opacity-70" alt="user photo">
      </div>
    </div>
   </div>

   <!-- posts -->
   <div v-if="userPosts.length > 0" class="text-white dark:text-black">
      <h3 class="mt-4 text-xl mb-2">Posts</h3>
      <Post v-for="(post, index) in userPosts" :post="post" :key="index" />
    </div>
    <h3 v-else-if="loading = false" class="mt-4 text-xl mb-2">This user don't have any posts</h3>
    <!-- <UISpinner v-if="!userPosts" class="self-center w-full mt-4" /> -->
  </div>
  
  <Photo v-if="photoView" :photo="photoView" @close-modal="photoView = null" />
  <ChangeProfile v-if="showChangeProfileModal" @close-modal="showChangeProfileModal = false" />
  <Error v-if="errorLog" :error="errorLog" />
</template>

<script setup>
import { formatTimeAgo } from '@vueuse/core'

const {defaultTransition, defaultButton} = useTailwindConfig()
definePageMeta({
   layout: 'profile'
})

const user = ref(null)
const userId = ref(null)
const userPosts = ref([])
const userFollowings = ref(null)
const userFollowers = ref(null)
const loading = ref(true)
const supabase = useSupabaseClient()
const route = useRoute()
const errorLog = ref(null)
const showChangeProfileModal = ref(false)
const photoView = ref(null)
const isSubed = ref(null)
const userPhotos = ref([])
// ------------------------------------

onBeforeMount(() => {
  userId.value = localStorage.getItem('userId')
  fetchUser()
})

async function fetchUser(){
  try {
    const {data} = await supabase.from('profiles').select().eq('id', route.params.id)
    user.value = data[0]
  } catch (error) {
    errorLog.value = error
    console.error(error);    
  }
}

async function fetchUserPosts(){
  try {
      if(user.value){
        loading.value = true
        userPosts.value = await useFetchUserPosts(supabase, route.params.id)
      }
    } catch (error) {
      errorLog.value = error
      console.error(error);
    } finally {loading.value = false}
  }

async function fetchFollowings(){
  try {
    userFollowings.value = await useFetchFollowings(supabase, route.params.id)
  } catch (error) {
    errorLog.value = error
    console.error(error);    
  }
}
async function fetchFollowers() {
  try {
    userFollowers.value = await useFetchFollowers(supabase, route.params.id)
    isSubed.value = userFollowers.value.find(el => el.who_followed == userId.value)
  } catch (error) {
    errorLog.value = error
    console.error(error);    
  }
}

async function subUser(){
  try {
    await supabase.from('followers').insert({who_followed: userId.value, whos_following: route.params.id})
    isSubed.value = true
    await supabase.from('inbox').insert({text: `@${userId.value} followed you`, user_id: route.params.id})
    await fetchFollowers()
  } catch (error) {
    errorLog.value = error
    console.error(error); 
  }
}
async function unSubUser(){
  try {
    await supabase.from('followers').delete().eq('who_followed', userId.value, 'whos_following', userId.value)
    isSubed.value = false
    await supabase.from('inbox').insert({text: `@${userId.value} unfollowed you`, user_id: route.params.id})
    await fetchFollowers()
  } catch (error) {
    errorLog.value = error
    console.error(error);
  }
}

async function toChatWithUser(){
  loading.value = true
  try {
    const chatsRes = [await supabase.from('chats').select('id').eq('user1_id', userId.value).eq('user2_id', route.params.id), await supabase.from('chats').select('id').eq('user2_id', userId.value).eq('user1_id', route.params.id)].find((res) => {
      return res.data.length > 0
    })
      if(chatsRes){
        navigateTo(`/messages/chat/${chatsRes.data[0].id}`)
      } else {
        const {data, error} = await supabase.from('chats').insert({user1_id: userId.value, user2_id: route.params.id}).select('id')
        navigateTo(`/messages/chat/${data[0].id}`)
      }
  } catch (error) {
    errorLog.value = error
    console.error(error)    
  } finally {loading.value = false}
}

async function fetchUserPhotos(){
  try {
    const {data} = await supabase.from('photos').select().eq('author', route.params.id)
    userPhotos.value = data
  } catch (error) {
    errorLog.value = error
    console.error(error)    
  }
}

function toPhoto(photo){
  navigateTo(`/photos/${photo.id}`)
}

onMounted(async() => {
  await fetchUserPhotos()
  await fetchFollowings()
  await fetchFollowers()
})

watchEffect(() => {
  fetchUserPosts()
})
</script>

<style>

</style>