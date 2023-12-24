<template>
   <div>
      <NuxtLink to="/" :class="isActive" class="flex flex-row border-y-2 border-white dark:border-black hover:font-bold items-center sm:justify-start justify-center p-3 gap-1">
        <!-- <nuxt-icon name="home"></nuxt-icon> -->
        <div>
         <slot name="icon"></slot>
        </div>
        <div class="hidden sm:block">
         <slot name="name"></slot>
        </div>
        <!-- <p class="text-white dark:text-black" :class="textClass">Feed</p> -->
      </NuxtLink>
    </div>
</template>

<script setup>
const {defaultTransition} = useTailwindConfig()

const pIsActive = defineProps({
  active: {
    type: Boolean,
    default: false
  }
})
const isActive = computed(() => pIsActive.active ? 'bg-white text-black dark:bg-black dark:text-white' : 'font-normal dark:text-black text-white')
</script>

<style>

</style>