<template>
  <div>
    <ul role="list" class="divide-y overflow-y-auto mt-3 -mb-3 max-h-44 divide-gray-100 dark:divide-gray-900">
      <li class="flex justify-between gap-x-6 py-2">
        <div class="flex min-w-0 gap-x-4">
          <slot name="commentData"></slot>
        </div>
        <!-- <div class="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
          <p class="text-sm text-gray-400 dark:text-gray-600">
            <slot name="likes"></slot>
          </p>
          <p class="mt-1 text-2xl leading-5 text-gray-500">
            <NuxtIcon name="heart" />
          </p>
        </div> -->
      </li>
    </ul>
    
  </div>
 </template>
 
 <script setup>


 </script>