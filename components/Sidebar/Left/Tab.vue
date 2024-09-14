<template>
   <div>
      <NuxtLink :to="link" :class="isActive" class="flex flex-row border-y-2 border-white dark:border-black hover:font-bold items-center sm:justify-start justify-center p-3 gap-1">
        <div>
          <slot name="icon"></slot>
        </div>
        <div class="hidden sm:block">
          <slot name="name"></slot>
        </div>
      </NuxtLink>
    </div>
</template>

<script setup>
const {defaultTransition} = useTailwindConfig()

const pIsActive = defineProps({
  active: {
    type: Boolean,
    default: false
  },
  link: {
    type: String,
    default: '/'
  }
})
</script>

<style>

</style>