<template>
   <div class="flex flex-col">
    <!-- card 'inbox' -->
      <SidebarRightFastCard v-if="inboxArray" title="Inbox" :link="`/inbox`" @click="navigateTo('/inbox')">
         <div v-for="(notify, index) in inboxArray" :key="index" :class="defaultTransition" class="p-3 border-b text-ellipsis whitespace-nowrap overflow-hidden border-white dark:border-black hover:bg-gray-100 hover:text-gray-900 cursor-pointer dark:hover:bg-gray-900 dark:hover:text-gray-100">
            <p class="text-sm">{{notify.text}}</p>
         </div>
      </SidebarRightFastCard>
       <SidebarRightFastCard v-else title="Inbox" :link="`/inbox`">
         <div :class="defaultTransition" class="p-3 border-b text-ellipsis whitespace-nowrap overflow-hidden border-white dark:border-black hover:bg-gray-100 hover:text-gray-900 cursor-pointer dark:hover:bg-gray-900 dark:hover:text-gray-100">
            <p class="text-sm">Nothing happened</p>
         </div>
       </SidebarRightFastCard>
 
    <!-- card 'who to add' -->
       <SidebarRightFastCard title="Who to add" :link="`/friends/${userId}`">
         <div v-for="(profile, index) in possibleFriendsArray" :key="index" :class="defaultTransition" class="p-3 border-b text-ellipsis whitespace-nowrap overflow-hidden border-white dark:border-black hover:bg-gray-100 hover:text-gray-900 cursor-pointer dark:hover:bg-gray-900 dark:hover:text-gray-100">
             <div @click="navigateTo(`/profile/${profile.id}`)" class="flex flex-row justify-between items-center p-2">
                <img :src="profile.avatar" class="w-14 h-14 object-cover" alt="photo">
                <div class="flex flex-col">
                  <div class="flex flex-row self-center gap-1">
                     <p class="text-center">{{profile.name}}</p>
                     <p class="text-center">{{profile.surname}}</p>
                  </div>
                   <p class="text-center text-[10px] text-gray-300 dark:text-gray-700">@{{profile.id}}</p>
                </div>
                <nuxt-icon name="plus-circle" class="text-4xl"></nuxt-icon>
             </div>
         </div>
       </SidebarRightFastCard>
   </div>

   <Error v-if="errorLog" :error="errorLog" />
 </template>
 
 <script setup>
 const {defaultTransition} = useTailwindConfig()
 const supabase = useSupabaseClient()
 const userId = ref(null)
 const errorLog = ref(null)

const inboxArray = ref(null)
 const possibleFriendsArray = ref()

async function randomizeProfiles(){
   try {
      const {data} = await supabase.from('random_profiles').select().limit(3)
      possibleFriendsArray.value = data
   } catch (error) {
      errorLog.value = error
   }
}
async function fetchInbox(){
   try{
      const {data} = await supabase.from('inbox').select().eq('user_id', userId.value).limit(3).order('created_at', {ascending: false})
      inboxArray.value = data
   } catch(error){
      errorLog.value = error
   }
}

onMounted(() => {
   userId.value = localStorage.getItem('userId')
   randomizeProfiles()
   fetchInbox()
})
 </script>