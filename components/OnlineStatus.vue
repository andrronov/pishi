<template>
   <div class="shrink-0 flex flex-col items-end">
      <div v-if="isUserOnline" class="mt-1 flex items-center gap-x-1.5">
         <div class="flex-none rounded-full bg-emerald-500/20 p-1">
            <div class="h-1.5 w-1.5 rounded-full bg-emerald-500" />
         </div>
         <p class="text-sm leading-5 text-gray-300 dark:text-gray-700">Online</p>
      </div>
      <p v-else class="mt-1 text-sm leading-5 text-gray-500">
        <time>offline</time>
      </p>
   </div>
</template>

<script setup>
const supabase = useSupabaseClient()
const route = useRoute()
const isUserOnline = ref()

const props = defineProps({
   prmtrs: {
      type: String,
      required: true
   }
})

function checkOnline(param){
   const roomOne = supabase.channel('online')
   roomOne
     .on('presence', { event: 'sync' }, () => {
       const newState = roomOne.presenceState()
       const usersOnline = []
       for (const id in newState) {
         newState[id].forEach(session => {
           if (!usersOnline.includes(session.user)) {
             usersOnline.push(session.user)
           }
         });
       }
       isUserOnline.value = usersOnline.some(user => user === param)
     })
     .subscribe()
}

onMounted(() => {
   checkOnline(props.prmtrs)
})
</script>

<style>

</style>