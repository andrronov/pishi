<template>
  <div as="template" v-if="props.modalOpen">
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
                        <div
                          class="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6"
                        >

                          <div class="col-span-full">
                            <label
                              @change="addPhoto"
                              for="photo"
                              class="block text-sm sm:text-xl font-medium leading-6"
                            >
                              Photo
                              <div class="flex flex-col gap-x-3">
                                <input
                                  class="my-4 text-transparent cursor-pointer"
                                  type="file"
                                />
                                <UISpinner class="my-4" v-if="imgLoad" />
                                <img
                                  v-if="postPhoto"
                                  :src="postPhoto"
                                  class="my-4"
                                  alt="photo preview"
                                />
                              </div>
                              <button
                                @click="postPhoto = null"
                                type="button"
                                class="bg-white px-2.5 py-1.5 text-sm sm:text-base shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                              >
                                Delete
                              </button>
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
                <UISpinner class="w-full justify-self-center" v-if="loading" />
                <h2
                  v-if="success"
                  class="text-sm dark:bg-black dark:text-green-300 bg-white text-green-700 text-center sm:text-xl leading-7"
                >
                  Success!
                </h2>
                <h2
                  v-if="errorLog"
                  class="text-sm dark:bg-black dark:text-red-300 bg-white text-red-700 text-center sm:text-xl leading-7"
                >
                  Something went wrong: {{ errorLog.message }}
                </h2>
              </div>
              <div
                class="bg-black dark:bg-gray-100 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6"
              >
                <button
                  type="button"
                  class="inline-flex w-full justify-center px-3 py-2 text-sm bg-white dark:bg-black text-white dark:text-white shadow-sm font-medium dark:hover:text-gray-300 dark:hover:bg-gray-700 hover:text-gray-900 hover:bg-gray-100 sm:ml-3 sm:w-auto ring-1 ring-inset ring-gray-300"
                  @click="publishPhoto"
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

const props = defineProps({
   modalOpen: {
      type: Boolean,
      default: false,
   }
})

const supabase = useSupabaseClient()
const session = await supabase.auth.getSession();

const loading = ref(false)
 const imgLoad = ref(false)
 const success = ref(false)
 const errorLog = ref(null)
 const postPhoto = ref(null)

 async function addPhoto(ev){
  imgLoad.value = true
  const photo = ev.target.files[0]
  const newPhotoName = Date.now() + (Math.random() * 1000).toFixed()
  const {data, error} = await supabase.storage.from('photos').upload(newPhotoName, photo)
  if(!error){
    postPhoto.value = 'https://ilabflsecnunffcornxh.supabase.co/storage/v1/object/public/photos/' + data.path
  }
  if(postPhoto.value){
    imgLoad.value = false
  }
}

async function publishPhoto(){
  if(postPhoto.value){
    errorLog.value = null
    const {data, error} = await supabase.from('photos').insert({author: session.data.session.user.id, img: postPhoto.value})
    if(!error){
        success.value = true
          setTimeout(() =>{
              success.value = false
              postPhoto.value = null
              emit('closeModal')
          }, 1000)
    } else {
          errorLog.value = res.error
          loading.value = false
          setTimeout(() => {
              errorLog.value = null
          }, 5000);
          throw new Error(res.error)
        }
  } else {
    errorLog.value = {message: 'You cannot upload an empty photo'}
    throw new Error()
  }
}
</script>
