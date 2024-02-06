<template>
  <div class="flex flex-col h-screen border-x border-white overflow-y-scroll">
   <div class="flex flex-col-reverse py-4 px-1">
      <div v-for="(alert, index) in inboxArray" :key="index" class="flex flex-row gap-2 items-center border-y border-white p-2">
         <!-- <img src="/me.jpg" class=" w-10 h-10 s:w-12 s:h-12" alt=""> -->
         <p class="text-xs s:text-lg">{{alert.text}}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
   layout: 'default'
})

const inboxArray = ref()
const supabase = useSupabaseClient()
const session = await supabase.auth.getSession()
const sessionUserId = session.data.session.user.id

async function fetchInbox(){
   const {data, error} = await supabase.from('inbox').select().eq('user_id', sessionUserId)
   if(!error){
      inboxArray.value = data
   }
}

watchEffect(() => {
   fetchInbox()
})
</script>

<style>

</style>