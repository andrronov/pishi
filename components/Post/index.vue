<template>
   <div class="flex flex-col w-full p-4 my-4 border-y-2 border-white dark:border-black bg-gray-800 text-white dark:bg-gray-200 dark:text-black" id="wrapper">
      <div class="flex w-full flex-row justify-between relative items-center mb-6">
         <div class="flex flex-row items-center gap-4">
            <slot name="postData"></slot>
         </div>
         <NuxtIcon name="threepoints" @click="showPostMenu = true" class="justify-self-end cursor-pointer" />
         <PostMenu v-if="showPostMenu" :isMyPage="isMyPage" :show="showPostMenu" @delete="deletePost()" @close-modal="showPostMenu = false" />
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
            <slot name="postLikes"></slot>
         <slot name="commentsButton"></slot>
         <slot name="shareButton"></slot>
      </div>
      <div class="mt-4 overflow-y-scroll max-h-56">
         <slot name="commentSection"></slot>
      </div>
   </div>
</template>

<script setup>
const emits = defineEmits({
   delete(){}
})
const props = defineProps({
   showPostMenu: {
      type: Boolean,
      default: false
   },
   isMyPage: {
      type: Boolean,
      default: false
   }
})
function deletePost(){
   emits('delete')
}
</script>

<style>

</style>