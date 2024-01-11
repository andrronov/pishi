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
const isActive = computed(() => pIsActive.active ? 'bg-white text-black dark:bg-black dark:text-white' : 'font-normal dark:text-black text-white')
</script>

<style>

</style>