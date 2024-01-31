<script setup>
import { ref, toRaw } from 'vue'
import intro from "@/components/placeAddressOrder/intro.vue"
import cartComp from "@/components/placeAddressOrder/cart.vue"
import addressInfoSelection from "@/components/placeAddressOrder/addressInfo.vue"
import summary1 from "@/components/placeAddressOrder/summary.vue"
import passphrase from "@/components/placeAddressOrder/passphrase.vue"
const step = ref(0)
const cart = ref([])
const passphraseArray = ref([])
const addressInfo = ref({
  name: '',
  zipcode: '',
  city: '',
  street: '',
  country: '',
  aptNumber: ''
})
const moneroAddress= ref('')
const orderNotes= ref('')
const tip = ref(0)
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
function addressBack(addressInfo6, orderNotes6, moneroAddress6){
  addressInfo.value = addressInfo6
  orderNotes.value = orderNotes6
  moneroAddress.value = moneroAddress6
  step.value += -1
}
function addressNext(addressInfo6, orderNotes6, moneroAddress6){
  addressInfo.value = addressInfo6
  orderNotes.value = orderNotes6
  moneroAddress.value = moneroAddress6
  step.value += 1
}
function summaryBack(tip2){
  tip.value = tip2
  step.value += -1
}
function summaryNext(tip2){
  tip.value = tip2
  step.value += 1
}
function passphraseBack(pass) {
  passphraseArray.value = pass
  step.value += -1
}
function goTo(step1, tip2) {
  tip.value = tip2
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

          <addressInfoSelection v-if='step === 2' :orderNotes="orderNotes" :moneroAddress="moneroAddress"
          @next="addressNext" @back="addressBack" :addressInfo="addressInfo"/>


          <summary1 v-if='step === 3' :cart="cart" :orderNotes="orderNotes" :moneroAddress="moneroAddress" :addressInfo="addressInfo"
          @goTo="goTo" :tip="tip"/>



          <passphrase v-if='step === 4' @back="passphraseBack" :cart="cart" :orderNotes="orderNotes" :moneroAddress="moneroAddress" :addressInfo="addressInfo"
          :passphraseArray="passphraseArray" :tip="tip"
          />
          
        </div>
      </div>
    </div>
  </div>
</section>
</template>

<style scoped>
</style>