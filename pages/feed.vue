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
   onMounted(() => {
   console.log('supa user', user.value)
   })
   </script>