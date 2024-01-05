<template>
   <div class="flex flex-col">
    <!-- card 'inbox' -->
       <SidebarRightFastCard title="Friends">
          <SidebarRightItem v-for="(frnd, index) in 3" :key="index">
             <div>
                <p class="text-sm">{{frnd.index}}</p>
             </div>
          </SidebarRightItem>
       </SidebarRightFastCard>
 
    <!-- card 'who to add' -->
       <SidebarRightFastCard title="Smth Else">
          <SidebarRightItem v-for="(item, index) in 3" :key="index">
             <div class="flex flex-row justify-between items-center p-2">
                <p>{{item.index}}</p>
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