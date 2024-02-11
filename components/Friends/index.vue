<template>
  <UISpinner v-if="props.isLoading" />
  <div v-if="props.searchRes" class="flex flex-col">
    <p class="p-2 text-lg bg-white text-black mt-2 -mb-2">Search Results:</p>
    <button @click="emit('closeSearch')" class="p bg-black text-white border border-white hover:bg-gray-500">Close</button>

    <div v-if="props.searchRes?.length > 0" class="flex flex-col max-h-80 overflow-y-scroll">
      <FriendsList v-for="(search, index) in props.searchRes" :key="index" @click="toProfile(search.id)">
        <template #avatar>
          <img
            :src="search.avatar"
            alt="avatar"
            class="h-12 w-12 object-cover flex-none bg-gray-50"
          />
        </template>
        <template #name>
          {{ search.name }}
          {{ search.surname }}
        </template>
        <template #nickname> @{{ search.id }} </template>
        <template #lastSeen>
          <OnlineStatus :prmtrs="search.id" />
        </template>
      </FriendsList>
    </div>
    <p v-if="props.searchRes?.length < 1" class="my-2">Nobody was found</p>
  </div>

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

  <div v-if="currentTab == 0" class="flex flex-col">
    <div v-if="followers">
      <div class="flex flex-col">
        <FriendsList v-for="(follower, index) in followers" :key="index" @click="toProfile(follower.profiles.id)">
          <template #avatar>
            <img
              :src="follower.profiles.avatar"
              alt="avatar"
              class="h-12 w-12 object-cover flex-none bg-gray-50"
            />
          </template>
          <template #name>
            {{ follower.profiles.name }}
            {{ follower.profiles.surname }}
          </template>
          <template #nickname> @{{ follower.profiles.id }} </template>
          <template #lastSeen>
            <OnlineStatus :prmtrs="follower.profiles.id" />
          </template>
        </FriendsList>
        <h1 v-if="followers.length < 1" class="text-white dark:text-black mt-5">
          Don't have followers
        </h1>
      </div>
    </div>
    <UISpinner v-if="loads.followersLoad" class="self-center mt-5" />
  </div>
  
  <div v-if="currentTab == 1" class="flex flex-col">
    <div v-if="following">
      <div class="flex flex-col">
        <FriendsList v-for="(following, index) in following" :key="index" @click="toProfile(following.profiles.id)">
          <template #avatar>
            <img
              :src="following.profiles.avatar"
              alt="avatar"
              class="h-12 w-12 flex-none bg-gray-50"
            />
          </template>
          <template #name>
            {{ following.profiles.name }}
            {{ following.profiles.surname }}
          </template>
          <template #nickname> @{{ following.profiles.id }} </template>
          <template #lastSeen>
            <OnlineStatus :prmtrs="following.profiles.id" />
          </template>
        </FriendsList>
        <h1 v-if="following.length < 1" class="text-white dark:text-black mt-5">
          Don't have followers
        </h1>
      </div>
    </div>
    <UISpinner v-if="loads.followingsLoad" class="self-center mt-5" />
  </div>

</template>

<script setup>
const emit = defineEmits({
  closeSearch(){
    return false
  }
})
const props = defineProps({
  currentTab: {
    type: Number,
    default: 0,
  },
  USERID: {
    type: String,
  },
  searchRes: {
    type: Array,
    default: null,
  },
  isLoading: {
    type: Boolean,
    default: false,
  }
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
  followingsLoad: false
});
// ---------

// FETCH FOLLOWERS
async function fetchFollowers() {
  loads.followersLoad = true;
  followers.value = await useFetchFollowers(supabase, props.USERID)
  loads.followersLoad = false;
}

// FETCH FOLLOWING
async function fetchFollowings(){
  loads.followingsLoad = true
  following.value = await useFetchFollowings(supabase, props.USERID)
  if(following.value){loads.followingsLoad = false}
}

// GO TO PROFILE
function toProfile(profileId){
  console.log(profileId);
  navigateTo(`/profile/${profileId}`)
}

watchEffect(() => {
  fetchFollowers();
  fetchFollowings()
});
</script>
