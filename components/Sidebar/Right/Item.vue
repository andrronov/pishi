<template>
   <div :class="defaultTransition" class="p-3 border-b text-ellipsis whitespace-nowrap overflow-hidden border-white dark:border-black hover:bg-gray-100 hover:text-gray-900 cursor-pointer dark:hover:bg-gray-900 dark:hover:text-gray-100">
    <slot></slot>
   </div>
 </template>
 
 <script setup>
 const {defaultTransition} = useTailwindConfig()
 
 </script>
 
 <style>
 
 </style>