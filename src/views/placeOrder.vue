<script setup>
import { ref } from 'vue'
import intro from "@/components/placeOrder/intro.vue"
import cartComp from "@/components/placeOrder/cart.vue"
import summary1 from "@/components/placeOrder/summary.vue"
import lockerSelection from "@/components/placeOrder/lockerSelection.vue"
function introNext() {
  step.value += 1
}
function cartBack(cart1){
  cart.value = cart1
  step.value += -1
}
function cartNext(cart1){
  cart.value = cart1
  step.value += 1
}
function lockerBack(info){
  lockerInfo.value = info
  step.value += -1
}
function lockerNext(info){
  lockerInfo.value = info
  step.value += 1
}
const step = ref(0)
const cart = ref([])
const lockerInfo = ref({
  lockerName: '',
  type: '',
  lockerZipcode: ''
})
function goTo(step1) {
  step.value = step1
}
</script>

<template>
<section class="py-10 bg-gray-800 overflow-hidden">
  <div class="container mx-auto px-4">
    <div class="relative p-10 bg-gray-900 overflow-hidden rounded-3xl">
      <div class="relative z-10">
        <div class="flex flex-wrap items-center -m-8">
          
          <intro v-if='step === 0' @next="introNext"/>
          <cartComp v-if='step === 1' @next="cartNext" @back="cartBack" :cart="cart"/>
          <lockerSelection v-if='step === 2' @next="lockerNext" @back="lockerBack" :lockerInfo="lockerInfo"/>
          <summary1 v-if='step === 3' @back="step += -1" :cart="cart" :lockerInfo="lockerInfo" 
          @goTo="goTo"/>
          
        </div>
      </div>
    </div>
  </div>
</section>
</template>

<style scoped>
</style>