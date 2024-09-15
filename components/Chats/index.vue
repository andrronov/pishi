<template>
  <UISpinner v-if="loads.chats" />
  <div v-if="chats">
    <div class="flex flex-col">
      <ul v-for="(chat, index) in chats" :key="index" @click="toChat(chat.id)" role="list" class="divide-y divide-gray-100 hover:bg-gray-900 dark:hover:bg-gray-100 hover:cursor-pointer">
        <li class="flex justify-between gap-x-6 py-5">
          <div class="flex min-w-0 gap-x-4">
            <img
            :src="chat.profiles.avatar"
            alt="avatar"
            class="h-12 w-12 object-cover flex-none bg-gray-50"
          />
            <div class="min-w-0 flex-auto">
              <p class="text-base leading-6 text-gray-100 dark:text-gray-900">
                {{ chat.profiles.name }}
                {{ chat.profiles.surname }}
              </p>
              <p class="mt-1 truncate text-sm leading-5 text-gray-400 dark:text-gray-700">
                {{ chat.chat_messages[0]?.text }}
              </p>
            </div>
          </div>
          <div class="mr-2 lg:mr-0">
            <OnlineStatus :prmtrs="chat.profiles.id" />
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
// VARIABLES
const loads = reactive({
  chats: false
})
const supabase = useSupabaseClient();
const session = await supabase.auth.getSession();
const userStore = useUserStore();
const sessUserId = session.data.session.user.id

const chats = ref([])
// ---------------------------------------

async function getChats(){
  loads.chats = true
  const chatData = await getUserChats(supabase, userStore.getUser().id)
  console.log(chatData);
  // const chatData = await useFetch('/api/getUserChats')
  // console.log(chatData);
  //  const chatsRes = [await supabase.from('chats').select('id, user1_id, user2_id, profiles:user2_id(*), chat_messages:id(*)').eq('user1_id', sessUserId).limit(1, { referencedTable: 'chat_messages' }).order('created_at', {ascending: false, referencedTable: 'chat_messages'}), 
  //              await supabase.from('chats').select('id, user1_id, user2_id, profiles:user1_id(*), chat_messages:id(*)').eq('user2_id', sessUserId).limit(1, { referencedTable: 'chat_messages' }).order('created_at', {ascending: false, referencedTable: 'chat_messages'})]
  //  if(chatsRes){
  //     chatsRes.forEach(res => {
  //        chats.value.push(...res.data)
  //     })
  //     console.log(chats.value);
  //     loads.chats = false
  //  } else {
  //   loads.chats = false
  //     console.log('error');
  //  }
}

function toChat(chatId){
  navigateTo(`/messages/chat/${chatId}`);
}

watchEffect(() => {
   getChats()
})
</script>

<style>

</style>