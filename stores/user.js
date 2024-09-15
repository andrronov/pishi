import { defineStore } from "pinia"

export const useUserStore = defineStore('user', {
   state: () => ({
      uData: {},
   }),
   actions: {
      setUser(userData){
         localStorage.setItem('userId', userData.id)
         this.uData = userData
      },
      getUser(){
         return this.uData
      },
   }
})