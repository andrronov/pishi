<template>
  <ul
    role="list"
    class="divide-y divide-gray-100 hover:bg-gray-900 dark:hover:bg-gray-100 hover:cursor-pointer"
  >
    <li class="flex justify-between gap-x-6 py-5">
      <div class="flex min-w-0 gap-x-4">
        <img
          :src="props.avatar"
          alt="avatar"
          class="h-12 w-12 object-cover flex-none bg-gray-50"
        />
        <div class="min-w-0 flex-auto">
          <p class="text-base leading-6 text-gray-100 dark:text-gray-900">
            {{ props.name }}
            {{ props.surname }}
          </p>
          <p
            class="mt-1 truncate text-sm leading-5 text-gray-400 dark:text-gray-700"
          >
            @{{ props.userId }}
          </p>
        </div>
      </div>
      <OnlineStatus :prmtrs="props.userId" />
    </li>
  </ul>
</template>

<script setup>
const props = defineProps({
  avatar: {type: String},
  name: {type: String, default: 'Undefined'},
  surname: {type: String, default: '-'},
  userId: {type: String, default: '0-0-0'},
})
</script>
