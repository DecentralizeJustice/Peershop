<script setup>
import axios from 'axios';
import { ref, onMounted, computed, watch } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()
const componentKey = ref(0)
import words from '@/assets/bip39Wordlist.txt?raw'
import shopperPendingApproval from '@/components/customerAdmin/shopperPendingApproval.vue'

const passphraseWords = ref(["", "", "", "", "", "", "", ""])
const wrongWord = ref(999)
const orderData = ref({})
const orderDoesNotExist = ref(false)
function getPassphraseInputLabels(i) {
  var j = i % 10,
        k = i % 100;
    if (j == 1 && k != 11) {
        return i + "st";
    }
    if (j == 2 && k != 12) {
        return i + "nd";
    }
    if (j == 3 && k != 13) {
        return i + "rd";
    }
    return i + "th";
}
async function signIn() {
  try {
    const numberArray = []
    for (let index = 0; index < 8; index++) {
      const element = passphraseWords.value[index]
      const number = wordToNumber(element)
      if (number === false) {
        wrongWord.value = index
        console.log((index + 1) + ' is not a correct word')
        return
      }
      numberArray.push(number)
    }
    const results = await axios.post('/.netlify/functions/login', { accountPhrase: numberArray })
    console.log(results)
    if (results.data === null) {
      orderDoesNotExist.value = true
      throw new Error('Order does not exist')
    }
    const results1 = await axios.post('/.netlify/functions/getMessageArray', { chatID: results.data.orders[0].chatID })
    orderData.value = results.data
    orderData.value.passphrase = numberArray
    orderData.value.messageArray = results1.data.messageArray
    componentKey.value += .000000000000001
  } catch (error) {
    orderDoesNotExist.value = true
    console.log(error)
  }
}
function wordToNumber(word) {
  const wordArray = words.split(/\r?\n/)
  const tempWord = word.toLowerCase().replace(/\s+/g, '')
  for (let index = 0; index < wordArray.length; index++) {
    const element = wordArray[index]
    if (element === tempWord) {
      return index
    }
  }
 return false
}
const allEntered = computed(() => {
  return !passphraseWords.value.includes('')
})
onMounted(() => {
  const routeInfo = router.currentRoute.value
  const routeName = routeInfo.name
  const routeHash = routeInfo.hash
  if (routeName === 'login') {
    const rawFrag = routeHash.substring(1)
    const fragWordArray = rawFrag.split(',')
    if (fragWordArray.length === 8) {
      passphraseWords.value = fragWordArray
    }
  }
})
watch(
  () => passphraseWords,
  (newValue, oldValue) => {
    wrongWord.value = 999
  },
  { deep: true }
)
</script>

<template>
<section class="bg-gray-800 overflow-hidden" v-if="Object.keys(orderData).length === 0">
  <div class="container mx-auto px-4">
    <div class="relative md:pb-8 md:max-w-3xl mx-auto bg-gray-900 overflow-hidden rounded-3xl">
      <div class="absolute top-1/2 left-1/2 min-w-max transform -translate-x-1/2 -translate-y-1/2">
        <div class="absolute bg-gradient-radial-dark w-full h-full"></div><img src="https://res.cloudinary.com/dylevfpbl/image/upload/v1685928443/landingpage/pattern-dark.png" alt="">
      </div>
      <div class="relative"><img class="mb-8 mx-auto" src="" alt="">
        <div class="md:max-w-md mx-auto">
          <div v-if="!orderDoesNotExist" class="mb-10 text-center">
            <h2 class="font-heading mb-4 text-4xl md:text-5xl text-white font-black tracking-tight">Welcome</h2>
            <p class="text-gray-400 font-bold">Please enter your 8 word passphrase below:</p>
          </div>
          <div v-if="orderDoesNotExist" class="mb-10 text-center" >
              <h2  class="font-heading mb-4 text-4xl md:text-4xl text-red-500 font-black">Your Order Does Not Exist. Check your
              passphrase or message me <a class='text-blue-500' href="/messageMe">here!</a> Transactions take 3 blocks to confirm.</h2>
            </div>
            <div class="flex flex-wrap -m-3 mb-5">
              <div class="w-full p-3 mx-6 md:mx-0 flex flex-col items-left" v-for="index in 8" :key="index">
                <div v-if="index === wrongWord + 1" class="text-red-500 text-center text-lg font-bold">{{index}} is Not a Valid Word!</div>
                <label class="block mb-2 text-sm text-gray-400 font-bold" for="signInDarkReversePatternInput3-1">{{ index }}.</label>
                <input class="appearance-none px-6 py-3.5 md:w-full text-lg text-gray-500 font-bold bg-gray-800 placeholder-gray-500 outline-none border border-gray-700 focus:ring-4 focus:ring-blue-200 rounded-full" v-model="passphraseWords[index-1]" :placeholder='getPassphraseInputLabels(index) + " Word"'>
              </div>
              <div class="w-full p-3 mt-2">
                <div class="flex flex-wrap md:justify-end -m-2">
                  <div class="w-full md:p-2 p-5">
                    <button v-if='!allEntered' class="w-full block px-8 py-3.5 text-lg text-center text-white font-bold bg-slate-700 rounded-full" @click="">Sign In</button>
                    <button v-if="allEntered" class="w-full block px-8 py-3.5 text-lg text-center text-white font-bold bg-blue-500 hover:bg-blue-600  rounded-full" @click="signIn()">Sign In</button>
                  </div>
                </div>
              </div>
              <div class="w-full p-3">
                <p class="text-gray-600 text-center font-bold"><span>Don’t have a login? </span><br/><a class="text-blue-500 hover:text-blue-600 font-bold" href="/">Place an Order</a></p>
              </div>
            </div>
        </div>
      </div>
    </div>
  </div>
</section>
<section> 
  <shopperPendingApproval :orderData="orderData" v-if="Object.keys(orderData).length > 0"
    @refresh="signIn" :key="componentKey"/>
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
