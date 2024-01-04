<template>
   <div>
      <MainSection :loading="loading">
         <p>ada</p>
         <h1>User: {{ user }}</h1>
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
   const sess = await supabase.auth.getSession()
   onMounted(() => {
   console.log('supa user', user.value)
   if(sess){
      console.log('ses', sess);
   }
   })
   </script>