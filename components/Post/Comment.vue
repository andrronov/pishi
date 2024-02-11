<template>
  <div>
    <ul role="list" class="divide-y mt-3 -mb-3 max-h-44 divide-gray-100 dark:divide-gray-900">
      <li class="flex justify-between gap-x-6 py-2">
        <div class="flex min-w-0 gap-x-4">
          <slot name="commentData"></slot>
        </div>
        <slot name="likes"></slot>
      </li>
    </ul>
    
  </div>
 </template>
 
 <script setup>

 </script>