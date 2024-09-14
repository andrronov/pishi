import { defineStore } from "pinia"

export const useUserStore = defineStore('user', {
   state: () => ({
      uData: {},
   }),
   actions: {
      updateUser(userData){
         this.uData = userData
      },
      getUser(){
         return this.uData
      },
   }
})