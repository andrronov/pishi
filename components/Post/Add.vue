<template>
   <div as="template" class="z-50">
     <div as="div" class="relative z-50" @close="$emit('closeModal')">
       <div
         as="template"
         enter="ease-out duration-300"
         enter-from="opacity-0"
         enter-to="opacity-100"
         leave="ease-in duration-200"
         leave-from="opacity-100"
         leave-to="opacity-0"
       >
         <div
           class="fixed inset-0 bg-gray-900 dark:bg-gray-200 bg-opacity-75 transition-opacity"
         />
       </div>
 
       <div class="fixed inset-0 z-10 w-screen overflow-y-auto">
         <div
           class="flex min-h-full items-center justify-center p-4 text-center sm:items-center sm:p-0"
         >
           <div
             as="template"
             enter="ease-out duration-300"
             enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
             enter-to="opacity-100 translate-y-0 sm:scale-100"
             leave="ease-in duration-200"
             leave-from="opacity-100 translate-y-0 sm:scale-100"
             leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
           >
             <div
               ref="target"
               class="relative transform overflow-hidden rounded-lg text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg"
             >
               <div
                 class="bg-black dark:bg-gray-100 px-4 pb-4 pt-5 sm:p-6 sm:pb-4"
               >
                 <div class="sm:flex sm:items-start">
                   <form>
                     <div
                       class="space-y-12 text-gray-200 dark:text-gray-900 bg-black dark:bg-gray-100"
                     >
                       <div class="border-b border-gray-900/10 pb-12">
                         <h2
                           class="text-sm dark:bg-black dark:text-white bg-white text-black text-center sm:text-xl leading-7"
                         >
                           What's new?
                         </h2>
                         <div
                           class="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6"
                         >
                           <div class="sm:col-span-3">
                             <label
                               for="username"
                               class="block text-sm sm:text-xl font-medium leading-6"
                               >Write a title</label
                             >
                             <div class="mt-2">
                               <div
                                 class="flex shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-gray-800 focus-within:ring-2 focus-within:ring-inset focus-within:ring-gray-600 sm:max-w-md"
                               >
                                 <input
                                   v-model="post.postTitle"
                                   type="text"
                                   class="block flex-1 w-full border-0 bg-transparent py-1.5 px-1 placeholder:focus:ring-0 sm:text-sm sm:leading-6"
                                 />
                               </div>
                             </div>
                           </div>
 
                           <div class="col-span-full">
                             <label
                               for="about"
                               class="block text-sm sm:text-xl font-medium leading-6"
                               >Write a story</label
                             >
                             <div class="mt-2">
                               <textarea
                                 v-model="post.postText"
                                 id="about"
                                 name="about"
                                 rows="5"
                                 class="block w-full bg-black dark:bg-gray-100 border-0 py-1.5 px-1 shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-gray-800 placeholder: focus:ring-2 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6"
                               />
                             </div>
                           </div>
 
                           <PostUploadPhoto :supabase="supabase" @photo-name="photo => post.postPhoto = photo" />
                         </div>
                       </div>
                     </div>
                   </form>
                 </div>
                 <h2
                   v-if="success"
                   class="text-sm dark:bg-black dark:text-green-300 bg-white text-green-700 text-center sm:text-xl leading-7"
                 >
                   Success!
                 </h2>
               </div>
               <div
                 class="bg-black dark:bg-gray-100 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6"
               >
                 <button
                   type="button"
                   class="inline-flex w-full justify-center px-3 py-2 text-sm bg-white dark:bg-black text-white dark:text-white shadow-sm font-medium dark:hover:text-gray-300 dark:hover:bg-gray-700 hover:text-gray-900 hover:bg-gray-100 sm:ml-3 sm:w-auto ring-1 ring-inset ring-gray-300"
                   @click="createPost"
                 >
                   Confirm
                 </button>
                 <button
                   type="button"
                   class="mt-3 inline-flex w-full justify-center bg-white px-3 py-2 text-sm text-white dark:text-black shadow-sm hover:bg-gray-100 hover:text-gray-900 sm:mt-0 sm:w-auto dark:hover:text-gray-300 dark:hover:bg-gray-700 dark:ring-1 dark:ring-inset dark:ring-gray-300"
                   @click="$emit('closeModal')"
                   ref="cancelButtonRef"
                 >
                   Cancel
                 </button>
               </div>
             </div>
           </div>
         </div>
       </div>
       <Error v-if="error" :error="error" />
     </div>
   </div>
   <UILoading v-if="loading" />
 </template>
 
 <script setup>
 import { onClickOutside } from "@vueuse/core";
 
 const target = ref(null);
 onClickOutside(target, (event) => emit("closeModal"));
 
 const emit = defineEmits({
   closeModal() {return false},
   reloadPosts() {},
 });
 
 const supabase = useSupabaseClient();
 const userId = ref(null);
 const loading = ref(false);
 const success = ref(false);
 const error = ref(null);
 const post = reactive({
   postTitle: "",
   postText: "",
   postPhoto: null,
 });
 
 onBeforeMount(() => {
   userId.value = localStorage.getItem("userId");
 });
 
 async function createPost() {
   if (post.postTitle || post.postText || post.postPhoto) {
     loading.value = true;
     try {
       const {error} = await supabase.from("posts").insert({ author: userId.value, title: post.postTitle, text: post.postText, img: post.postPhoto })
       post.postTitle = "";
       post.postText = "";
       success.value = true;
       setTimeout(() => {
         success.value = false;
         emit("closeModal");
         emit("reloadPosts");
       }, 1000);
     } catch (error) {
       error.value = error;
     } finally { loading.value = false }
   } else {
     error.value = { message: "You cannot upload empty post" };
   }
 }
 
 async function addPhoto(ev) {
   loading.value = true;
   const photo = ev.target.files[0];
   try {
     post.postPhoto = await useAddPhoto(supabase, 'post_photos', photo)
   } catch (error) {
     error.value = error;
   } finally {
     loading.value = false;
   }
 }
 </script> 