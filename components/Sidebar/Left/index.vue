<template>
   <div class="flex flex-col h-screen">
     <NuxtLink to="/feed">
       <h1 class="pishi p-2 my-2 text-white dark:text-black xs:text-xl sm:text-2xl text-center hover:text-gray-300" :class="defaultTransition">PISHI</h1>
     </NuxtLink>
     <div class="mt-2 space-y-3">
       <SidebarLeftTab :link="'/feed'" :active="route.name == 'feed'">
          <template v-slot:icon>
            <nuxt-icon name="home"></nuxt-icon>
          </template>
          <template v-slot:name>
            Feed
          </template>
        </SidebarLeftTab>
       
       <SidebarLeftTab :link="'/inbox'" :active="route.name == 'inbox'">
         <template v-slot:icon>
           <nuxt-icon name="bell"></nuxt-icon>
         </template>
         <template v-slot:name>
           Notifications
         </template>
       </SidebarLeftTab>
       <SidebarLeftTab :link="`/messages/${userID}`" :active="route.name == 'messages-id'">
         <template v-slot:icon>
           <nuxt-icon name="envelope"></nuxt-icon>
         </template>
         <template v-slot:name>
           Messages
         </template>
       </SidebarLeftTab>
       <SidebarLeftTab :link="`/friends/${userID}`" :active="route.name == 'friends-id'">
         <template v-slot:icon>
           <nuxt-icon name="user-group"></nuxt-icon>
         </template>
         <template v-slot:name>
           Friends
         </template>
       </SidebarLeftTab>
       <SidebarLeftTab :link="'/photos'" :active="route.name == 'photos'">
         <template v-slot:icon>
           <nuxt-icon name="camera"></nuxt-icon>
         </template>
         <template v-slot:name>
           Photos
         </template>
       </SidebarLeftTab>
       <SidebarLeftTab :link="'/settings'" :active="route.name == 'settings'">
         <template v-slot:icon>
           <nuxt-icon name="settings"></nuxt-icon>
         </template>
         <template v-slot:name>
           Settings
         </template>
       </SidebarLeftTab>
       <!-- <SidebarLeftTab @click="logOutUser">
         <template v-slot:icon>
           <nuxt-icon name="leave-door"></nuxt-icon>
         </template>
         <template v-slot:name>
           Log out
         </template>
       </SidebarLeftTab> -->
      </div>

     <div class="flex flex-row items-center justify-center px-2 py-2 mx-auto mt-auto mb-5 cursor-pointer w-14 xl:w-full hover:bg-gray-800 hover:text-gray-300 dark:hover:bg-gray-400">

            <div v-if="user" @click="toUserProfile" class="flex flex-row">
                <img :src="user.avatar" class="w-10 h-10">
                <div class="flex-col ml-2">
                    <h1 v-if="user" class="text-sm hidden sm:block font-bold text-gray-300 dark:text-gray-800">
                        {{ user.name }} {{ user.surname }}
                        <!-- Andrew Andronov -->
                    </h1> 
                    <h1 v-else class="text-sm font-bold text-gray-300 dark:text-gray-800">
                        Undefined
                    </h1> 
                    <p class="text-sm hidden xl:block text-gray-400 dark:text-gray-700">
                        @{{ user.id }}
                        <!-- @andrronov -->
                    </p>
                </div>
            </div>
            <UISpinner v-else />
        </div>
   </div>
 </template>
 
 <script setup>
const {defaultTransition} = useTailwindConfig()
// VARIABLES
const store = useUserStore();
const supabase = useSupabaseClient()
const session = await supabase.auth.getSession();
const route = useRoute()
const user = ref(null)
const userID = session.data.session.user.id;
// ------------------------
console.log(route);

// STORE USER DATA
const { data, pending, error, refresh } = await useAsyncData("", () => {
   console.log('uId ', userID);
   supabase
   .from("profiles").select().eq("id", userID)
   .then((result) => {
      if (result.data.length) {
         store.updateUser(result.data[0]);
      } else{console.log('no result')}
   });
});

// LOG OUT
 async function logOutUser(){
  await supabase.auth.signOut()
  navigateTo('/login')
 }

//  TO USER PROFILE
function toUserProfile(){
  navigateTo(`/profile/${userID}`)
}

watchEffect(() => {
user.value = useGetUserStore()
})
 </script>
 
 <style>
 
 </style>