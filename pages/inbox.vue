<template>
  <div class="flex flex-col h-screen border-x border-white dark:border-black overflow-y-auto">
   <div class="flex flex-col-reverse py-4 px-1">
      <div v-for="(alert, index) in inboxArray" :key="index" class="flex flex-row gap-2 items-center min-h-12 justify-between border-y border-white dark:border-black p-2">
         <!-- <img src="/me.jpg" class=" w-10 h-10 s:w-12 s:h-12" alt=""> -->
         <p class="text-xs s:text-lg text-white font-medium dark:text-black w-10/12">{{alert.text}}</p>
         <p class="text-[10px] s:text-xs text-gray-400 dark:text-gray-600 text-end w-2/12">{{ formatTimeAgo(new Date(alert.created_at)) }}</p>
      </div>
    </div>
  </div>

  <Error v-if="errorLog" :error="errorLog" />
</template>

<script setup>
import { formatTimeAgo } from '@vueuse/core'
definePageMeta({
   layout: 'default'
})

const inboxArray = ref()
const supabase = useSupabaseClient()
const userId = ref(null)
const errorLog = ref(null)

async function fetchInbox(){
   try {
      const {data, error} = await supabase.from('inbox').select().eq('user_id', userId.value)
      inboxArray.value = data
   } catch (error) {
      errorLog.value = error
   }
}

onMounted(() => {
   userId.value = localStorage.getItem('userId')
   fetchInbox()
})
</script>

<style>

</style>