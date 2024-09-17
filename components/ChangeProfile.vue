<template>
   <div as="template">
     <div as="div" class="relative z-10" @close="$emit('closeModal')">
       <div as="template" enter="ease-out duration-300" enter-from="opacity-0" enter-to="opacity-100" leave="ease-in duration-200" leave-from="opacity-100" leave-to="opacity-0">
         <div class="fixed inset-0 bg-gray-900 dark:bg-gray-200 bg-opacity-75 transition-opacity" />
       </div>
 
       <div class="fixed inset-0 z-10 w-screen overflow-y-auto">
         <div class="flex min-h-full items-center justify-center p-4 text-center sm:items-center sm:p-0">
           <div as="template" enter="ease-out duration-300" enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95" enter-to="opacity-100 translate-y-0 sm:scale-100" leave="ease-in duration-200" leave-from="opacity-100 translate-y-0 sm:scale-100" leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95">
             <div ref="target" class="relative transform overflow-hidden rounded-lg text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
               <div class="bg-black dark:bg-gray-100 px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                 <div class="sm:flex sm:items-start">
                  <form>
                     <div class="space-y-12 text-gray-200 dark:text-gray-900 bg-black dark:bg-gray-100">
                       <div class="border-b border-gray-900/10 pb-12">
                         <h2 class="text-sm dark:bg-black dark:text-white bg-white text-black text-center sm:text-xl leading-7">Change profile</h2>
                         <div class="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                           <div class="sm:col-span-3">
                             <label for="username" class="block text-sm sm:text-xl font-medium leading-6">Name</label>
                             <div class="mt-2">
                               <div class="flex shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-gray-800 focus-within:ring-2 focus-within:ring-inset focus-within:ring-gray-600 sm:max-w-md">
                                 <input v-model="modal.name" type="text" class="block flex-1 w-full border-0 bg-transparent py-1.5 px-1  placeholder: focus:ring-0 sm:text-sm sm:leading-6" />
                               </div>
                             </div>
                           </div>

                           <div class="sm:col-span-3">
                             <label for="username" class="block text-sm sm:text-xl font-medium leading-6">Surname</label>
                             <div class="mt-2">
                               <div class="flex shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-gray-800 focus-within:ring-2 focus-within:ring-inset focus-within:ring-gray-600 sm:max-w-md">
                                 <input v-model="modal.surname" type="text" class="block flex-1 w-full border-0 bg-transparent py-1.5 px-1  placeholder: focus:ring-0 sm:text-sm sm:leading-6" />
                               </div>
                             </div>
                           </div>
                 
                           <div class="col-span-full">
                             <label for="about" class="block text-sm sm:text-xl font-medium leading-6 ">Write a status</label>
                             <div class="mt-2">
                               <input v-model="modal.status" id="about" class="block w-full bg-black dark:bg-gray-100 border-0 py-1.5 px-1 shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-gray-800 placeholder: focus:ring-2 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6" />
                             </div>
                           </div>
                 
                           <div class="col-span-full">
                            <label for="photo" class="block text-sm sm:text-xl font-medium leading-6 ">
                             Change avatar
                             <div class="flex flex-col gap-x-3">
                               <input @change="changeAvatar" class="my-4 text-transparent cursor-pointer" type="file" />
                               <UISpinner class="my-4" v-if="imgLoad" />
                               <img v-if="modal.avatar" :src="modal.avatar" class="my-4" alt="avatar preview">
                             </div>
                            </label>
                          </div>
                         </div>
                       </div>
                       
                     </div>
                   </form>
                 </div>
                 <UISpinner class="w-full justify-self-center" v-if="loading" />
                 <h2 v-if="success" class="text-sm dark:bg-black dark:text-green-300 bg-white text-green-700 text-center sm:text-xl leading-7">Success!</h2>
                 <h2 v-if="error" class="text-sm dark:bg-black dark:text-red-300 bg-white text-red-700 text-center sm:text-xl leading-7">Something went wrong: {{ error.message }}</h2>
               </div>
               <div class="bg-black dark:bg-gray-100 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                 <button type="button" class="inline-flex w-full justify-center px-3 py-2 text-sm bg-white dark:bg-black text-white dark:text-white shadow-sm font-medium dark:hover:text-gray-300 dark:hover:bg-gray-700 hover:text-gray-900 hover:bg-gray-100 sm:ml-3 sm:w-auto ring-1 ring-inset ring-gray-300" @click="changeProfile">Confirm</button>
                 <button type="button" class="mt-3 inline-flex w-full justify-center bg-white px-3 py-2 text-sm text-white dark:text-black shadow-sm  hover:bg-gray-100 hover:text-gray-900 sm:mt-0 sm:w-auto dark:hover:text-gray-300 dark:hover:bg-gray-700 dark:ring-1 dark:ring-inset dark:ring-gray-300" @click="$emit('closeModal')" ref="cancelButtonRef">Cancel</button>
               </div>
             </div>
           </div>
         </div>
       </div>
     </div>
   </div>
 </template>

 <script setup>
 import { onClickOutside } from '@vueuse/core'
const target = ref(null)
onClickOutside(target, event => emit('closeModal'))

 const emit = defineEmits({
   closeModal(){
      return false
   }
 })
 const supabase = useSupabaseClient()
 const session = await supabase.auth.getSession()

 const loading = ref(false)
 const success = ref(false)
 const error = ref(null)
 const imgLoad = ref(false)

 let modal = reactive({
   name: '',
   surname: '',
   status: '',
   avatar: null
 })

function loadUserData(){
  const {name, surname, profile_status, avatar} = useGetUserStore()
  modal = {name, surname, status: profile_status, avatar}
}

async function changeProfile(){
   loading.value = true
   const changeRes = await supabase.from('profiles')
      .update({name: modal.name, surname: modal.surname, profile_status: modal.status, avatar: modal.avatar})
      .eq('id', session.data.session.user.id)
   if(!changeRes.error){
      loading.value = false
      success.value = true
      setTimeout(() => {
         modal = null
         success.value = false
         emit('closeModal')
         refreshNuxtData()
      }, 1500);
   }
   else{
      error.value = true
      throw new Error(changeRes.error) 
   }
 }

 async function changeAvatar(ev){
  imgLoad.value = true
  modal.avatar = null
  const photo = ev.target.files[0]
  const newPhotoName = Date.now() + photo.name
  const {data, error} = await supabase.storage.from('avatars').upload(newPhotoName, photo)
  console.log(data);
  console.log(error);
  if(!error){
    modal.avatar = 'https://ilabflsecnunffcornxh.supabase.co/storage/v1/object/public/avatars/' + data.path
  }
  if(modal.avatar){
    imgLoad.value = false
  }
}

 watchEffect(() => {
  loadUserData()
 })
</script>