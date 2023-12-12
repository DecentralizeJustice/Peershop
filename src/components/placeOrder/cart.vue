<script setup>
import { ref, computed, onMounted } from 'vue'
import { ExclamationCircleIcon } from '@heroicons/vue/20/solid'
import globalJson from '@/assets/globalInfo.json'
const emit = defineEmits(['next', 'back'])
const props = defineProps(['wishListInfo'])
const wishListLink = ref('')
const listTotal = ref(0)
const listQuantity = ref(0)
const shippingCost = ref(0)
const tip = ref(0)
const xmrRefundAddress = ref(0)
const orderNotes = ref('')

const wishListInfo = ref({})

const linkError = ref(false)
const amountError = ref(false)
const quantityError = ref(false)

function next(){
  emit('next', cart.value)
}
function back(){
  emit('back', cart.value)
}
const allready = computed(() => {
  if(true){
    return true
  }
  return false
})
onMounted(() => {
  // cart.value = props.cart
})
</script>

<template>
          
          <div class="w-full md:w-1/2 p-8 ">
            <div class="md:max-w-md mx-auto text-center">
              <span class="inline-block mb-6 text-lg text-blue-500 font-bold uppercase tracking-widest">Wish List Info</span>
                  <div class="grid md:grid-cols-8 gap-y-8 gap-x-10">

                    <div class="md:col-span-8">
                      <label for="pendingItemLink" class="block text-xl font-medium text-white">Amazon Wish List Link</label>
                      <div class="relative mt-2 rounded-md shadow-sm">
                        <div class="flex rounded-md bg-white/5 ring-1 ring-inset ring-white/10 focus-within:ring-2 focus-within:ring-inset focus-within:ring-blue-500">
                          <input v-model="wishListLink" type="text" class="flex-1 border-0 bg-transparent py-1.5 pl-1 text-white focus:ring-0 sm:text-sm sm:leading-6" maxlength="500"/>
                        </div>
                        <div v-if="linkError" class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                          <ExclamationCircleIcon class="h-5 w-5 text-red-500" aria-hidden="true" />
                        </div>
                      </div>
                      <p class="mt-2 text-sm text-red-600" v-if="linkError">Not a valid link.</p>
                    </div>

                    <div class="md:col-span-3">
                      <label for="pendingItemLink" class="block text-xl font-medium text-white">Order Total</label>
                      <div class="relative mt-2 rounded-md shadow-sm">
                        <div class="flex rounded-md bg-white/5 ring-1 ring-inset ring-white/10 focus-within:ring-2 focus-within:ring-inset focus-within:ring-blue-500">
                          <input v-model="listTotal" type="number" class="flex-1 border-0 bg-transparent py-1.5 pl-1 text-white focus:ring-0 sm:text-sm sm:leading-6" />
                        </div>
                        <div v-if="amountError" class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                          <ExclamationCircleIcon class="h-5 w-5 text-red-500" aria-hidden="true" />
                        </div>
                        <div v-if="!amountError" class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                          <span class="text-gray-500 sm:text-sm" id="price-currency">USD</span>
                        </div>
                      </div>
                      <p class="mt-2 text-sm text-red-600" v-if="amountError">Not Valid Amount</p>
                    </div>
                    <div class="md:col-span-5">
                      <label for="pendingItemLink" class="block text-xl font-medium text-white">Total Quantity of Items</label>
                      <div class="relative mt-2 rounded-md shadow-sm">
                        <div class="flex rounded-md bg-white/5 ring-1 ring-inset ring-white/10 focus-within:ring-2 focus-within:ring-inset focus-within:ring-blue-500">
                          <input v-model="listQuantity" type="number" class="flex-1 border-0 bg-transparent py-1.5 pl-1 text-white focus:ring-0 sm:text-sm sm:leading-6" />
                        </div>
                      </div>
                      <p class="mt-2 text-sm text-red-600" v-if="quantityError">Not Valid Quantity</p>
                    </div>


                    <div class="md:col-span-4">
                      <label for="pendingItemLink" class="block text-xl font-medium text-white">Shipping Cost</label>
                      <div class="relative mt-2 rounded-md shadow-sm">
                        <div class="flex rounded-md bg-white/5 ring-1 ring-inset ring-white/10 focus-within:ring-2 focus-within:ring-inset focus-within:ring-blue-500">
                          <input v-model="shippingCost" type="number" class="flex-1 border-0 bg-transparent py-1.5 pl-1 text-white focus:ring-0 sm:text-sm sm:leading-6" />
                        </div>
                        <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                          <span class="text-gray-500 sm:text-sm" id="price-currecy">USD</span>
                        </div>
                      </div>
                      <p class="mt-2 text-sm text-red-600" v-if="quantityError">Not Valid Quantity</p>
                    </div>
                    <div class="md:col-span-4">
                      <label for="pendingItemLink" class="block text-xl font-medium text-white">Tip</label>
                      <div class="relative mt-2 rounded-md shadow-sm">
                        <div class="flex rounded-md bg-white/5 ring-1 ring-inset ring-white/10 focus-within:ring-2 focus-within:ring-inset focus-within:ring-blue-500">
                          <input v-model="tip" type="number" class="flex-1 border-0 bg-transparent py-1.5 pl-1 text-white focus:ring-0 sm:text-sm sm:leading-6" />
                        </div>
                        <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                          <span class="text-gray-500 sm:text-sm" id="price-currecytip">USD</span>
                        </div>
                      </div>
                      <p class="mt-2 text-sm text-red-600" v-if="quantityError">Not Valid Quantity</p>
                    </div>

                    <div class="col-span-full">
                      <label class="block text-xl font-medium leading-6 text-white">Your XMR Refund Address</label>
                      <div class="mt-2">
                        <textarea maxlength="150" v-model="xmrRefundAddress" rows="2" class="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6" />
                      </div>
                      <p class="mt-3 text-sm leading-6 text-gray-400"></p>
                    </div>
                    <div class="col-span-full">
                      <label class="block text-xl font-medium leading-6 text-white">Order Notes (optional)</label>
                      <div class="mt-2">
                        <textarea maxlength="150" v-model="wishListInfo " rows="2" class="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6" />
                      </div>
                      <p class="mt-3 text-sm leading-6 text-gray-400"></p>
                    </div>
                  </div>
            </div>
          </div>
        <div class="w-full md:w-1/2 justify-center mx-auto text-center">
          <div class="px-4 sm:px-0 text-white">
          <h3 class="text-2xl">Fees</h3>

          <div class="grid md:grid-cols-2 gap-4 md:w-4/6 mx-auto text-xl  text-center md:mt-0 mt-5">
            <div class="md:py-4">
              <div class="text-white">
                <p class=" mb-4"><span class="text-blue-300 font-bold">Amazon Total:</span><br/>~{{0}} USD</p>
                <p><span class="text-blue-300 font-bold">Buffer ({{globalJson.bufferPercentage}}%): <br/></span>
                  {{}} USD </p>
               </div>
            </div>
            <div class="md:py-4">
              <div class="text-white">
                <p class=" mb-4"><span class="text-blue-300 font-bold">Service Fee:</span><br/>{{globalJson.myServiceFeeBase}} USD</p>
                <p><span class="text-blue-300 font-bold">Tip:</span><br/>{{(Number(0)).toFixed(2)}} USD</p>
              </div>
            </div>
            </div>
          <div>
            <p class="text-blue-600 font-bold text-3xl mb-1 mt-6 md:mt-3">Total Due:</p>
            <p  class="text-2xl">{{(0).toFixed(2)}} USD</p></div>
        </div>

        </div>
          <div class="md:w-2/3 mx-auto">
          <div class="container py-10 px-10 flex flex-col items-center grid md:grid-cols-2 gap-12 ">
            <button  class="mx-auto block w-full px-4 py-2.5 text-lg text-center text-white font-bold bg-red-500 hover:bg-red-600  rounded-full" @click="back()">Back To Intro</button>
            <button v-if="!allready" disabled class=" mx-auto  block w-full px-4 py-2.5 text-lg text-center text-white font-bold bg-slate-500  rounded-full">Min. Order is {{ globalJson.minLockerOrder }} USD</button>
            <button v-if="allready"  class=" mx-auto  block w-full px-4 py-2.5 text-lg text-center text-white font-bold bg-green-600  rounded-full" @click="next()">Continue To Locker Info</button>
          </div>
        </div>

</template>

<style scoped>
</style>