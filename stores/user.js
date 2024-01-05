import { defineStore } from "pinia"

export const useUserStore = defineStore('user', {
   state: () => ({
      uData: ''
   }),
   actions: {
      updateUser(userData){
         // console.log('udata', userData)
         this.uData = userData
      },
      getUser(){
         return this.uData
      }
   }
})