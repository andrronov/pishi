<template>
  <NuxtLayout>
   <NuxtPage />
  </NuxtLayout>
</template>

<script setup>
const supabase = useSupabaseClient()
const session = await supabase.auth.getSession()

const roomOne = supabase.channel('online')

const userStatus = {
  user: session.data.session?.user?.id,
  online_at: new Date().toISOString(),
}

roomOne.subscribe(async (status) => {
  if (status !== 'SUBSCRIBED') { return }

  const presenceTrackStatus = await roomOne.track(userStatus)
})

const untrackPresence = async () => {
  const presenceUntrackStatus = await roomOne.untrack()
}

onBeforeUnmount(() => {
  untrackPresence()
})
</script>

<style>
</style>