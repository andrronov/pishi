<template>
  <div class="flex flex-col">
    <!-- card 'inbox' -->
    <SidebarRightFastCard title="Followers" :link="`/friends/${route.params.id}`">
      <div v-for="(frnd, index) in userFollowers" :key="index" :class="defaultTransition" class="p-3 border-b text-ellipsis whitespace-nowrap overflow-hidden border-white dark:border-black hover:bg-gray-100 hover:text-gray-900 cursor-pointer dark:hover:bg-gray-900 dark:hover:text-gray-100">
         <div @click="navigateTo(`/profile/${frnd.profiles.id}`)" class="flex flex-row justify-between items-center p-1.5">
            <img :src="frnd.profiles.avatar" class="w-11 h-11 object-cover" alt="photo">
            <div class="flex flex-col">
              <div class="flex flex-row self-end gap-1">
                 <p class="text-center">{{frnd.profiles.name}}</p>
                 <p class="text-center">{{frnd.profiles.surname}}</p>
              </div>
               <p class="text-center text-[10px] text-gray-300 dark:text-gray-700">@{{frnd.profiles.id}}</p>
            </div>
         </div>
      </div>
    </SidebarRightFastCard>

    <!-- card 'who to add' -->
    <SidebarRightFastCard title="Followings" :link="`/friends/${route.params.id}`">
      <div v-for="(fllwr, index) in userFollowings" :key="index" :class="defaultTransition" class="p-3 border-b text-ellipsis whitespace-nowrap overflow-hidden border-white dark:border-black hover:bg-gray-100 hover:text-gray-900 cursor-pointer dark:hover:bg-gray-900 dark:hover:text-gray-100">
         <div @click="navigateTo(`/profile/${fllwr.profiles.id}`)" class="flex flex-row justify-between items-center p-1.5">
            <img :src="fllwr.profiles.avatar" class="w-11 h-11 object-cover" alt="photo">
            <div class="flex flex-col">
              <div class="flex flex-row self-end gap-1">
                 <p class="text-center">{{fllwr.profiles.name}}</p>
                 <p class="text-center">{{fllwr.profiles.surname}}</p>
              </div>
               <p class="text-center text-[10px] text-gray-300 dark:text-gray-700">@{{fllwr.profiles.id}}</p>
            </div>
         </div>
      </div>
    </SidebarRightFastCard>
  </div>
</template>

<script setup>
const {defaultTransition} = useTailwindConfig()
const supabase = useSupabaseClient();
const route = useRoute();
const userFollowers = ref(null);
const userFollowings = ref(null);

async function fetchUserSubs() {
  const { data, error } = await supabase
    .from("random_followers")
    .select("who_followed, profiles:who_followed(*)")
    .eq("whos_following", route.params.id)
    .limit(3);
  if (!error) {
    userFollowers.value = data;
  } else {
    console.error(error);
  }
}

async function fetchUserFollowings(){
   const {data, error} = await supabase
  .from('random_followers')
  .select('whos_following, profiles:whos_following(*)')
  .eq('who_followed', route.params.id)
  .limit(3)
  if(!error){
     userFollowings.value = data
  } else{
   console.log(error);
  }
}

onMounted(() => {
   fetchUserSubs()
   fetchUserFollowings()
})
</script>

<style></style>
