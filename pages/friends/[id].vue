<template>
   <div class="flex flex-row items-center">
      <input v-model="inputSearch" @keydown.enter="searchFriend" type="text" placeholder="Name and Surname or @id" class="w-full p-3 bg-black dark:bg-white dark:text-black dark:border-black border-2 border-white text-white">
      <button @click="searchFriend" class="bg-white text-black py-3 border-y-2 border-white cursor-pointer hover:text-gray-600">Search</button>
   </div>
   <Friends :currentTab="0" :USERID="route.params.id" :searchRes="searchResults" @close-search="searchResults = null" :isLoading="isSearching" />
</template>

<script setup>
definePageMeta({
   layout: 'default'
})

const supabase = useSupabaseClient()
const route = useRoute() 
const inputSearch = ref(null)
const searchResults = ref()
const isSearching = ref(false)

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
</script>

<style>

</style>