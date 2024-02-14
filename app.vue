<template>
  <NuxtLayout>
   <NuxtPage />
  </NuxtLayout>
</template>

<script setup>
const supabase = useSupabaseClient()
const session = await supabase.auth.getSession()

const roomOne = supabase.channel('online')
  roomOne
    .on('presence', { event: 'sync' }, () => {
      const newState = roomOne.presenceState()
      console.log('state', newState)
    })
    .on('presence', { event: 'join' }, ({ key, newPresences }) => {
      console.log('join', newPresences)
    })
    .on('presence', { event: 'leave' }, ({ key, leftPresences }) => {
      console.log('leave')
    })

const userStatus = {
  user: session.data.session?.user?.id,
  online_at: new Date().toISOString(),
}

roomOne.subscribe(async (status) => {
  if (status !== 'SUBSCRIBED') { return }

  const presenceTrackStatus = await roomOne.track(userStatus)
  console.log('subbbbb', presenceTrackStatus)
})

const untrackPresence = async () => {
  const presenceUntrackStatus = await roomOne.untrack()
  console.log(presenceUntrackStatus)
}

onBeforeUnmount(() => {
  untrackPresence()
})
</script>

<style>
</style>