<template>
  <div class="flex flex-col h-screen border-x border-white dark:border-black overflow-y-auto">
   <div class="flex flex-col-reverse py-4 px-1">
      <div v-for="(alert, index) in inboxArray" :key="index" class="flex flex-row gap-2 items-center justify-between border-y border-white dark:border-black p-2">
         <!-- <img src="/me.jpg" class=" w-10 h-10 s:w-12 s:h-12" alt=""> -->
         <p class="text-xs s:text-lg text-white font-medium dark:text-black">{{alert.text}}</p>
         <p class="text-[10px] s:text-xs text-gray-400 dark:text-gray-600 text-end">{{ formatTimeAgo(new Date(alert.created_at)) }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { formatTimeAgo } from '@vueuse/core'
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
   } else{
      throw new Error(error)
   }
}

watchEffect(() => {
   fetchInbox()
})
</script>

<style>

</style>