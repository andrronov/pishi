<template>
   <div class="flex flex-col">
    <!-- card 'inbox' -->
       <SidebarRightFastCard title="Inbox" :link="`/alerts`">
          <SidebarRightItem v-for="(notify, index) in inboxArray" :key="index">
             <div>
                <p class="text-sm">{{notify.text}}</p>
             </div>
          </SidebarRightItem>
       </SidebarRightFastCard>
 
    <!-- card 'who to add' -->
       <SidebarRightFastCard title="Who to add" :link="`/friends/${sessionUserId}`">
          <SidebarRightItem v-for="(profile, index) in possibleFriendsArray" :key="index">
             <div @click="navigateTo(`/profile/${profile.id}`)" class="flex flex-row justify-between items-center p-2">
                <img :src="profile.avatar" class="w-14 h-14" alt="photo">
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
 // сделай в конце сообщения (это просто строка) иконку по типу нотификации (если кто-то лайкнул, в конце обозначение-иконку лайка)
 const inboxArray = ref([
    {
       text: "@andrronov liked your photo",
       notIcon: null
    },
    {
       text: "@andrronov wants to add you in friends",
       notIcon: null
    },
    {
       text: "@andrronov replied to your commentary",
       notIcon: null
    }
 ])
 const possibleFriendsArray = ref()

async function randomizeProfiles(){
   const {data, error} = await supabase.from('random_profiles').select().limit(3)
   if(!error){
      possibleFriendsArray.value = data
      console.log(possibleFriendsArray.value);
   }
}

watchEffect(() => {
   randomizeProfiles()
})
 </script>
 
 <style>
 
 </style>