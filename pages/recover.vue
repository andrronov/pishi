<template>
   <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <form class="space-y-6">
        <div>
          <label for="email" class="block text-sm font-medium leading-6">New password</label>
          <div class="mt-2">
            <input v-model="dataFromForm.password" name="password" type="password" autocomplete="password" required="" class="block w-full bg-black rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-500 sm:text-sm sm:leading-6" />
          </div>
        </div>
        <div>
          <label for="email" class="block text-sm font-medium leading-6">Confirm new password</label>
          <div class="mt-2">
            <input v-model="dataFromForm.secondPassword" name="password" type="password" autocomplete="password" required="" class="block w-full bg-black rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-500 sm:text-sm sm:leading-6" />
          </div>
        </div>

        <div>
          <button @click.prevent="confirmPassword" class="flex w-full justify-center rounded-md bg-white px-3 py-1.5 text-sm leading-6 text-black font-bold shadow-sm hover:bg-gray-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
           Reset password</button>
        </div>
        <div class="w-full text-center" v-if="checkMailMessage">
         <h3>Success!</h3>
        </div>
        <div class="w-full text-center" v-if="isPasswordsWrong">
         <h3>Error! The passwords is not equal.</h3>
        </div>
        <div v-if="dataFromForm.loading" class="flex flex-col items-center">
           <UISpinner />
        </div>
        <div>
          <button @click.prevent="page = 'login'" class="flex w-full justify-center rounded-md bg-black px-3 py-0.5 border-solid border-l-white border-2 text-sm leading-6 text-white shadow-sm hover:bg-gray-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
           Back</button>
        </div>
      </form>
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
   secondPassword: '',
   username: '',
   loading: false
})
const page = ref('login')
const checkMailMessage = ref(false)
const errorLog = ref()

const supabase = useSupabaseClient()
const route = useRoute()
const isPasswordsWrong = ref(false)
const session = await supabase.auth.getSession()

async function confirmPassword(){
  if(dataFromForm.password == dataFromForm.secondPassword){
   console.log(session);
    isPasswordsWrong.value = false
    dataFromForm.loading = true
    const {data, error} = await supabase.auth.updateUser({password: dataFromForm.secondPassword})
    console.log(data, error);
    if(!error){
      dataFromForm.loading = false
      checkMailMessage.value = true
      navigateTo('/feed')
    }
  } else {
    isPasswordsWrong.value = true
  }
}

onMounted(() => {
  console.log(route);
})
</script>