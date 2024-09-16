<template>
   <div :class="{'dark': lightMode}">
      <div class="bg-black text-white dark:bg-white ">
         <div class="min-h-full">
            <div class="grid grid-cols-12 mx-auto sm:px-1 gap-1 lg:max-w-7xl lg:px-2 lg:gap-3">
               <!-- left sidebar -->
               <div class="md:block col-span-2 xs:col-span-1 sm:col-span-2">
                  <div class="sticky top-0">
                     <SidebarLeft />
                  </div>
               </div>
 
               <!-- main content -->
               <main class="col-span-10 xs:col-span-11 md:col-span-6">
                  <slot />
               </main>
 
               <!-- right sidebar -->
               <div class="hidden sm:col-span-4 sm:block">
                  <div class="sticky top-0">
                     <SidebarRight />
                  </div>
               </div>
            </div>
         </div>
      </div>
   </div>
 </template>

<script setup>
const userId = ref(null)
const lightMode = ref(false)
const supabase = useSupabaseClient()

onMounted(() => {
   userId.value = localStorage.getItem('userId')
   lightMode.value = JSON.parse(localStorage.getItem('mode'))
})

// STORE USER DATA
watchEffect(async() => {
   if(userId.value && !useUserStore().getUser().id){
      const { data } = await supabase.from("profiles").select().eq("id", userId.value)
      useUserStore().setUser(data[0])
   }
})
</script>