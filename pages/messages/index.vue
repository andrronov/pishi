<template>
   <!-- <div class="flex flex-row items-center">
      <input type="text" placeholder="Find" class="w-full p-3 bg-black dark:bg-white dark:text-black dark:border-black border-2 border-white text-white">
      <button class="bg-white text-black py-3 border-y-2 border-white cursor-pointer hover:text-gray-600">Search</button>
   </div> -->
  <Chats />
</template>

<script setup>
definePageMeta({
   layout: 'default'
})

// VARIABLES
const supabase = useSupabaseClient();
const session = await supabase.auth.getSession();
const sessUserId = session.data.session.user.id
// ---------------------------------------
</script>

<style>

</style>