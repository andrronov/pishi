<template>
  <div class="flex flex-row w-full items-center text-white dark:text-black">
    <button
      v-for="(tab, index) in tabs"
      :key="index"
      class="p-3 flex flex-row w-2/4 h-14 justify-center items-center gap-2 border-2"
      @click="currentTab = index"
      :class="
        index == currentTab
          ? 'border-white dark:border-black hover:text-gray-500 hover:bg-gray-200 cursor-pointer bg-white dark:bg-black dark:hover:bg-gray-700 dark:hover:text-gray-300 dark:text-white text-black'
          : 'bg-black dark:bg-white hover:text-gray-300 hover:bg-gray-700 dark:hover:bg-gray-400 dark:hover:text-gray-600 cursor-pointer text-white dark:text-black'
      "
    >
      {{ tab }}
    </button>
  </div>

  <div v-if="currentTab == 0">
    <div v-if="followers">
      <h1
        class="text-sm dark:bg-black dark:text-white bg-white text-black text-center sm:text-xl leading-7"
      >
        Followers
      </h1>
      <div class="flex flex-col">
        <FriendsList v-for="(follower, index) in followers" :key="index">
          <template #avatar>
            <img
              :src="follower.profiles.avatar"
              alt="avatar"
              class="h-12 w-12 flex-none bg-gray-50"
            />
          </template>
          <template #name>
            {{ follower.profiles.name }}
            {{ follower.profiles.surname }}
          </template>
          <template #nickname> @{{ follower.profiles.user_id }} </template>
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
        </FriendsList>
        <h1 v-if="followers.length < 1" class="text-white dark:text-black mt-5">
          You don't have followers :(
        </h1>
      </div>
    </div>
  </div>
  <UISpinner v-if="loads.followersLoad" class="self-center mt-5" />
  
  <div v-if="currentTab == 1">
   <h1 class="text-sm dark:bg-black dark:text-white bg-white text-black text-center sm:text-xl leading-7">
      Following </h1>
  </div>
</template>

<script setup>
const props = defineProps({
  currentTab: {
    type: Number,
    default: 0,
  },
});
// VARIABLES
const tabs = ref(["Followers", "Following"]);
const supabase = useSupabaseClient();
const session = await supabase.auth.getSession();
const userId = session.data.session.user.id;
let followers = ref(null);
let following = ref(null);
const loads = reactive({
  followersLoad: false,
});
// ---------

// FETCH FOLLOWERS
async function fetchFollowers() {
  console.log("u", userId);
  loads.followersLoad = true;
  const followersRes = await supabase
    .from("followers")
    .select("*, profiles(*)")
    .eq("followed_user_id", userId);
  if (!followersRes.error) {
    console.log("followers data", followersRes.data);
    followers.value = followersRes.data;
    loads.followersLoad = false;
  }
  console.log(followersRes);
}

watchEffect(() => {
  fetchFollowers();
});
</script>
