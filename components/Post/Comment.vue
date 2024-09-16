<template>
  <div>
    <ul role="list" class="divide-y mt-3 -mb-3 max-h-44 divide-gray-100 dark:divide-gray-900">
      <li class="flex justify-between gap-x-6 py-2">
        <div class="flex min-w-0 gap-x-4">
          <div class="flex min-w-0 z-20 gap-x-4 cursor-pointer" @click="toUser(comm.profiles.id)">
            <img class="h-12 w-12 object-cover flex-none bg-gray-50" :src="comm.profiles.avatar" alt="avatar" />
            <div class="min-w-0 flex-auto">
               <p class="text-sm leading-6 text-gray-400 dark:text-gray-600">
                  @{{ comm.profiles.id }}
                  | {{ formatTimeAgo(new Date(comm.created_at)) }}
               </p>
               <p class="mt-1 text-xs leading-5 text-gray-200 dark:text-gray-900">
                  {{ comm.text }}
               </p>
            </div>
         </div>
        </div>
        <!-- <PostLike /> -->
        <!-- <slot name="likes"></slot> -->
      </li>
    </ul>
    
  </div>
</template>
 
<script setup>
import { formatTimeAgo } from '@vueuse/core'

const props = defineProps({
  comm: {type: Object}
})

console.log(props.comm);
 </script>