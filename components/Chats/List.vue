<template>
   <ul role="list" class="divide-y divide-gray-100 hover:bg-gray-900 dark:hover:bg-gray-100 hover:cursor-pointer">
      <li class="flex justify-between gap-x-6 py-5">
        <div class="flex min-w-0 gap-x-4">
          <slot name="avatar"></slot>
          <div class="min-w-0 flex-auto">
            <p class="text-base leading-6 text-gray-100 dark:text-gray-900">
             <slot name="name"></slot>
            </p>
            <p class="mt-1 truncate text-sm leading-5 text-gray-400 dark:text-gray-700">
             <slot name="nickname"></slot>
            </p>
          </div>
        </div>
        <slot name="lastSeen"></slot>
      </li>
    </ul>
</template>

<script>
export default {

}
</script>

<style>

</style>