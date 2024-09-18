<template>
   <div class="flex min-h-full bg-black text-white flex-1 flex-col justify-center px-6 py-12 lg:px-8">
     <div class="sm:mx-auto sm:w-full sm:max-w-sm">
       <h1 class="mx-auto h-10 text-5xl text-center w-auto pishi">PISHI</h1>
     </div>
 
     <component :is="pageComponent" :supabase="supabase" @change-page="name => page = name" />

    </div>
 </template>
<script setup>
definePageMeta({
   layout: 'empty'
})

const Login = resolveComponent('Login')
const LoginRegistration = resolveComponent('LoginRegistration')

const page = ref('login')
const pageComponent = computed(() => {
  switch (page.value) {
    case 'login':
      return Login
      break;
    case 'signup':
      return LoginRegistration
      break;
    default:
      return Login
      break;
  }
})

const supabase = useSupabaseClient()
</script>