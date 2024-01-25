<template>
   <div class="border-x">
      <!-- <div class="sticky top-0 px-4 bg-white/80 backdrop-blur-md py-3 dark:bg-red-500/80">
         <h2 class="text-lg font-semibold text-gray-600">Whats new /поменяй потом на добавление публикации/</h2>
      </div> -->
      <div>
         <div class="flex flex-row w-full items-center text-white dark:text-black">
            <div :class="defaultTransition" @click="modalOpen = true" class="p-3 flex flex-row w-2/4 justify-center items-center gap-2 border-2 border-white dark:border-black hover:text-gray-500 hover:bg-gray-200 cursor-pointer">
               <NuxtIcon name="post" />
               <button>Add post</button>
            </div>
            <div :class="defaultTransition" class="p-3 flex flex-row w-2/4 justify-center items-center gap-2 border-2 border-white dark:border-black hover:text-gray-500 hover:bg-gray-200 cursor-pointer">
               <NuxtIcon name="photo" />
               <button>Post photo</button>
            </div>
         </div>
         <AddPost :modal-open="modalOpen" @close-modal="modalOpen = false" @reload-posts="reloadPosts" />
         <slot></slot>
      </div>
   </div>
</template>

<script setup>
const {defaultTransition} = useTailwindConfig()

const emit = defineEmits({
   reloadPosts(){}
})

const modalOpen = ref(false);

function reloadPosts(){
   console.log('emitting to feed');
   emit('reloadPosts');
}

const props = defineProps({
  loading: {
    type: Boolean,
    default: false,
  },
});
</script>

<style>

</style>