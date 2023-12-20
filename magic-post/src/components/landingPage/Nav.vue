<template>
  <nav id="header" class="fixed w-full z-30 top-0 text-white">
    <div
      class="w-full container mx-auto flex flex-wrap items-center justify-between mt-0 py-2"
    >
      <div class="pl-4 flex items-center">
        <a
          class="toggleColour text-white no-underline hover:no-underline font-bold text-2xl lg:text-4xl"
          href="#"
        >
          <svg 
          xmlns="http://www.w3.org/2000/svg" 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke-width="1.5" 
          stroke="currentColor"  
          class="h-8 inline">
            <path 
            stroke-linecap="round" 
            stroke-linejoin="round" 
            d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 0 0-3.213-9.193 2.056 2.056 0 0 0-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 0 0-10.026 0 1.106 1.106 0 0 0-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
          </svg>
          MAGIC POST
        </a>
      </div>

      <!--menu button-->
      <div class="block lg:hidden pr-4">
        <button
          @click="mobileSidebar = !mobileSidebar"
          id="nav-toggle"
          class="flex items-center p-1 text-green-800 hover:text-gray-900 focus:outline-none focus:shadow-outline transform transition hover:scale-105 duration-300 ease-in-out"
        >
          <svg
            class="fill-current h-6 w-6"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <title>Menu</title>
            <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
          </svg>
        </button>
      </div>
      
      <div
        :class="mobileSidebar ? '' : 'hidden'"
        class="w-full flex-grow lg:flex lg:items-center lg:w-auto mt-2 lg:mt-0 bg-white lg:bg-transparent text-black p-4 lg:p-0 z-20"
        id="nav-content"
      >
        <ul class="list-reset lg:flex justify-end flex-1 items-center">
          <li class="mr-3">
            <a
              class="inline-block uppercase py-2 px-4 font-medium no-underline"
              href="#"
              >Trang chủ</a
            >
          </li>
          <li class="mr-3">
            <a
              class="inline-block uppercase no-underline font-medium hover:text-gray-800 hover:text-underline py-2 px-4"
              href="#search"
              >Tra cứu</a
            >
          </li>
          <li class="mr-3">
            <a
              class="inline-block uppercase no-underline font-medium hover:text-gray-800 hover:text-underline py-2 px-4"
              href="#comments"
              >Đánh giá</a
            >
          </li>
          <li class="mr-3">
            <a
              class="inline-block uppercase no-underline font-medium hover:text-gray-800 hover:text-underline py-2 px-4"
              href="#contact"
              >Contact</a
            >
          </li>
        </ul>
        <button
          id="navLogin"
          class="mx-auto lg:mx-0 hover:underline bg-white text-gray-800 font-bold rounded-full mt-4 lg:mt-0 py-4 px-8 shadow opacity-75 focus:outline-none focus:shadow-outline transform transition hover:scale-105 duration-300 ease-in-out"
        >
          Đăng nhập
        </button>
      </div>
    </div>
    <hr class="border-b border-gray-100 opacity-25 my-0 py-0" />
  </nav>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "layout-nav",
  data() {
    return {
      scrollY: 0,
      mobileSidebar: false,
    };
  },
  mounted() {
    this.scrollY = window.scrollY;

    // Listen to the scroll event to update the scrollY property dynamically
    window.addEventListener("scroll", this.handleScroll);
  },

  methods: {
    handleScroll() {
      this.scrollY = window.scrollY;
    },
  },

  watch: {
    scrollY(newValue: number) {
      var navaction = document.getElementById("navAction");
      var header = document.getElementById("header");
      var toToggle = document.querySelector(".toggleColour");
      if (newValue > 10) {
        navaction?.classList.remove("bg-white");
        navaction?.classList.add("gradient");
        navaction?.classList.remove("text-[#170F4F]");
        navaction?.classList.add("text-white");
        header?.classList.add("bg-white");
        header?.classList.add("navbar-active");
        toToggle?.classList.add("text-gray-800");
        toToggle?.classList.remove("text-white");
      } else {
        navaction?.classList.add("bg-white");
        navaction?.classList.remove("gradient");
        navaction?.classList.add("text-[#170F4F]");
        navaction?.classList.remove("text-white");
        header?.classList.remove("bg-white");
        header?.classList.remove("navbar-active");
        toToggle?.classList.remove("text-gray-800");
        toToggle?.classList.add("text-white");
      }
    },
  },
});
</script>

<style>
a {
  font-weight: 600;
  font-style: normal !important;
  color: white;
}

.navbar-active ul li a{
  color: #170F4F;
}
</style>
