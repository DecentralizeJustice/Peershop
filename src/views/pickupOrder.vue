<script setup>
import { ref,  onMounted } from 'vue'
import { useRouter } from 'vue-router'
import intro from "@/components/pickupOrder/intro.vue"
import genInfo from "@/components/pickupOrder/genInfo.vue"
import passphrase from "@/components/pickupOrder/passphrase.vue"
const router = useRouter()
const step = ref(0)
const passphraseArray = ref([])
const moneroAddress= ref('')
const orderId = ref('')

function introNext() {
  step.value += 1
}
function lockerBack(moneroAddress6){
  moneroAddress.value = moneroAddress6
  step.value += -1
}
function lockerNext(moneroAddress6){
  moneroAddress.value = moneroAddress6
  step.value += 1
}
function passphraseBack(pass) {
  passphraseArray.value = pass
  step.value += -1
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


          <genInfo v-if='step === 1' :moneroAddress="moneroAddress"
          @next="lockerNext" @back="lockerBack" />



          <passphrase v-if='step === 2' @back="passphraseBack" :moneroAddress="moneroAddress"
          :passphraseArray="passphraseArray" :orderId="orderId"
          />
          
        </div>
      </div>
    </div>
  </div>
</section>
</template>

<style scoped>
</style>