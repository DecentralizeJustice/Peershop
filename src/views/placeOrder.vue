<script setup>
import { ref, toRaw } from 'vue'
import intro from "@/components/placeOrder/intro.vue"
import cartComp from "@/components/placeOrder/cart.vue"
import summary1 from "@/components/placeOrder/summary.vue"
import passphrase from "@/components/placeOrder/passphrase.vue"
const step = ref(0)
const wishListInfo = ref({})
function introNext() {
  step.value += 1
}
function cartBack(cart1){
  wishListInfo.value = toRaw(cart1)
  step.value += -1
}
function cartNext(cart1){
  wishListInfo.value = toRaw(cart1)
  step.value += 1
}
function summaryBack(){
  step.value += -1
}
function summaryNext(){
  step.value += 1
}
function passphraseBack(pass) {
  passphraseArray.value = pass
  step.value += -1
}
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
          <cartComp v-if='step === 1' @next="cartNext" @back="cartBack" 
          :wishListInfo="wishListInfo"/>
          <summary1 v-if='step === 2' :wishListInfo="wishListInfo"
          @next="summaryNext" @back="summaryBack"
          @goTo="goTo"/>
          <passphrase v-if='step === 3' @back="passphraseBack" 
          :passphraseArray="passphraseArray"
          />
          
        </div>
      </div>
    </div>
  </div>
</section>
</template>

<style scoped>
</style>