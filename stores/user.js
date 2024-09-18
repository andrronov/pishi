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
      deleteUser(){
         localStorage.removeItem('userId')
         this.uData = {}
      },
      getUser(){
         return this.uData
      },
   }
})