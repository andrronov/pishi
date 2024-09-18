import { defineStore } from 'pinia'

export const useThemeStore = defineStore('theme', {
   state: () => ({
      isLightTheme: false
   }),
   getters: {
      theme(state){
         return state.isLightTheme
      }
   },
   actions: {
      init(){
         this.isLightTheme = JSON.parse(localStorage.getItem('mode'))
      },
      setTheme(theme){
         localStorage.setItem('mode', theme)
         this.isLightTheme = theme
      }
   },
   
})