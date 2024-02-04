<template>
   <!-- мб заменить на две продольные -->
  <div class="m-2 border-y-2 text-white border-white dark:border-black dark:text-black">
   <h1 class="p-3 text-xl font-semibold border-b text-black bg-white dark:bg-black dark:text-white border-white dark:border-black">{{ props.title }}</h1>
   <slot></slot>
   <div @click="navigateTo(props.link)" :class="defaultTransition" class="p-3 text-xs text-gray-300 dark:text-gray-800 cursor-pointer hover:bg-gray-100 hover:text-gray-900 dark:hover:bg-gray-900 dark:hover:text-gray-100">
      More</div>
  </div>
</template>

<script setup>
const {defaultTransition} = useTailwindConfig()
const supabase = useSupabaseClient()

const props = defineProps({
   title: {
      type: String,
      required: true
   },
   link: {
      type: String
   }
})
</script>

<style>

</style>