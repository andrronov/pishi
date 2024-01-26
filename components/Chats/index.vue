<template>
  <UISpinner v-if="loads.chats" />
  <div v-if="chats">
    <div class="flex flex-col">
      <ChatsList v-for="(chat, index) in chats" :key="index" @click="toChat(chat.id)">
        <template #avatar>
          <img
            :src="chat.profiles.avatar"
            alt="avatar"
            class="h-12 w-12 flex-none bg-gray-50"
          />
        </template>
        <template #name>
          {{ chat.profiles.name }}
          {{ chat.profiles.surname }}
        </template>
        <!-- /!!!!!!!!!!!/ -->
        <template #nickname> 0 new messages</template>
        <template #lastSeen>
          <div class="shrink-0 flex flex-col items-end">
            <p v-if="false" class="mt-1 text-xs leading-5 text-gray-500">
              <time>3h ago</time>
            </p>
            <div v-else class="mt-1 flex items-center gap-x-1.5">
              <div class="flex-none rounded-full bg-emerald-500/20 p-1">
                <div class="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              </div>
              <p class="text-xs leading-5 text-gray-500">Online</p>
            </div>
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
   const chatsRes = [await supabase.from('chats').select('id, user1_id, user2_id, profiles:user2_id(*)').eq('user1_id', sessUserId), 
               await supabase.from('chats').select('id, user1_id, user2_id, profiles:user1_id(*)').eq('user2_id', sessUserId)]
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