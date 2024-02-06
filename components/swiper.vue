<template>
  <div class="wrapper">
    <header class="header">
       <nav class="header__menu menu">
          <a href="#" class="menu__link">Привет!</a>
          <a href="#" class="menu__link">О себе</a>
          <a href="#" class="menu__link">Увлечения</a>
          <a href="#" class="menu__link">Покака!</a>
       </nav>
    </header>
  <main class="page">
    <div class="page__wrapper">
       <div class="page__screen screen">
          <div class="screen__content">
             <h1 class="screen__title screen__title_bg" data-swiper-parallax="50%" data-swiper-parallax-opacity="0">Привет! Я Андрей!</h1>
             <div class="screen__text aa" data-swiper-parallax-opacity="0" data-swiper-parallax="-100%" data-swiper-parallax-duration="900">
                <p>Студент, 18 лет</p>
                <p>Отличник, ни разу не опаздывал на пары.</p>
             </div>
          </div>
          <div class="screen__body">
             <div class="screen__image" data-swiper-parallax="33%" data-swiper-parallax-scale="1.1">
                <!-- <img src="img/img_palto.jpg" alt=""> -->
             </div>
          </div>
       </div>
       <div class="page__screen screen">
          <div class="screen__content bb">
             <div class="o_sebe">
             <h2 class="screen__title ab" data-swiper-parallax-opacity="0" data-swiper-parallax="-100%" data-swiper-parallax-duration="1000">О себе</h2>
             <div class="screen__text ab" data-swiper-parallax-opacity="0" data-swiper-parallax="-100%" data-swiper-parallax-duration="900">
                <p>18 лет, высокий молодой человек, брюнет.</p>
                <p>Много смеется, любит шаурму и пельмени.</p>
                <p>Характер скверный. Не женат.</p>
             </div></div>
             <div class="img_conteiner">
                <!-- <img src="img/img_doc.jpg"> -->
             </div>
          </div>
       </div>
       <div class="page__screen screen">
          <div class="screen__body">
             <div class="screen__image" data-swiper-parallax="50%">
                <!-- <img src="img/img_smile.jpg" alt=""> -->
             </div>
             <div class="uvlechenia">
                <h2 class="screen__title ac" data-swiper-parallax-opacity="0" data-swiper-parallax="-100%" data-swiper-parallax-duration="1000">Увлечения</h2>
                <div class="screen__text ac" data-swiper-parallax-opacity="0" data-swiper-parallax="-100%" data-swiper-parallax-duration="900">
                   <p>Катаюсь на скейте, люблю футбол, слушаю рок и получаю удовольствие от позитивной веселой компании.</p>
                   <div class="screen__text right"><p>Любитель спаржи, ценитель горького шоколада, фанат зеленых бананов, гурман качественной музыки (не то, что сейчас), плохой, но угарный футболист.</p></div>
                </div>
             </div>
          </div>
       </div>
       <div class="page__screen screen red">
          <div class="screen__content cb">
             <div class="osebee">
             <h2 class="screen__title cb" data-swiper-parallax-opacity="0" data-swiper-parallax="-100%" data-swiper-parallax-duration="1000">Приятно было познакомиться! Покака!</h2>
             </div>
          </div>
       </div>
    </div>
    <div class="page__pagignatiion"></div>
    <div class="page__scroll"></div>
 </main>
 </div>
</template>
<script>
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/css";

let wrapper = document.querySelector('.wrapper');
let pageSlider = new Swiper('.page',{
   wrapperClass: "page__wrapper",
   slideClass: "page__screen",

   direction: 'vertical',
   slidesPerView: 'auto',
   parallax: true,

   // Управление клавой
   keyboard: {
      enabled: true,
      onlyInViewport: true,
      pageUpDown: true,
   },

   // Управление колесом мышки
   mousewheel: {
      sensitivity: 1,
   },

   watchOverflow: true,
   speed: 800,

   // Обновление свайпера при изменении элементов слайдера
   observer: true,
   observeParents: true,
   observeSlideChildren: true,

   // Навигация (элементы управления)
   pagination: {
      el: '.page__pagignation',
      type: 'bullets',
      clickable: true,
      bulletClass: "page__bullet",
      bulletActiveClass: "page__bullet_active",
   },
   // Скролл
   scrollbar: {
      el: '.page__scroll',
      dragClass: "page__drag-scroll",
      draggable: true
   },

   init: false,

   // События
   on: {
      init: function(){
         menuSlider();
         wrapper.classList.add('_loaded')
      },
      slideChange: function(){
         menuSliderRemove();
         menuLinks[pageSlider.realIndex].classList.add('_active');
      },
   },
});

let menuLinks = document.querySelectorAll('.menu__link');

function menuSlider(){
   if (menuLinks.length > 0){
      menuLinks[pageSlider.realIndex].classList.add('_active');
      for (let index = 0; index < menuLinks.length; index++){
         const menuLink = menuLinks[index];
         menuLink.addEventListener("click", function(e){
            menuSliderRemove();
            pageSlider.slideTo(index, 800);
            menuLink.classList.add('_active');
            e.preventDefault();
         });
      }
   }
}

function menuSliderRemove(){
   let menuLinkActive = document.querySelector('.menu__link._active');
   if (menuLinkActive){
      menuLinkActive.classList.remove('_active');
   }
}

pageSlider.init();
</script>
<!-- <script src="https://cdn.jsdelivr.net/npm/swiper@8/swiper-bundle.min.js"></script> -->
<!-- <script src="script.js"></script> -->



<!-- <template>
  <div class="h-screen bg-red-100">
    <Swiper class="h-screen"
    :slides-per-view="1"
    :space-between="50"
  >
    <swiperSlide>Slide 1</swiperSlide>
    <swiperSlide>Slide 2</swiperSlide>
    <swiperSlide>Slide 3</swiperSlide>
    ...
  </Swiper>
  </div>
</template>

<script setup>
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/css";
</script> -->
