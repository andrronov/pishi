<template>
  <UISpinner v-if="loads.chats" />
  <div v-if="chats">
    <div class="flex flex-col">
      <ChatsList v-for="(chat, index) in chats" :key="index" @click="toChat(chat.id)">
        <template #avatar>
          <img
            :src="chat.profiles.avatar"
            alt="avatar"
            class="h-12 w-12 object-cover flex-none bg-gray-50"
          />
        </template>
        <template #name>
          {{ chat.profiles.name }}
          {{ chat.profiles.surname }}
        </template>
        <!-- /!!!!!!!!!!!/ -->
        <template #nickname> {{ chat.chat_messages[0]?.text }}</template>
        <template #lastSeen>
          <div class="mr-2 lg:mr-0">
            <OnlineStatus :prmtrs="chat.profiles.id" />
          </div>
        </template>
      </ChatsList>
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
const store = useUserStore();
const sessUserId = session.data.session.user.id

const chats = ref([])
// ---------------------------------------

async function getChats(){
  loads.chats = true
   const chatsRes = [await supabase.from('chats').select('id, user1_id, user2_id, profiles:user2_id(*), chat_messages:id(*)').eq('user1_id', sessUserId).limit(1, { referencedTable: 'chat_messages' }).order('created_at', {ascending: false, referencedTable: 'chat_messages'}), 
               await supabase.from('chats').select('id, user1_id, user2_id, profiles:user1_id(*), chat_messages:id(*)').eq('user2_id', sessUserId).limit(1, { referencedTable: 'chat_messages' }).order('created_at', {ascending: false, referencedTable: 'chat_messages'})]
   if(chatsRes){
      chatsRes.forEach(res => {
         chats.value.push(...res.data)
      })
      console.log(chats.value);
      loads.chats = false
   } else {
    loads.chats = false
      console.log('error');
   }
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