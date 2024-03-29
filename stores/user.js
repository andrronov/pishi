import { defineStore } from "pinia"

export const useUserStore = defineStore('user', {
   state: () => ({
      uData: '',
      // isDarkMode: ''
   }),
   actions: {
      updateUser(userData){
         console.log('udata', userData)
         this.uData = userData
      },
      getUser(){
         return this.uData
      },
      // setMode(mode){
      //    console.log('mode', mode)
      //    this.isDarkMode = mode
      // },
      // getMode(){
      //    return this.isDarkMode
      // }
   }
})