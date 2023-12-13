<script setup>
import { ref, toRaw } from 'vue'
import intro from "@/components/placeOrder/intro.vue"
import cartComp from "@/components/placeOrder/cart.vue"
import summary1 from "@/components/placeOrder/summary.vue"
import lockerSelection from "@/components/placeOrder/lockerSelection.vue"
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
function lockerBack(info, notes1, moneroAddress1){
  moneroAddress.value = moneroAddress1
  orderNotes.value = notes1
  lockerInfo.value = info
  step.value += -1
}
function lockerNext(info, notes1, moneroAddress1){
  moneroAddress.value = moneroAddress1
  orderNotes.value = notes1
  lockerInfo.value = info
  step.value += 1
}
function summaryBack(earnerIncintive1){
  earnerIncintive.value = earnerIncintive1
  step.value += -1
}
function summaryNext(earnerIncintive1){
  earnerIncintive.value = earnerIncintive1
  step.value += 1
}
function passphraseBack(pass) {
  passphraseArray.value = pass
  step.value += -1
}
const lockerInfo = ref({
  lockerName: '',
  type: '',
  lockerZipcode: ''
})
function goTo(step1, earnerIncintive1) {
  earnerIncintive.value = earnerIncintive1
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
          <cartComp v-if='step === 1' @next="cartNext" @back="cartBack" :wishListInfo="wishListInfo"/>
          <lockerSelection v-if='step === 2' :orderNotes="orderNotes"
          @next="lockerNext" @back="lockerBack" :lockerInfo="lockerInfo"
          :moneroAddress="moneroAddress"/>
          <summary1 v-if='step === 3'  :cart="cart" :lockerInfo="lockerInfo"
          :orderNotes="orderNotes" @next="summaryNext" @back="summaryBack" :moneroAddress="moneroAddress"
          :earnerIncintive ='earnerIncintive' :defaultEarnerPercentage='defaultEarnerPercentage'
          @goTo="goTo"/>
          <passphrase v-if='step === 4' @back="passphraseBack" 
          :passphraseArray="passphraseArray"
          :orderNotes="orderNotes" :moneroAddress="moneroAddress"
          :cart="cart" :lockerInfo="lockerInfo"
          :earnerIncintive ='earnerIncintive'
          />
          
        </div>
      </div>
    </div>
  </div>
</section>
</template>

<style scoped>
</style>