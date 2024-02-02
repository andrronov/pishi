<template>
  <div class="w-full realtive flex flex-col items-center h-screen">
    <div @click="toProfile(userProfile.id)" v-if="userProfile" class="w-full cursor-pointer justify-center gap-4 flex flex-row items-center h-10 xs:h-16 bg-black border-2 border-white">
      <img :src="userProfile.avatar" class="w-9 h-9 xs:w-11 xs:h-11" alt="avatar">
      <div class="flex flex-col items-center text-xs xs:text-base">
        <p>{{ userProfile.name }} {{ userProfile.surname }}</p>
        <div class="flex flex-row items-center gap-2">
        <p class="text-gray-400 dark:text-gray-600 text-xs xs:text-sm">Online</p> <div class="h-1.5 w-1.5 rounded-full bg-emerald-500" />
        </div>
      </div>
    </div>
    <div class="bg-gray-800 dark:bg-gray-200 w-full h-full overflow-y-scroll" id="chat" ref="chat">
      <div v-if="messages" class="flex flex-col w-full justify-around px-4 py-2 gap-4">
        <div v-for="(msg, index) in messages" :key="index" :class="msg.author == session.data.session.user.id ? 'bg-white text-black dark:bg-black dark:text-white self-end' : 'bg-black text-white dark:bg-white dark:text-black self-start'"
          class="flex flex-row px-1 py-1 text-sm xs:text-base justify-between min-h-10 border-2 border-gray-500 min-w-min max-w-max gap-3" id="myMessage">
          <p>{{ msg.text }}</p>
          <p v-if="msg.created_at.minutes" class="text-gray-500 text-[10px] xs:text-xs self-end">{{ msg.created_at.hour }}:{{ msg.created_at.minutes }}</p>
          <p v-else class="text-gray-500 text-[10px] xs:text-xs self-end">now</p>
        </div>
      </div>
    </div>
    <button v-if="isScrollDown" @click="y = scrollChat" class="absolute bottom-12 p-2 text-black dark:text-white bg-white dark:bg-black mx-auto">down</button>
    <div class="flex flex-row items-center w-full">
      <input v-model="inputMessage" @keydown.enter="sendMessage" type="text" class="p-1 text-black dark:text-white dark:bg-black w-full">
      <button @click="sendMessage" class="py-1 w-24 hover:bg-gray-500">Send</button>
    </div>
  </div>
</template>

<script setup>
import { useScroll } from '@vueuse/core'

definePageMeta({
  layout: 'chat'
})

// VARIABLES
const supabase = useSupabaseClient()
const session = await supabase.auth.getSession();
const route = useRoute()

const chat = ref(null)
const isScrollDown = ref(false)

const messages = ref([])
const inputMessage = ref(null)

const userProfile = ref(null)
// -----------------------------
const { y, arrivedState } = useScroll(chat)

watch(y, () => {
  if(arrivedState.bottom){
    isScrollDown.value = false
  } else {
    isScrollDown.value = true
  }
})

async function loadMessages(){
  const {data, error} = await supabase.from('chat_messages').select().eq('chat_id', route.params.id)
  if(!error){
    scrollChat()
    data.map((item) => {
      const itemTime = new Date(item.created_at)
      const hour = itemTime.getHours()
      let minutes = itemTime.getMinutes()
      if(minutes < 10){
        minutes = '0' + minutes
      }
      return item.created_at = {hour, minutes}
    })
    messages.value.push(...data)
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

const messgs = supabase
  .channel(`chat-${route.params.id}`)
  .on(
    'postgres_changes',
    {event: '*', schema: 'public', table: 'chat_messages', filter: `chat_id=eq.${route.params.id}`},
    (payload) => {
      console.log('pload', payload);
      messages.value.push(payload.new)
      if(!isScrollDown.value){
        scrollChat()
      }
    }
  )
  .subscribe()

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