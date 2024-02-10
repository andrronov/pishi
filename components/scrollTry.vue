<!-- <template>
   <div class="scroller-container" @scroll="handleScroll">
     <slot></slot>
   </div>
 </template>
 
 <script>
 export default {
   methods: {
     handleScroll(event) {
       clearTimeout(this.scrollTimeout);
       this.scrollTimeout = setTimeout(() => {
         const container = event.target;
         const scrollTop = container.scrollTop;
         const snapHeight = container.clientHeight;
         
         const snapIndex = Math.round(scrollTop / snapHeight);
         const snapPosition = snapIndex * snapHeight;
       
         container.scrollTo({
           top: snapPosition,
           behavior: 'smooth',
         });
       }, 100);
     }
   }
 }
 </script>
 
 <style scoped>
 .scroller-container {
   width: 100%;
   height: 100%;
   overflow: auto;
   scroll-snap-type: y mandatory;
 }
 
 .scroller-container > div {
   scroll-snap-align: start;
   scroll-snap-stop: normal;
 }
 </style> -->

 <template>
  <!-- <div class="flex ml-[50%] items-end justify-start pt-10 mb-6">
</div> -->
<!-- Contents -->
<div class="relative w-full flex gap-6 snap-x snap-mandatory overflow-x-auto pb-14">
  <div class="snap-center shrink-0 opacity-0">
    <div class="shrink-0 w-4 sm:w-48"></div>
  </div>
  <div v-for="(item, index) in 10" :key="index" class="snap-always w-full bg-gray-300 h-96 snap-center shrink-0 first:pl-8 last:pr-8">
    <img class="shrink-0 w-80 h-40 object-cover rounded-lg shadow-xl bg-white" src="https://images.unsplash.com/photo-1604999565976-8913ad2ddb7c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=320&h=160&q=80" />
  </div>
  <div class="snap-center shrink-0 opacity-0">
    <div class="shrink-0 w-4 sm:w-48"></div>
  </div>
</div>
 </template>