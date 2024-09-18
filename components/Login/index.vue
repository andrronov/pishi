<template>
   <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <form class="space-y-6">
        <div>
          <label class="block text-sm font-medium leading-6">Email</label>
          <input v-model="inputs.email" name="email" type="email" autocomplete="email" required="" class="mt-2 block w-full bg-black rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-500 sm:text-sm sm:leading-6" />
        </div>

        <div>
            <label for="password" class="block text-sm font-medium leading-6">Password</label>
            <input @keydown.enter="signInWithEmail" v-model="inputs.password" id="password" name="password" type="password" autocomplete="current-password" required="true" class="mt-2 block bg-black w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-500 sm:text-sm sm:leading-6" />
         </div> 
         <button @click.prevent="signInWithEmail" class="flex w-full justify-center rounded-md mb-10 bg-white px-3 py-2.5 text-sm font-semibold leading-6 text-black shadow-sm hover:bg-gray-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
            Sign in
         </button>
         <button @click.prevent="$emit('changePage', 'signup')" class="flex w-full justify-center rounded-md bg-black px-3 py-1.5 text-sm leading-6 text-white border-solid border-2 border-l-white shadow-sm hover:bg-gray-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
            Sign up
         </button>
      </form>
    </div>

    <Error v-if="errorLog" :error="errorLog" />
    <UILoading v-if="loading" />
</template>

<script setup>
const props = defineProps({
   supabase: {type: Object}
})

const inputs = reactive({
   email: '', password: ''
})
const errorLog = ref(null)
const loading = ref(false)

async function signInWithEmail() {
   loading.value = true
   try {
      const {data} = await props.supabase.auth.signInWithPassword({
       email: inputs.email,
       password: inputs.password,
     })
     useUserStore().setUser(data.user)
     navigateTo('/feed')
   } catch (error) {
      errorLog.value = error
   } finally {loading.value = false}
}
</script>