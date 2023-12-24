<template>
   <div class="flex flex-col">
    <!-- card 'inbox' -->
       <SidebarRightFastCard title="Inbox">
          <SidebarRightItem v-for="(notify, index) in inboxArray" :key="index">
             <div>
                <p class="text-sm">{{notify.text}}</p>
             </div>
          </SidebarRightItem>
       </SidebarRightFastCard>
 
    <!-- card 'who to add' -->
       <SidebarRightFastCard title="Who to add">
          <SidebarRightItem v-for="(whoToAdd, index) in possibleFriendsArray" :key="index">
             <div class="flex flex-row justify-between items-center p-2">
                <img :src="whoToAdd.photoUrl" class="w-14 h-14" alt="photo">
                <p>@{{whoToAdd.nickname}}</p>
                <nuxt-icon name="plus-circle" class="text-4xl"></nuxt-icon>
             </div>
          </SidebarRightItem>
       </SidebarRightFastCard>
   </div>
 </template>
 
 <script setup>
 // сделай в конце сообщения (это просто строка) иконку по типу нотификации (если кто-то лайкнул, в конце обозначение-иконку лайка)
 const inboxArray = ref([
    {
       text: "@andrronov liked your photo",
       notIcon: null
    },
    {
       text: "@andrronov wants to add you in friends",
       notIcon: null
    },
    {
       text: "@andrronov replied to your commentary",
       notIcon: null
    }
 ])
 const possibleFriendsArray = ref([
    {
       photoUrl: '/me.jpg',
       nickname: 'andrronov'
    },
    {
       photoUrl: null,
       nickname: 'andronovv'
    },
    {
       photoUrl: null,
       nickname: 'aandronov'
    }
 ])
 </script>
 
 <style>
 
 </style>