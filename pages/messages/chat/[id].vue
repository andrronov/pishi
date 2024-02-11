<template>
  <div class="w-full realtive flex flex-col items-center h-screen">
    <div @click="toProfile(userProfile.id)" v-if="userProfile" class="w-full cursor-pointer justify-center gap-4 flex flex-row items-center h-10 xs:h-16 bg-black border-2 border-white dark:border-black dark:bg-white hover:bg-gray-500 dark:hover:bg-gray-500">
      <img :src="userProfile.avatar" class="w-9 h-9 xs:w-11 xs:h-11" alt="avatar">
      <div class="flex flex-col items-center text-xs xs:text-base">
        <p class="text-white dark:text-black">{{ userProfile.name }} {{ userProfile.surname }}</p>
        <div class="flex flex-row items-center gap-2" v-if="!isTyping">
          <OnlineStatus :prmtrs="userProfile.id" />
        </div>
        <p v-else class="text-white dark:text-black">typing...</p>
      </div>
    </div>
    <div class="bg-gray-800 dark:bg-gray-200 w-full h-full overflow-y-scroll" id="chat" ref="chat">
      <div v-if="messages" class="flex flex-col w-full justify-around px-4 py-2 gap-4 relative">
        <!-- <div v-if="isLoadMore" class="h-72 w-full absolute top-0 bg-red-500 opacity-50 -mx-4" ref="el"></div> -->
        <div v-for="(msg, index) in messages" :key="index" :class="msg.author == session.data.session.user.id ? 'bg-white text-black dark:bg-black dark:text-white self-end' : 'bg-black text-white dark:bg-white dark:text-black self-start'"
          class="flex flex-row px-1 py-1 text-sm xs:text-base justify-between min-h-10 border-2 border-gray-500 min-w-min max-w-max gap-3" id="myMessage">
          <p>{{ msg.text }}</p>
          <p v-if="msg.created_at.minutes" class="text-gray-500 text-[10px] xs:text-xs self-end">{{ msg.created_at.hour }}:{{ msg.created_at.minutes }}</p>
          <p v-else class="text-gray-500 text-[10px] xs:text-xs self-end">now</p>
          <!-- <p>{{msg.created_at.day}} {{ msg.created_at.month }}</p> -->
        </div>
      </div>
    </div>
    <div v-if="isScrollDown" class="flex flex-row items-center absolute bottom-12">
      <button @click="y = scrollChat" class="p-2 text-black dark:text-white bg-white dark:bg-black mx-auto">down</button>
      <p class="bg-black text-gray-500 dark:bg-white p-2" v-if="unReadenMsg.length > 0">{{unReadenMsg.length}}</p>
    </div>
    <div class="flex flex-row items-center w-full">
      <input v-model="inputMessage" @keydown.enter="sendMessage" @input="userTyping" type="text" class="p-1 text-black dark:text-white dark:bg-black w-full">
      <button @click="sendMessage" class="py-1 w-24 hover:bg-gray-500 bg-black text-white dark:bg-white dark:text-black">Send</button>
    </div>
  </div>
</template>

<script setup>
import { useScroll } from '@vueuse/core'
// import { useInfiniteScroll } from '@vueuse/core';

definePageMeta({
  layout: 'chat'
})

// VARIABLES
const supabase = useSupabaseClient()
const session = await supabase.auth.getSession();
const route = useRoute()

const chat = ref(null)
const isScrollDown = ref(false)
const isTyping = ref(false)
const isLoadMore = ref(false)

const messages = ref([])
const unReadenMsg = ref([])
const inputMessage = ref(null)

const minRange = ref(0)
const maxRange = ref(50)

const userProfile = ref(null)
// -----------------------------
const { y, arrivedState } = useScroll(chat)

watch(y, () => {
  if(arrivedState.bottom){
    isScrollDown.value = false
    unReadenMsg.value = []
  } else {
    isScrollDown.value = true
  }
})

// const el = ref(null)
// useInfiniteScroll(el, async () => {
//    isLoadMore.value = false
//    loadMessages()
//   console.log('loading');
// })

// в подсказках ниже дозагрузка сообщений (кривая)
async function loadMessages(){
  const {data, error} = await supabase.from('chat_messages')
    .select().eq('chat_id', route.params.id)
    // .order('created_at', {ascending: true})
    // .range(minRange.value, maxRange.value)
  if(!error){
    scrollChat()
    data.map((item) => {
      const itemTime = new Date(item.created_at)
      let day = itemTime.getDate()
      let month = itemTime.getMonth() + 1
      const hour = itemTime.getHours()
      let minutes = itemTime.getMinutes()
      minutes < 10 ? minutes = '0' + minutes : minutes
      day < 10 ? day = '0' + day : day
      month < 10 ? month = '0' + month : month
      
      return item.created_at = {hour, minutes, day, month}
    })
    // minRange.value += 51
    // maxRange.value += 51
    messages.value.push(...data)
    // isLoadMore.value = true
    console.log(messages.value);
  }
  console.log(error);
}

async function sendMessage(){
  if(inputMessage.value){
    const {data, error} = await supabase.from('chat_messages').insert({chat_id: route.params.id, author: session.data.session.user.id, text: inputMessage.value})
    if(!error){
      inputMessage.value = null
      scrollChat()
    }
  } else {
    console.log('xxx');
  }
}

supabase
  .channel(`chat-${route.params.id}`)
  .on(
    'postgres_changes',
    {event: '*', schema: 'public', table: 'chat_messages', filter: `chat_id=eq.${route.params.id}`},
    (payload) => {
      console.log('pload', payload);
      messages.value.push(payload.new)
      unReadenMsg.value.push(payload.new)
      if(!isScrollDown.value){
        scrollChat()
      }
    }
  )
  .subscribe()


const chatChannel = supabase.channel(`chat-typing-${route.params.id}`)
  chatChannel.on('broadcast', {event: 'typing'}, (payload) => {
    isTyping.value = true
    setTimeout(() => {
      isTyping.value = false
    }, 2000);
  })
chatChannel.subscribe()

function userTyping(){
  chatChannel.send({type: 'broadcast', event: 'typing', payload: true })
}

onUnmounted(() => {
  chatChannel.unsubscribe()
})
function scrollChat(){
  setTimeout(() => {
    console.log(chat.value.scrollHeight);
  chat.value.scrollTop = chat.value.scrollHeight
  }, 1);
}

async function loadUserProfile(){
  const {data, error} = await supabase.from('chats').select('*, user1_id(avatar, name, surname, id),user2_id(avatar, name, surname, id)').eq('id', route.params.id)
  console.log(data);
  if(!error){
    data.find(user => {
      if(user.user1_id.id !== session.data.session.user.id){
        userProfile.value = user.user1_id
      } else {
        userProfile.value = user.user2_id
      }
    })
  }
}

function toProfile(userId){
  navigateTo(`/profile/${userId}`)
}

watchEffect(() => {
  loadMessages()
  loadUserProfile()
})
</script>