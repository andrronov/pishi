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
   </script>