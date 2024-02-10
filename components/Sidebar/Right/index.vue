<template>
   <div class="flex flex-col">
    <!-- card 'inbox' -->
       <SidebarRightFastCard title="Inbox" :link="`/inbox`">
         <div v-if="inboxArray">
            <SidebarRightItem v-for="(notify, index) in inboxArray" :key="index">
               <div>
                  <p class="text-sm">{{notify.text}}</p>
               </div>
            </SidebarRightItem>
         </div>
         <SidebarRightItem v-else>
            <p>Nothing happen</p>
         </SidebarRightItem>
       </SidebarRightFastCard>
 
    <!-- card 'who to add' -->
       <SidebarRightFastCard title="Who to add" :link="`/friends/${sessionUserId}`">
          <SidebarRightItem v-for="(profile, index) in possibleFriendsArray" :key="index">
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
          </SidebarRightItem>
       </SidebarRightFastCard>
   </div>
 </template>
 
 <script setup>
 const supabase = useSupabaseClient()
 const session = await supabase.auth.getSession();
const sessionUserId = session.data.session.user.id

const inboxArray = ref(null)
 const possibleFriendsArray = ref()

async function randomizeProfiles(){
   const {data, error} = await supabase.from('random_profiles').select().limit(3)
   if(!error){
      possibleFriendsArray.value = data
      console.log(possibleFriendsArray.value);
   }
}

async function fetchInbox(){
   const {data, error} = await supabase.from('inbox').select().eq('user_id', sessionUserId).limit(3).order('created_at', {ascending: false})
   if(!error){
      inboxArray.value = data
   }
}

watchEffect(() => {
   randomizeProfiles()
   fetchInbox()
})
 </script>
 
 <style>
 
 </style>