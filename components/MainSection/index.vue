<template>
   <div class="border-x">
      <div class="sticky top-0 px-4 bg-white/80 backdrop-blur-md py-3 dark:bg-red-500/80">
         <h2 class="text-lg font-semibold text-gray-600">Whats new /поменяй потом на добавление публикации/</h2>
      </div>
      <div v-if="loading" class="flec items-center justify-center p-4 border-b">
         <UISpinner />
      </div>
      <div v-else>
         <slot></slot>
      </div>
   </div>
</template>

<script setup>
const {defaultTransition} = useTailwindConfig()

const props = defineProps({
   loading: {
      type: Boolean,
      default: false
   }
})
</script>

<style>

</style>