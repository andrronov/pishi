<template>
   <div>
      <MainSection :loading="loading">
         <p>ada</p>
      </MainSection>
   </div>
   </template>
   <script setup>
   definePageMeta({
      layout: 'default'
   })
   const loading = ref(false)
   
   const user = useSupabaseUser()
   const supabase = useSupabaseClient()
   const session = await supabase.auth.getSession()
   const store = useUserStore()

   console.log(session.data.session.user.id)
   const { data, pending, error, refresh } = await useAsyncData(
       '',
       () => {
         const userID = session.data.session.user.id
         supabase.from('profiles').select().eq('id', userID)
         .then(result => {
            if(result.data.length){
               store.updateUser(result.data[0])
            }
         })
       }
   );

   const profile = store.getUser()
   console.log(profile);
   // console.log(store.$state.uData.id)
   </script>