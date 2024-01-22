<template>
    <div as="template" v-if="show">
      <div as="div" class="relative z-10">
        <div as="template" enter="ease-out duration-300" enter-from="opacity-0" enter-to="opacity-100" leave="ease-in duration-200" leave-from="opacity-100" leave-to="opacity-0">
          <div class="fixed inset-0 bg-gray-900 dark:bg-gray-200 bg-opacity-75 transition-opacity" />
        </div>
  
        <div class="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div class="flex min-h-full items-center justify-center p-4 text-center sm:items-center sm:p-0">
            <div as="template" enter="ease-out duration-300" enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95" enter-to="opacity-100 translate-y-0 sm:scale-100" leave="ease-in duration-200" leave-from="opacity-100 translate-y-0 sm:scale-100" leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95">
              <div ref="target" class="relative transform overflow-hidden text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                <div class="bg-black dark:bg-gray-100 px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                  <div class="flex flex-col items-center">
                     <img :src="photo" alt="photo">
                     <UISpinner class="w-full justify-self-center" v-if="!photo" />
                  </div>
                </div>
                <div class="bg-black dark:bg-gray-100 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                  <button type="button" class="mt-3 inline-flex w-full justify-center bg-white px-3 py-2 text-sm text-white dark:text-black shadow-sm  hover:bg-gray-100 hover:text-gray-900 sm:mt-0 sm:w-auto dark:hover:text-gray-300 dark:hover:bg-gray-700 dark:ring-1 dark:ring-inset dark:ring-gray-300" @click="$emit('closeModal')" ref="cancelButtonRef">Close</button>
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
onClickOutside(target, event => emits('closeModal'))
const props = defineProps({
   show: {
      type: Boolean,
      default: false
   },
   photo: {
      type: String,
   }
})
const emits = defineEmits({
  closeModal(){}
})
</script>