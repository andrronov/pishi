<template>
  <div class="flex flex-row w-full items-center text-white dark:text-black">
    <button
      v-for="(tab, index) in tabs"
      :key="index"
      class="p-3 flex flex-row w-2/4 h-14 justify-center items-center gap-2 border-2"
      @click="currentTab = index"
      :class="
        index == currentTab
          ? 'border-white dark:border-black hover:text-gray-500 hover:bg-gray-200 cursor-pointer bg-white dark:bg-black dark:hover:bg-gray-700 dark:hover:text-gray-300 dark:text-white text-black'
          : 'bg-black dark:bg-white hover:text-gray-300 hover:bg-gray-700 dark:hover:bg-gray-400 dark:hover:text-gray-600 cursor-pointer text-white dark:text-black'
      "
    >
      {{ tab }}
    </button>
  </div>
  <FriendsTabSubs v-if="currentTab === 0">
   <FriendsList>
      <template #name>
         Andrew Andronov
      </template>
      <template #nickname>
         @andrronov
      </template>
      <template #lastSeen>
         <div class="shrink-0 flex flex-col items-end">
            <p v-if="false" class="mt-1 text-xs leading-5 text-gray-500">
              <time>3h ago</time>
            </p>
            <div v-else class="mt-1 flex items-center gap-x-1.5">
              <div class="flex-none rounded-full bg-emerald-500/20 p-1">
                <div class="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              </div>
              <p class="text-xs leading-5 text-gray-500">Online</p>
            </div>
          </div>
      </template>
   </FriendsList>
  </FriendsTabSubs>
  <FriendsTabSubscripts v-if="currentTab === 1">

   </FriendsTabSubscripts>
</template>

<script setup>
const props = defineProps({
   currentTab: {
      type: Number,
      default: 0
   }
})
// VARIABLES
const tabs = ref(["Subscribers", "Subscriptions"]);
</script>
