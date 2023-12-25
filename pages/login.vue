<template>
   <!-- LOG IN -->
   <div v-if="login" class="flex min-h-full bg-black text-white flex-1 flex-col justify-center px-6 py-12 lg:px-8">
     <div class="sm:mx-auto sm:w-full sm:max-w-sm">
       <h1 class="mx-auto h-10 text-5xl text-center w-auto pishi">PISHI</h1>
     </div>
 
     <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
       <form class="space-y-6">
         <div>
           <label class="block text-sm font-medium leading-6">Username</label>
           <div class="mt-2">
             <input v-model="dataFromForm.username" name="email" type="email" autocomplete="email" required="" class="block w-full bg-black rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-500 sm:text-sm sm:leading-6" />
           </div>
         </div>
 
         <div>
           <div class="flex items-center justify-between">
             <label for="password" class="block text-sm font-medium leading-6">Password</label>
             <div class="text-sm">
               <a href="#" class="text-white">Forgot password?</a>
             </div>
           </div>
           <div class="mt-2">
             <input v-model="dataFromForm.password" id="password" name="password" type="password" autocomplete="current-password" required="" class="block bg-black w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-500 sm:text-sm sm:leading-6" />
           </div>
         </div>
 
         <div>
           <button @click.prevent="loginUser" class="flex w-full justify-center rounded-md mb-10 bg-white px-3 py-2.5 text-sm font-semibold leading-6 text-black shadow-sm hover:bg-gray-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
            Sign in</button>
         </div>
         <div v-if="dataFromForm.loading" class="flex flex-col items-center">
            <UISpinner />
         </div>
         <div>
           <button @click.prevent="login = false" class="flex w-full justify-center rounded-md bg-black px-3 py-1.5 text-sm leading-6 text-white border-solid border-2 border-l-white shadow-sm hover:bg-gray-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
            Sign up</button>
         </div>
       </form>
     </div>
   </div>

   
   <!-- SIGN UP -->

   <div v-else class="flex min-h-full bg-black text-white flex-1 flex-col justify-center px-6 py-12 lg:px-8">
     <div class="sm:mx-auto sm:w-full sm:max-w-sm">
       <h1 class="mx-auto h-10 text-5xl text-center w-auto pishi">PISHI</h1>
     </div>
 
     <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
       <form class="space-y-6">
         <!-- <div>
           <label class="block text-sm font-medium leading-6">Name</label>
           <div class="mt-2">
             <input v-model="dataFromForm.name" required="" class="block w-full bg-black text-white rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-500 sm:text-sm sm:leading-6" />
           </div>
         </div>
         <div>
           <label class="block text-sm font-medium leading-6">Surname</label>
           <div class="mt-2">
             <input v-model="dataFromForm.surname" required="" class="block w-full rounded-md bg-black text-white border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-500 sm:text-sm sm:leading-6" />
           </div>
         </div>
         <div>
           <label class="block text-sm font-medium leading-6">Nickname</label>
           <div class="mt-2">
             <input v-model="dataFromForm.username" required="" class="block w-full rounded-md bg-black text-white border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-500 sm:text-sm sm:leading-6" />
           </div>
         </div> -->
         <div>
           <label for="email" class="block text-sm font-medium leading-6">Email address</label>
           <div class="mt-2">
             <input v-model="dataFromForm.email" name="email" type="email" autocomplete="email" required="" class="block w-full bg-black rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-500 sm:text-sm sm:leading-6" />
           </div>
         </div>
 
         <div>
           <div class="flex items-center justify-between">
             <label for="password" class="block text-sm font-medium leading-6">Password</label>
           </div>
           <div class="mt-2">
             <input v-model="dataFromForm.password" id="password" name="password" type="password" autocomplete="current-password" required="" class="block bg-black w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-500 sm:text-sm sm:leading-6" />
           </div>
         </div>
 
         <div>
           <button @click.prevent="signUp" class="flex w-full justify-center rounded-md bg-white px-3 py-1.5 text-sm leading-6 text-black font-bold shadow-sm hover:bg-gray-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
            Sign up</button>
         </div>
         <div v-if="dataFromForm.loading" class="flex flex-col items-center">
            <UISpinner />
         </div>
         <div>
           <button @click.prevent="login = true" class="flex w-full justify-center rounded-md bg-black px-3 py-0.5 border-solid border-l-white border-2 text-sm leading-6 text-white shadow-sm hover:bg-gray-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
            Back</button>
         </div>
       </form>
     </div>
   </div>
 </template>
<script setup>
import { definePageMeta } from '#imports'
definePageMeta({
   layout: 'empty'
})
const dataFromForm = reactive({
   name: '',
   surname: '',
   email: '',
   password: '',
   username: '',
   loading: false
})
const login = ref(true)


import { createClient } from '@supabase/supabase-js'

const supabase_url = 'https://ilabflsecnunffcornxh.supabase.co'
const anon_key = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlsYWJmbHNlY251bmZmY29ybnhoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDM0NDQyOTMsImV4cCI6MjAxOTAyMDI5M30.F7k_JB0F_mIOBCDNdRjwDlFMR7uNzM1HVAMh-qdWB60'
const supabase = createClient(supabase_url, anon_key)

const signUp = async () => {
  console.log('dataForm', dataFromForm)
  console.log('key', anon_key);
  const { data, error } = await supabase.auth.signUp(
  {
    email: dataFromForm.email,
    password: dataFromForm.password,
    options: {
      emailRedirectTo: 'https://example.com/welcome'
    }
  }
)
  console.log('data', data?.user?.id)
  console.log('err', error)
  if(error){
    throw error
  }

  // РЕШИТЬ ПРОБЛЕМУ С ДОБАВЛЕНИЕМ В ТАБЛИЦУ
  const resp = await supabase
  .from('Users')
  .insert({id: data.user.id, name: 'a', username: 'u', surname: 's', is_activated: false, email: dataFromForm.email, password: dataFromForm.password})
  console.log(resp);
}
</script>