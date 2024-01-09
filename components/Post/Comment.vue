<template>
  <div>
    <ul role="list" class="divide-y overflow-y-auto mt-3 -mb-3 max-h-44 divide-gray-100 dark:divide-gray-900">
      <li class="flex justify-between gap-x-6 py-2">
        <div class="flex min-w-0 gap-x-4">
          <img class="h-12 w-12 flex-none bg-gray-50" src="/me.jpg" alt="" />
          <div class="min-w-0 flex-auto">
            <p class="text-sm leading-6 text-gray-400 dark:text-gray-600">
              <slot name="nickname"></slot>
              <slot name="created_at"></slot>
            </p>
            <p class="mt-1 text-xs leading-5 text-gray-200 dark:text-gray-900">
              <slot name="commentary"></slot>
            </p>
          </div>
        </div>
        <div class="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
          <p class="text-sm text-gray-400 dark:text-gray-600">
            <slot name="likes"></slot>
          </p>
          <p class="mt-1 text-2xl leading-5 text-gray-500">
            <NuxtIcon name="heart" />
          </p>
        </div>
      </li>
    </ul>
  </div>
 </template>
 
 <script setup>
 const props = defineProps({
  commentsView: {
    type: Boolean,
    default: false
  },
  // text: {
  //   type: String,
  //   default: ''
  // }
 })


 </script>