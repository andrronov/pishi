<template>
  <div v-if="user" class="flex flex-col flex-wrap border-x-2 pt-4 border-white dark:border-black px-2">
    <div class="flex flex-row w-full justify-between items-center">
      <img @click="openImg(user[0].avatar)" :src="user[0].avatar" alt="avatar" class="h-28 w-28 object-cover xs:h-32 xs:w-32 cursor-pointer">
      <div class="hidden xs:flex flex-col items-end xs:items-center gap-2">
        <h1 class="text-base xs:text-xl text-white dark:text-black">{{user[0].name}} {{user[0].surname}}</h1>
        <h3 class="text-sm xs:text-lg text-center text-gray-400 dark:text-gray-600">@{{ user[0].id }}</h3>
      </div>
      <div @click="navigateTo(`/friends/${user[0].id}`)" v-if="userFollowers && userFollowings" class="flex flex-row my-4 cursor-pointer self-center gap-4">
        <div class="flex flex-col items-center">
          <p>Subs</p>
          <p>{{ userFollowers.length }}</p>
        </div>
        <div class="flex flex-col items-center">
          <p>Subscripts</p>
          <p>{{ userFollowings.length }}</p>
        </div>
      </div>
      <UISpinner v-else />
    </div>
    <div class="xs:hidden my-4 flex flex-col items-start self-center gap-2">
      <h1 class="text-base xs:text-xl self-center text-white dark:text-black">{{user[0].name}} {{user[0].surname}}</h1>
      <h3 class="text-sm xs:text-lg text-center text-gray-400 dark:text-gray-600">@{{ user[0].id }}</h3>
    </div>
    <div class="flex flex-row items-center justify-between mt-4">
      <div class="flex flex-row items-center gap-2 my-2">
        <NuxtIcon name="info"></NuxtIcon>
        <p>{{ user[0].profile_status }}</p>
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

    <div v-if="!isMyProfile" class="flex flex-row w-full items-center text-white dark:text-black">
         <button v-if="!isSubed" :class="defaultTransition" @click="subUser(user[0].id)" class="p-3 flex flex-row w-2/4 justify-center items-center gap-2 border-2 border-white dark:border-black hover:text-gray-500 hover:bg-gray-200 cursor-pointer">Subscribe</button>
         <button v-if="isSubed" :class="defaultTransition" class="p-3 bg-white text-black dark:bg-black dark:text-white flex flex-row w-2/4 justify-center items-center gap-2 border-2 border-white dark:border-black hover:text-gray-500 hover:bg-gray-200 cursor-pointer" @click="unSubUser(user[0].id)">Subscribed</button>
         <button @click="toChatWithUser(user[0].id)" :class="defaultTransition" class="p-3 flex flex-row w-2/4 justify-center items-center gap-2 border-2 border-white dark:border-black hover:text-gray-500 hover:bg-gray-200 cursor-pointer">Message</button>
   </div>
   <UISpinner v-if="loads.chat" class="self-center my-4" />

   <button v-if="isMyProfile" @click="profileModal = true" class="p-3 bg-white dark:bg-black text-black dark:text-white mt-1 hover:bg-gray-500" :class="defaultTransition">Change profile</button>

   <!-- photos -->
   <div v-if="userPhotos">
      <h3 class="mt-4 text-xl mb-4">Photos</h3>
    <div class="flex flex-col bg-gray-800 dark:bg-gray-200 border-y-2 border-white dark:border-black py-2 overflow-x-auto">
      <div class="flex flex-row items-center gap-2">
        <img v-for="(photo, index) in userPhotos" :key="index" :src="photo.img" @click="toPhoto(photo)" class="object-cover w-24 h-24 cursor-pointer hover:opacity-70" alt="user photo">
      </div>
    </div>
   </div>

   <!-- posts -->
   <div v-if="userPosts">
    <h3 class="mt-4 text-xl mb-2">Posts</h3>
      <div v-for="(post, index) in userPosts" :key="index">
        <Post @delete="deletePost(post.id)" :isMyPage="isMyProfile">
          <template #postData>
            <div class="flex flex-row items-center gap-4 cursor-pointer" @click="toUser(post.profiles.id)">
               <img :src="post.profiles.avatar" class="w-12 h-12" alt="avatar">
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
          <template #postImage>
              <img @click="openImg(post.img)" :src="post.img" alt="" class="cursor-pointer mx-auto">
          </template>
          <template #postLikes v-if="post.post_likes">
            <div v-if="!post.post_likes.find(islike)" @click="likePost(post.id)" :class="defaultButton" class="flex flex-row items-center gap-1 scale-150 p-1 ml-3 mr-6 cursor-pointer">
               <NuxtIcon name="like" class="" />
               <p class="text-xs">{{ post.post_likes.length }}</p>
            </div>
            <div v-if="post.post_likes.find(islike)" @click="unlikePost(post.id)" class="flex flex-row items-center gap-1 scale-150 p-1 ml-3 mr-6 border-x border-y border-white dark:border-black bg-black text-white dark:bg-white dark:text-black cursor-pointer hover:bg-gray-700 hover:text-gray-300 dark:hover:bg-gray-300 dark:hover:text-gray-700">
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
            <div class="flex flex-row items-center mt-5">
              <input @keydown.enter="postComment(post.id, post)" v-model="commentText" type="text" class="w-full p-2 border-2 border-white dark:border-black bg-black dark:bg-white dark:text-black">
              <button @click="postComment(post.id, post)" class="font-semibold p-2 border-2 border-white dark:border-black" :class="defaultButton">Send</button>
           </div>
            <UISpinner class="self-center my-4" v-if="loads.loadComms" />
            <PostComment v-for="(comm, index) in postComments[post.id]" :key="index" :class="defaultTransition" :userAvatar="comm.avatar">
              <template #commentData>
                <div class="flex min-w-0 gap-x-4 cursor-pointer" @click="toUser(comm.profiles.id)">
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
              <div v-if="comm.post_comment_likes.find(isLikedComment)" class="shrink-0 flex flex-col items-center cursor-pointer hover:bg-gray-700 dark:hover:bg-gray-300" @click="unlikeComment(comm, post.id)">
                 <p class="text-sm text-blue-400 dark:text-blue-600">
                   {{ comm?.post_comment_likes.length }}
                 </p>
                 <p class="mt-1 text-2xl leading-5 text-blue-500">
                   <NuxtIcon name="heart" />
                 </p>
               </div>
              <div v-if="!comm.post_comment_likes.find(isLikedComment)" class="shrink-0 flex flex-col items-center cursor-pointer hover:bg-gray-700 dark:hover:bg-gray-300" @click="likeComment(comm, post.id)">
                 <p class="text-sm text-gray-400 dark:text-gray-600">
                   {{ comm?.post_comment_likes.length }}
                 </p>
                 <p class="mt-1 text-2xl leading-5 text-gray-500">
                   <NuxtIcon name="heart" />
                 </p>
               </div>
             </template>
               </PostComment>
               <p class="text-white bg-red-500 text-center my-2" v-if="errorLog">error, {{ errorLog }}</p>               
              </template>
        </Post>
    </div>
    </div>
    <UISpinner v-if="!userPosts" class="self-center w-full mt-4" />

    <Photo :show="openPhoto" :photo="photoView" @close-modal="openPhoto = false" />

  </div>


  <h2 v-if="user?.error">{{ user?.log?.message }}</h2>

  <ChangeProfile :modal-open="profileModal" @close-modal="profileModal = false" />
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
   loadComms: {},
   chat: false
})
const user = ref(null)
const userPosts = ref(null)
const userFollowings = ref(null)
const userFollowers = ref(null)
const commentText = ref('')
const route = useRoute()
const store = useUserStore()
const supabase = useSupabaseClient()
const session = await supabase.auth.getSession();
const sessionUserId = session.data.session.user.id;
const postComments = reactive({})
const openComments = reactive({})
const errorLog = ref(null)
const isMyProfile = ref(false)
const profileModal = ref(false)
const openPhoto = ref(false)
const photoView = ref(null)
const isSubed = ref(null)
const minRange = ref(0)
const maxRange = ref(2)
const userPhotos = ref(null)
// ------------------------------------

// Check is my profile
function checkIsMyProfile(){
  if(route.params.id === store.getUser().id){
    isMyProfile.value = true
  }
}

// FETCH USER DATA
async function fetchUser(){
  const userRes = await supabase.from('profiles').select().eq('id', route.params.id)
  if(!userRes.error){
    user.value = userRes.data
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
    console.log(userPosts.value);
  }
}
// FETCH POST COMMENTS
async function fetchPostsComments(postId){
    console.log(minRange.value, maxRange.value);
    // if(!postComments[postId]){
      // postComments[postId] = []
    // }
      loads.loadComms = true
      openComments[postId] = !openComments[postId]
      // const comments = await useFetchPostComments(supabase, postId, minRange.value, maxRange.value)
      postComments[postId] = await useFetchPostComments(supabase, postId)
      // postComments[postId].push(...comments)
      console.log(postComments[postId]);
      // minRange.value += 3
      // maxRange.value += 3
      loads.loadComms = false
      
}
// POST A COMMENT
async function postComment(postId, post){
  // console.log(post);
   const commsRes = await usePostComment(supabase, store.getUser().id, postId, commentText.value)
   if(commsRes == "true"){
     await supabase.from('inbox').insert({text: `@${sessionUserId} commented your post #${postId}: ${commentText.value}`, user_id: post.author})
     fetchPostsComments(postId)
    commentText.value = ''
    openComments[postId] = true
  } 
   else{ console.log(commsRes); errorLog.value = commsRes.message }
}
// DELETE POST (dont work for now)
async function deletePost(postId){
  const { error } = await supabase
  .from('posts')
  .delete()
  .eq('id', postId)
  .eq('author', sessionUserId)
  if(!error){
    fetchUserPosts()
  } else{
    console.log(error);
  }
}

// GO TO USER PROFILE
function toUser(userId){
   navigateTo(`/profile/${userId}`)
}

// FETCH USER FOLLOWINGS COUNT
async function fetchFollowings(){
  userFollowings.value = await useFetchFollowings(supabase, route.params.id)
}
// FETCH FOLLOWERS
async function fetchFollowers() {
  function isFollowed(element) {
  return element.who_followed == sessionUserId
}
  userFollowers.value = await useFetchFollowers(supabase, route.params.id)
  isSubed.value = userFollowers.value.find(isFollowed)
}
// FIND IF LIKED
function islike(el){
  return el.user_id == sessionUserId
}
function isLikedComment(el){
   return el.liked_user_id == session.data.session.user.id
}
// OPEN PHOTO
function openImg(img){
  openPhoto.value = true
  photoView.value = img
}

// SUBSCRIBE & UNSUB USER
async function subUser(userId){
  const {data, error} = await supabase.from('followers').insert({who_followed: sessionUserId, whos_following: userId})
  if(!error){
    isSubed.value = true
    await supabase.from('inbox').insert({text: `@${sessionUserId} followed you`, user_id: userId})
  } else {
    errorLog.value = error
    throw new Error(error)
  }
  fetchFollowers()
}
async function unSubUser(userId){
  const {data, error} = await supabase.from('followers').delete().eq('who_followed', sessionUserId, 'whos_following', userId)
  if(!error){
    isSubed.value = false
    const {error} = await supabase.from('inbox').insert({text: `@${sessionUserId} unfollowed you`, user_id: userId})
    console.log(error);
  } else {
    errorLog.value = error
    throw new Error(error)
  }
  fetchFollowers()
}

// LIKE/UNLIKE POST
async function likePost(postId){
  const {data, error} = await supabase.from('post_likes').insert({post_id: postId, user_id: sessionUserId})
  if(!error){
    fetchUserPosts()
    await supabase.from('inbox').insert({text: `@${sessionUserId} liked your post`, user_id: route.params.id})
  } else {
    console.log(error);
  }
}
async function unlikePost(postId){
  const {data, error} = await supabase.from('post_likes').delete().eq('post_id', postId).eq('user_id', sessionUserId)
  if(!error){
    fetchUserPosts()
  } else {
    console.log(error);
  }
}

async function toChatWithUser(userId){
  loads.chat = true
  const chatsRes = [await supabase.from('chats').select('id').eq('user1_id', sessionUserId).eq('user2_id', userId), 
                    await supabase.from('chats').select('id').eq('user2_id', sessionUserId).eq('user1_id', userId)]
  const chatIdRes = chatsRes.find((res) => {
    return res.data.length > 0
  })
    if(chatIdRes){
      loads.chat = false
      navigateTo(`/messages/chat/${chatIdRes.data[0].id}`)
    } else {
      const {data, error} = await supabase.from('chats').insert({user1_id: sessionUserId, user2_id: userId}).select('id')
      navigateTo(`/messages/chat/${data[0].id}`)
      loads.chat = false
    }
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

async function fetchUserPhotos(){
  const {data, error} = await supabase.from('photos').select().eq('author', route.params.id)
  if(!error){
    userPhotos.value = data
  }
}

function toPhoto(photo){
  navigateTo(`/photos/${photo.id}`)
}

onMounted(() => {
  fetchUser()
})
watchEffect(() => {
  checkIsMyProfile()
  fetchUserPosts()
  fetchUserPhotos()
  fetchFollowings()
  fetchFollowers()
})
</script>

<style>

</style>