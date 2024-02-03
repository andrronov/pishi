<template>
  <NuxtLayout>
   <NuxtPage />
  </NuxtLayout>
</template>

<script setup>
// const supabase = useSupabaseClient()
// const roomOne = supabase.channel('room_01')

// roomOne
//   .on('presence', { event: 'sync' }, () => {
//     const newState = roomOne.presenceState()
//     console.log('sync', newState)
//   })
//   .on('presence', { event: 'join' }, ({ key, newPresences }) => {
//     console.log('join', key, newPresences)
//   })
//   .on('presence', { event: 'leave' }, ({ key, leftPresences }) => {
//     console.log('leave', key, leftPresences)
//   })
//   .subscribe()

const lightMode = ref(false)
</script>

<style>

</style>