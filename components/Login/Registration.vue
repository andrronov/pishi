<template>
   <div class="flex min-h-full bg-black text-white flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form class="space-y-6">
          <div>
            <label class="block text-sm font-medium leading-6">Name</label>
            <input v-model="inputs.name" class="mt-2 block w-full bg-black text-white rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-500 sm:text-sm sm:leading-6" />
          </div>
          <div>
            <label class="block text-sm font-medium leading-6">Surname</label>
            <input v-model="inputs.surname" class="block w-full rounded-md bg-black text-white border-0 py-1.5 shadow-sm ring mt-2-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-500 sm:text-sm sm:leading-6" />
          </div>
          <div>
            <label for="email" class="block text-sm font-medium leading-6">Email address</label>
            <input v-model="inputs.email" name="email" type="email" autocomplete="email" class="block w-full bg-black mt-2 rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-500 sm:text-sm sm:leading-6" />
          </div>
  
          <div>
            <div class="flex items-center justify-between">
              <label for="password" class="block text-sm font-medium leading-6">Password</label>
            </div>
            <input v-model="inputs.password" id="password" name="password" type="password" autocomplete="current-password" class=" mt-2block bg-black w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-500 sm:text-sm sm:leading-6" />
          </div>

          <div>
            <button @click.prevent="signUp" class="flex w-full justify-center rounded-md bg-white px-3 py-1.5 text-sm leading-6 text-black font-bold shadow-sm hover:bg-gray-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
             Sign up
            </button>
          </div>
          <div class="w-full text-center" v-if="isSuccess">
           <h3>Check your email!</h3>
          </div>
          <div>
            <button @click.prevent="$emit('changePage', 'login')" class="flex w-full justify-center rounded-md bg-black px-3 py-0.5 border-solid border-l-white border-2 text-sm leading-6 text-white shadow-sm hover:bg-gray-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
             Back
            </button>
          </div>
        </form>
      </div>
    </div>

    <UILoading v-if="loading" />
    <Error v-if="errorLog" :error="errorLog" />
</template>

<script setup>
const props = defineProps({
   supabase: {type: Object}
})

const inputs = reactive({
   name: '', surname: '', email: '', password: ''
})
const isSuccess = ref(false)
const loading = ref(false)
const errorLog = ref(null)

async function signUp() {
  loading.value = true
  try {
     const { data } = await props.supabase.auth.signUp(
     {
       email: inputs.email,
       password: inputs.password,
       options: {
         data: {
           name: inputs.name,
           surname: inputs.surname,
         },
         emailRedirectTo: 'https://pishi.netlify.app/done'
       }
     })
     isSuccess.value = true
  } catch (error) {
     errorLog.value = error
  } finally {loading.value = false}
}
</script>