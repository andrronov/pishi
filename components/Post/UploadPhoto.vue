<template>
  <div class="col-span-full">
    <label
      @change="addPhoto"
      for="photo"
      class="block text-sm sm:text-xl font-medium leading-6"
    >
      Photo
      <div class="flex flex-col gap-x-3">
        <input class="my-4 text-transparent cursor-pointer" type="file" />
        <img
          v-if="postPhoto"
          :src="postPhoto"
          class="my-4"
          alt="photo preview"
        />
      </div>
      <button
        @click="postPhoto = null"
        type="button"
        class="bg-white px-2.5 py-1.5 text-sm sm:text-base shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
      >
        Delete
      </button>
    </label>
  </div>

  <UILoading v-if="loading" />
  <Error v-if="errorLog" :error="errorLog" />
</template>

<script setup>
const props = defineProps({
   supabase: {type: Object}
})
const emit = defineEmits({
  photoName(){return}
})

const postPhoto = ref(null);
const loading = ref(false);
const errorLog = ref(null)

async function addPhoto(ev) {
  loading.value = true;
  const photo = ev.target.files[0];
  try {
    postPhoto.value = await useAddPhoto(props.supabase, "photos", photo);
    emit('photoName', postPhoto.value)
  } catch (error) {
    errorLog.value = error;
  } finally {
    loading.value = false;
  }
}
</script>