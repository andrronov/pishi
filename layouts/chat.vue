<template>
   <div :class="{'dark': lightMode}">
      <div class="bg-black text-white dark:bg-white ">
         <div class="min-h-full">
            <div class="grid grid-cols-12 mx-auto sm:px-6 gap-1 lg:max-w-7xl lg:px-8 lg:gap-5">
               <!-- left sidebar -->
               <div class="md:block col-span-2 xs:col-span-1 sm:col-span-2">
                  <div class="sticky top-0">
                     <SidebarLeft />
                  </div>
               </div>
 
               <!-- main content -->
               <main class="col-span-10 xs:col-span-11 md:col-span-10">
                  <slot />
               </main>
 
            </div>
         </div>
      </div>
   </div>
 </template>

<script setup>
const userId = ref(null)
const lightMode = ref(false)
const supabase = useSupabaseClient()
const userThemeStore = useThemeStore()

onMounted(() => {
   userId.value = localStorage.getItem('userId')
})

watchEffect(() => {
   lightMode.value = userThemeStore.theme
})

watchEffect(async() => {
   if(userId.value && !useUserStore().getUser().id){
      const { data } = await supabase.from("profiles").select().eq("id", userId.value)
      useUserStore().setUser(data[0])
   }
})
</script>