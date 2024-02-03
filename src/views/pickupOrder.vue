<script setup>
import { ref, toRaw, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import intro from "@/components/pickupOrder/intro.vue"
import cartComp from "@/components/pickupOrder/cart.vue"
import lockerSelection from "@/components/pickupOrder/lockerSelection.vue"
import summary1 from "@/components/pickupOrder/summary.vue"
import passphrase from "@/components/pickupOrder/passphrase.vue"
const router = useRouter()
const step = ref(0)
const cart = ref([])
const passphraseArray = ref([])
const moneroAddress= ref('')
const orderId = ref('')

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
function lockerBack(lockerInfo6, orderNotes6, moneroAddress6){
  lockerInfo.value = lockerInfo6
  orderNotes.value = orderNotes6
  moneroAddress.value = moneroAddress6
  step.value += -1
}
function lockerNext(lockerInfo6, orderNotes6, moneroAddress6){
  lockerInfo.value = lockerInfo6
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
onMounted(() => {
  const routeInfo = router.currentRoute.value
  const routeName = routeInfo.name
  const routeHash = routeInfo.hash
  if (routeName === 'pickuporder') {
    orderId.value = routeHash.substring(1)
  }
})
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


          <summary1 v-if='step === 3' :cart="cart" :orderNotes="orderNotes" :moneroAddress="moneroAddress" :lockerInfo="lockerInfo"
          @next="summaryNext" @back="summaryBack"
          @goTo="goTo" :tip="tip"/>



          <passphrase v-if='step === 4' @back="passphraseBack" :cart="cart" :orderNotes="orderNotes" :moneroAddress="moneroAddress" :lockerInfo="lockerInfo"
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