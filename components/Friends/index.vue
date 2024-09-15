<template>
   <div class="flex flex-row items-center">
      <input v-model="inputSearch" @keydown.enter="searchFriend" type="text" placeholder="Name and Surname or @id" class="w-full p-3 bg-black dark:bg-white dark:text-black dark:border-black border-2 border-white text-white">
      <button @click="searchFriend" class="bg-white text-black py-3 border-y-2 border-white dark:border-black cursor-pointer hover:text-gray-600">Search</button>
   </div>
   <h3 v-if="route.params.id && route.params.id !== userId" class="py-4 text-center text-sm s:text-base text-white dark:text-black">@{{route.params.id}} friends</h3>
   
   <!-- FRIEND SEARCH -->
   <UISpinner v-if="isLoading && inputSearch.length > 0" />
   <div v-if="searchResults" class="flex flex-col">
    <p class="p-2 text-lg bg-white text-black mt-2 -mb-2">Search Results:</p>
    <button @click="searchResults = null; inputSearch = ''" class="p bg-black text-white border border-white hover:bg-gray-500">Close</button>
    <div v-if="searchResults?.length > 0" class="flex flex-col max-h-80 overflow-y-scroll">
      <FriendsList v-for="(search, index) in searchResults" :userId="search.id" :avatar="search.avatar" :name="search.name" :surname="search.surname" :key="index" @click="toProfile(search.id)" />
    </div>
    <p v-if="searchResults?.length < 1" class="my-2">Nobody was found</p>
  </div>

  <!-- TABS -->
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

  <!-- FOLLOWERS -->
  <div v-if="currentTab == 0" class="flex flex-col">
    <div v-if="followers">
      <div class="flex flex-col">
        <FriendsList v-for="(follower, index) in followers" :userId="follower.profiles.id" :avatar="follower.profiles.avatar" :name="follower.profiles.name" :surname="follower.profiles.surname" :key="index" @click="toProfile(follower.profiles.id)" />
        <h1 v-if="followers.length < 1" class="text-white dark:text-black mt-5">
          Don't have followers
        </h1>
      </div>
    </div>
    <UISpinner v-if="isLoading" class="self-center mt-5" />
  </div>
  
  <!-- FOLLOWINGS -->
  <div v-if="currentTab == 1" class="flex flex-col">
    <div v-if="following">
      <div class="flex flex-col">
        <FriendsList v-for="(following, index) in following" :userId="following.profiles.id" :avatar="following.profiles.avatar" :name="following.profiles.name" :surname="following.profiles.surname" :key="index" @click="toProfile(following.profiles.id)" />
        <h1 v-if="following.length < 1" class="text-white dark:text-black mt-5">
          Don't have followers
        </h1>
      </div>
    </div>
    <UISpinner v-if="isLoading" class="self-center mt-5" />
  </div>
</template>

<script setup>
definePageMeta({
   layout: 'default'
})

const tabs = ["Followers", "Following"];
const supabase = useSupabaseClient()
const route = useRoute() 
const inputSearch = ref('')
const searchResults = ref()
const currentTab = ref(0)
const isSearching = ref(false)

let followers = ref(null);
let following = ref(null);

const userId = ref(null)

const isLoading = ref(false)

// FETCH FOLLOWERS
async function fetchFollowers() {
  isLoading.value = true;
  try {
     followers.value = await useFetchFollowers(supabase, route.params.id || userId.value)
  } catch (error) {
   console.error(error);
  } finally { isLoading.value = false }
}

// FETCH FOLLOWING
async function fetchFollowings(){
  isLoading.value = true
  try {
     following.value = await useFetchFollowings(supabase, route.params.id || userId.value)
  } catch (error) {
   console.error(error);
  }
  if(following.value){isLoading.value = false}
}

// GO TO PROFILE
function toProfile(profileId){
  navigateTo(`/profile/${profileId}`)
}


async function searchFriend(){
   if(inputSearch.value.includes('@')){
      isSearching.value = true
      const {data, error} = await supabase.from('profiles').select('*').eq('id', inputSearch.value.slice(1))
      searchResults.value = data
      isSearching.value = false   
   } else {
      isSearching.value = true
      const nameSurname = inputSearch.value.split(' ')
      const {data, error} = await supabase.from('profiles').select('*').ilike('name', nameSurname[0], 'surname', nameSurname[1], '%alba%')
      searchResults.value = data
      isSearching.value = false
   }
}

watch(currentTab, () => {
   if(currentTab.value === 0 && !followers.value) fetchFollowers()
   if(currentTab.value === 1 && !following.value) fetchFollowings()
})

onMounted(() => {
  userId.value = localStorage.getItem('userId')
  fetchFollowers();
});
</script>

<style>

</style>