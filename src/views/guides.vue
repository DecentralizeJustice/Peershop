<script setup>
import { ref } from 'vue'
const faq = [
  {
    question: `Do you offer refunds/returns?`,
    answer: `Since this services uses gift registries, returns are completed using your Amazon account and do not require any intervention from us. `
  }
]
const selectedQuestion = ref(-1)
function selectQuestion(chosen) {
  if (selectedQuestion.value === chosen) {
    selectedQuestion.value = -1
    return
  }
  selectedQuestion.value = chosen
}
</script>

<template>
  <section class="py-10 bg-gray-800 overflow-hidden">
  <div class="container mx-auto px-4">
    <div class="relative py-16 px-8 bg-gray-900 overflow-hidden rounded-3xl">
      <div class="absolute top-1/2 left-1/2 min-w-max transform -translate-x-1/2 -translate-y-1/2">
        <div class="absolute bg-gradient-radial-dark w-full h-full"></div>
        <img src="https://res.cloudinary.com/dylevfpbl/image/upload/v1685928443/landingpage/pattern-dark.png" alt="" >
      </div>
      <div class="relative max-w-7xl mx-auto">
        <div class="mb-12 md:max-w-4xl mx-auto text-center">
          <!-- <span class="inline-block mb-4 text-sm text-blue-500 font-bold uppercase tracking-widest">Blog</span> -->
          <h2 class="font-heading mb-6 text-4xl md:text-5xl lg:text-6xl text-white font-black tracking-tight">Guides To Anon Shop</h2>
          <p class="md:max-w-md mx-auto text-gray-400 font-bold">These guides will walk you through the platform and ensure you have a smooth experience.</p>
        </div>
        <div class="flex flex-wrap -m-4 mb-6">
          <div class="w-full md:w-1/3 p-4">
            <div class="h-full bg-gray-800 rounded-3xl">
              <img class="w-full rounded-3xl" src="https://res.cloudinary.com/dylevfpbl/image/upload/v1708381901/landingpage/dgoon21_a_monero_branded_vending_machine_8ab87c64-cd63-4a98-856d-1fee614448ad.png" alt="">
              <div class="p-8 text-center">
                <a class="group inline-block mb-4 text-center" href="/guides/general">
                  <h3 class="font-heading text-2xl text-white hover:text-blue-600 group-hover:underline font-black text-center">General Guide</h3>
                </a>
              </div>
            </div>
          </div>
          <div class="w-full md:w-1/3 p-4">
            <div class="h-full bg-gray-800 rounded-3xl">
              <img class="w-full rounded-3xl" src="https://res.cloudinary.com/dylevfpbl/image/upload/v1708380200/landingpage/0_2.webp" alt="">
              <div class="p-8 text-center">
                <a class="group inline-block mb-4" href="/guides/shopper">
                  <h3 class="font-heading text-2xl text-white hover:text-blue-600 group-hover:underline font-black">How To Shop</h3>
                </a>
              </div>
            </div>
          </div>
          <div class="w-full md:w-1/3 p-4">
            <div class="h-full bg-gray-800 rounded-3xl">
              <img class="w-full rounded-3xl" src="https://res.cloudinary.com/dylevfpbl/image/upload/v1708381343/landingpage/dgoon21_a_person_earning_money_bbbcf093-5dec-4859-b43e-235da31b6650.png" alt="">
              <div class="p-8 text-center">
                <a class="group inline-block mb-4" href="/guides/earner">
                  <h3 class="font-heading text-2xl text-white hover:text-blue-600 group-hover:underline font-black">How To Earn</h3>
                </a>
              </div>
            </div>
          </div>

        </div>
<!--         <div class="flex flex-wrap md:justify-center -m-2">
          <div class="w-full md:w-auto p-2"><a class="block w-full px-12 py-3.5 text-lg text-center text-gray-900 font-bold bg-gray-100 hover:bg-gray-200 focus:ring-4 focus:ring-gray-600 rounded-full" href="#">Read more News</a></div>
        </div> -->
      </div>
    </div>
  </div>
</section>
</template>

<style scoped>
.bg-gradient-radial-dark-light {
  background-image:radial-gradient(50% 50% at 50% 50%,rgba(31,41,55,0) 0,#1f2937 100%)
}
.bg-gradient-radial-dark {
  background-image:radial-gradient(50% 50% at 50% 50%,rgba(17,24,39,0) 0,#111827 100%)
}
</style>
