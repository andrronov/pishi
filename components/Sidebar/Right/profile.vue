<template>
  <div class="flex flex-col">
    <!-- card 'inbox' -->
    <SidebarRightFastCard title="Followers" :link="`/friends/${route.params.id}`">
      <SidebarRightItem v-for="(frnd, index) in userFollowers" :key="index">
         <div @click="navigateTo(`/profile/${frnd.profiles.id}`)" class="flex flex-row justify-between items-center p-1.5">
            <img :src="frnd.profiles.avatar" class="w-12 h-12 object-cover" alt="photo">
            <div class="flex flex-col">
              <div class="flex flex-row self-end gap-1">
                 <p class="text-center">{{frnd.profiles.name}}</p>
                 <p class="text-center">{{frnd.profiles.surname}}</p>
              </div>
               <p class="text-center text-[10px] text-gray-300 dark:text-gray-700">@{{frnd.profiles.id}}</p>
            </div>
         </div>
      </SidebarRightItem>
    </SidebarRightFastCard>

    <!-- card 'who to add' -->
    <SidebarRightFastCard title="Followings" :link="`/friends/${route.params.id}`">
      <SidebarRightItem v-for="(fllwr, index) in userFollowings" :key="index">
         <div @click="navigateTo(`/profile/${fllwr.profiles.id}`)" class="flex flex-row justify-between items-center p-1.5">
            <img :src="fllwr.profiles.avatar" class="w-12 h-12 object-cover" alt="photo">
            <div class="flex flex-col">
              <div class="flex flex-row self-end gap-1">
                 <p class="text-center">{{fllwr.profiles.name}}</p>
                 <p class="text-center">{{fllwr.profiles.surname}}</p>
              </div>
               <p class="text-center text-[10px] text-gray-300 dark:text-gray-700">@{{fllwr.profiles.id}}</p>
            </div>
         </div>
      </SidebarRightItem>
    </SidebarRightFastCard>
  </div>
</template>

<script setup>
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
    console.log(userFollowers.value);
  } else {
    throw new Error(error);
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
     console.log(userFollowings.value);
  } else{
   console.log(error);
   throw new Error(error)
  }
}

watchEffect(() => {
   fetchUserSubs()
   fetchUserFollowings()
})
</script>

<style></style>
