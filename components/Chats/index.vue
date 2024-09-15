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
const userId = ref(null)

const chats = ref([])
// ---------------------------------------

async function getChats(){
  loads.chats = true
  try {
    const chatData = await getUserChats(supabase, userId.value)
    for(let chat of chatData) {
      chats.value.push(...chat.data)
    }
  } catch (error) {
    console.error(error)
  } finally {loads.chats = false}
}

function toChat(chatId){
  navigateTo(`/messages/chat/${chatId}`);
}

onMounted(() => {
  userId.value = localStorage.getItem('userId')
  getChats()
})
</script>

<style>

</style>