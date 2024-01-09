<template>
   <div class="flex flex-col w-full p-4 my-4 border-y-2 border-white dark:border-black bg-gray-800 text-white dark:bg-gray-200 dark:text-black" id="wrapper">
      <div class="flex w-full flex-row justify-between items-center mb-6">
         <div class="flex flex-row items-center gap-4">
            <slot name="postData"></slot>
         </div>
         <NuxtIcon name="threepoints" class="justify-self-end" />
      </div>
      <div class="mb-4">
      <slot name="postTitle"></slot>
      </div>
      <div class="mb-4">
         <slot name="postText"></slot>
      </div>
      <div class="mb-4">
         <slot name="postImage"></slot>
      </div>
      <div class="flex flex-row h-auto items-center">
         <div class="flex flex-row items-center gap-1 bg-white hover:bg-gray-300 hover:text-gray-800 dark:hover:bg-gray-700 dark:hover:text-gray-300 text-black dark:bg-black scale-150 dark:text-white p-1 ml-3 mr-7 cursor-pointer">
            <NuxtIcon name="like" />
            <slot name="postLikes"></slot>
         </div>
         <slot name="commentsButton"></slot>
         <slot name="shareButton"></slot>
      </div>
      <slot name="commentSection"></slot>
   </div>
</template>

<script setup>

</script>

<style>

</style>