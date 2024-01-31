<script setup>
import { ref, toRaw } from 'vue'
import intro from "@/components/placeLockerOrder/intro.vue"
import cartComp from "@/components/placeLockerOrder/cart.vue"
import lockerSelection from "@/components/placeLockerOrder/lockerSelection.vue"
import summary1 from "@/components/placeLockerOrder/summary.vue"
import passphrase from "@/components/placeLockerOrder/passphrase.vue"
const step = ref(0)
const cart = ref([])
const passphraseArray = ref([])
const lockerInfo = ref({
  lockerName: '',
  lockerZipcode: '',
  type: ''
})
const moneroAddress= ref('')
const orderNotes= ref('')
function introNext() {
  step.value += 1
}
function cartBack(cart1){
  cart.value = toRaw(cart1)
  step.value += -1
}
function cartNext(cart1){
  cart.value = toRaw(cart1)
  step.value += 1
}
function lockerBack(lockerInfo6, orderNotes6, moneroAddress6){
  lockerInfo.value = lockerInfo6
  orderNotes.value = orderNotes6
  moneroAddress.value = moneroAddress6
  step.value += -1
}
function lockerNext(){
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
          :cart="cart"/>

          <lockerSelection v-if='step === 2' :orderNotes="orderNotes" :moneroAddress="moneroAddress"
          @next="lockerNext" @back="lockerBack" :lockerInfo="lockerInfo"/>


          <summary1 v-if='step === 3' :cart="cart"
          @next="summaryNext" @back="summaryBack"
          @goTo="goTo"/>
          <passphrase v-if='step === 4' @back="passphraseBack" 
          :passphraseArray="passphraseArray" :wishListInfo="wishListInfo"
          />
          
        </div>
      </div>
    </div>
  </div>
</section>
</template>

<style scoped>
</style>