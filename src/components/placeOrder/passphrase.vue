<script setup>
import axios from 'axios';
import { ref, toRaw, onMounted } from 'vue'
import { getRandomInt, numberArrayToWordArray } from '@/assets/misc.js'
const emit = defineEmits(['back'])
const props = defineProps(['lockerInfo', 'orderNotes', 'moneroAddress', 'passphraseArray'])
const numberArray = ref([])
const wordArray = ref([])
// const buttonDisabled = ref(false)
async function getPassphrase() {
  if(props.passphraseArray.length === 0){
  const tempNumberArray = []
  for (let index = 0; index < 8; index++) {
    tempNumberArray.push(await getRandomInt(2048))
  }
  wordArray.value = numberArrayToWordArray(tempNumberArray)
  numberArray.value = tempNumberArray
  } else {
    wordArray.value = numberArrayToWordArray(props.passphraseArray)
    numberArray.value = props.passphraseArray
  }

}
const purchaseInfo = `This passphrase is how you will access your order,  
so protect it like a password. After you press continue, you will be taken to a payment portal. 
After your payment has 3 confirmations, you can use this passphrase to check on your order.`
/* async function goToBTCPay() {
  buttonDisabled.value = true
  const results = await axios.post('/.netlify/functions/submitOrder',
  {
    purchaseInfo: props.purchaseInfo,
    numberArray: toRaw(numberArray.value)
  })
  window.location.href = results.data.checkoutLink
} */
onMounted(() => {
  getPassphrase()
})
const what = `After you place your order, I will approve it before it goes into our orderbook.This approval process can take up
to 24 hours.`
const what1 = `After your order is approved and is in the orderbook, earners have the oppurtunity to select and complete your order. Your order will stay in the order book for a week before being canceled and returned to you, if no one picks it up. You can add funds to your order to encourage earners to select it.`
</script>

<template>
        <div class='flex flex-wrap items-center'> 
          <div class="w-full md:w-1/2 p-8 ">
            <div class="md:max-w-md mx-auto text-center">
              <span class="inline-block mb-6 text-lg text-blue-500 font-bold uppercase tracking-widest">What Happens Next?</span>
                    <p class="mb-8 mt-2 text-2xl text-left text-white">{{ what }}
                    </p>
                    <p class="mb-8 mt-2 text-2xl text-left text-white">{{ what1 }}
                    </p>
            </div>
          </div>
          <div class="w-full md:w-1/2 p-8">
            <div class="md:max-w-md mx-auto text-center">
              <span class="inline-block mb-6 text-3xl text-red-500 font-bold uppercase tracking-widest">Write Down Your Account Passphrase</span>
                    <ul class="text-left">
                    <li class="flex items-center mb-4" v-for="(item, index) in wordArray">
                      <p class="text-2xl text-gray-100 font-bold">{{ index + 1 }}. {{ item }}</p>
                      </li>
                    </ul>
                    <p class="text-xl text-gray-100 text-left mt-5">{{ purchaseInfo }}

                    </p>
            </div>
          </div>
        <div class="md:w-2/3 mx-auto">
          <div class="container py-10 px-10 flex flex-col items-center grid md:grid-cols-2 gap-12 ">
            <button  class="mx-auto block w-full px-4 py-2.5 text-lg text-center text-white font-bold bg-red-500 hover:bg-red-600  rounded-full" @click="emit('back', numberArray)">Back To Summary</button>
            <button  class=" mx-auto  block w-full px-4 py-2.5 text-lg text-center text-white font-bold bg-green-600  rounded-full" @click="">Continue to BTCPay Server</button>
          </div>
        </div>
      </div> 

</template>

<style scoped>
.bg-gradient-radial-dark-light {
  background-image:radial-gradient(50% 50% at 50% 50%,rgba(31,41,55,0) 0,#1f2937 100%)
}
.bg-gradient-radial-dark {
  background-image:radial-gradient(50% 50% at 50% 50%,rgba(17,24,39,0) 0,#111827 100%)
}
</style>