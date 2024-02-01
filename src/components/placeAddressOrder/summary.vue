<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import globalJson from '@/assets/globalInfo.json'
import box1 from '@/assets/svg/box1.svg'
import box2 from '@/assets/svg/box2.svg'
import box3 from '@/assets/svg/box3.svg'
import box4 from '@/assets/svg/box4.svg'
import box5 from '@/assets/svg/box5.svg'
const emit = defineEmits(['back', 'goTo', 'next'])
const props = defineProps(['cart', 'addressInfo', 'orderNotes', 'moneroAddress', 'tip'])
const addressInfo = ref({})
const cart = ref([])
const orderNotes = ref('')
const tip = ref(0)
function goTo(step){
  emit('goTo', step, tip.value)
}
function getbox(index) {
  const boxlist = [
    box1,
    box2,
    box3,
    box4,
    box5
  ]
  return boxlist[(index) % boxlist.length]
}

const itemSubtotal = computed(() => {
  let subtotal = Number(0)
  cart.value.forEach(element => {
    subtotal += (element.quantity * element.price)
  });
  return subtotal
})
const orderTax = computed(() => {
  return itemSubtotal.value*Number(globalJson.estimatedTax)*.01
})
onMounted(() => {
  cart.value = props.cart
  addressInfo.value = props.addressInfo
  orderNotes.value = props.orderNotes
  tip.value = props.tip
})
const serviceFee = computed(() => {
  const minfee = Number(globalJson.addressMinFee)
  const percentFee = Number(itemSubtotal.value)*Number(globalJson.addressPercentage)*.01
  if(minfee > percentFee){ 
    return minfee
  }
  else{
    return percentFee
  }
})
watch(tip, async () => {
  if (tip.value < 0) {
    tip.value = 0
  }
})
</script>

<template><div class="flex flex-wrap items-center p-1">
          <div class="w-full text-center text-3xl mt-6 text-blue-300 font-bold "><h1>Order Summary</h1></div>
          <div class="w-full md:w-1/2 p-10 text-center">
          <div class="flex flex-col justify-content:start h-full bg-gray-800 rounded-3xl max-h-[36rem] overflow-y-auto mt-6">
            <div class="px-4 md:px-8 py-5 text-white">
              <h2 class="inline-block text-2xl text-blue-500 font-bold uppercase tracking-widest">General Info 
                <button class="block w-full pb-1 mt-4 text-lg text-center text-white font-bold bg-red-500  rounded-full"
                    @click="goTo(2,tip)">Edit General Info</button>
                  </h2> 
                  <div>
                  <p class="text-left text-lg my-2 mt-4 break-all">Name: {{ addressInfo.name }}</p>
                  <p class="text-left text-lg my-2 mt-4 break-all">Street: {{ addressInfo.street }}</p>
                  <p class="text-left text-lg my-2 mt-4 break-all">Apt or Suite #: {{ addressInfo.aptNumber }}</p>
                  <p class="text-left text-lg my-2 mt-4 break-all">City: {{ addressInfo.city }}</p>
                  <p class="text-left text-lg my-2 mt-4 break-all">Zipcode: {{ addressInfo.zipcode }}</p>
                  <p class="text-left text-lg my-2 mt-4 break-all">Country: {{ addressInfo.country }}</p>
                  <p class="text-left text-lg my-2 break-all mt-4">Monero Refund Address:<br/> {{moneroAddress}}</p>
                  <p class="text-left text-lg my-2 break-all mt-4">Order Notes:<br/> 
                    <span v-if="orderNotes.length > 0">{{orderNotes}}</span> 
                    <span v-if="orderNotes.length < 1">None</span> </p>
                  </div>

            </div>
          </div>  
        </div>

          <div class="w-full md:w-1/2 p-10 text-center">
          <div class="flex flex-col justify-content:start h-full bg-gray-800 rounded-3xl max-h-[30rem] overflow-y-auto">
            <div class="px-4 md:px-8 py-5 text-white">
              <h2 class="inline-block text-2xl text-blue-500 font-bold uppercase tracking-widest">Your Cart 
                <button class="block w-full pb-1 mt-4 text-lg text-center text-white font-bold bg-red-500  rounded-full"
                    @click="goTo(1, tip)">Edit Cart</button>
                  </h2>                    
              
              <ul role="list" class="divide-y divide-gray-100">
                <li v-for="(item ,index) in cart" :key="item.itemLink" class="flex gap-x-4 py-5">
                  <img class="h-12 w-12 flex-none" :src="getbox(index)" alt="" />
                  <div class="flex-auto md:space-y-2 space-y-4">
                    <div class="flex items-baseline justify-between gap-x-4">
                      <p class="text-sm font-semibold leading-6 text-white">Item# {{ index + 1 }}</p>
                      <p class="text-md text-white" v-if="item.quantity < 2">
                        Item Price:  <br/>{{ item.price }} USD
                      </p>
                      <p class="text-md text-white" v-if="item.quantity > 1">
                        Items Total: <br/>{{ Number(item.price*item.quantity).toFixed(2) }} USD
                      </p>
                    </div>
                    <p class="mt-1 line-clamp-2 text-md leading-6 text-white text-left">Quantity: {{ item.quantity }}</p>
                    <p class="mt-1 text-md leading-6 text-white text-left" v-if="item.quantity > 1">
                        Item Price: {{ item.price }} USD
                      </p>
                    <p class="mt-1 line-clamp-2 text-md leading-6 text-white text-left text-blue-500"><a :href="item.itemLink" target="_blank" rel="noopener noreferrer"
                      class="text-blue-500 dark:text-blue-500 hover:underline">Product Link:</a></p>
                      <p  class="mt-1 line-clamp-2 text-md leading-6 text-white text-left break-all">{{ item.itemLink }}</p>
                    <p v-if='item.notes.length > 0' class="mt-1  text-md leading-6 text-white text-left break-all">Item Notes: <br/>{{ item.notes }}</p>
                  </div>
                </li>
              </ul>
            </div>
          </div> 
        </div>



        <div class="w-full px-2 pt-6 justify-center mx-auto text-center">
          <div class="px-4 sm:px-0 text-white">
          <h3 class="text-2xl">Estimated Fees</h3>

          <div class="grid md:grid-cols-2 gap-4 md:w-4/6 mx-auto text-xl  text-center md:mt-0 mt-5">
            <div class="md:py-4">
              <div class="text-white">
                <p><span class="text-blue-300 font-bold">Item Subtotal + Estimated {{Number(globalJson.estimatedTax)}}% Tax: <br/></span>
                  {{(Number(orderTax) + Number(itemSubtotal)).toFixed(2)}} USD </p>
               </div>
            </div>
            <div class="md:py-4">
              <div class="text-white">
                <p class=" mb-4"><span class="text-blue-300 font-bold">Non-Refundable Service Fee:</span><br/>{{(serviceFee).toFixed(2)}} USD</p>
              </div>
            </div>
            <div class="">
                      <label for="pendingItemLink" class="block text-xl font-medium text-white">Tip (USD)</label>
                      <div class="relative mt-2 rounded-md shadow-sm">
                        <div class="flex rounded-md bg-white/5 ring-1 ring-inset ring-white/10 focus-within:ring-2 focus-within:ring-inset focus-within:ring-blue-500">
                          <input v-model="tip" type="number" min="0" class="flex-1 border-0 bg-transparent py-1.5 pl-1 text-white focus:ring-0 sm:text-sm sm:leading-6" />
                        </div>
                      </div>
                    </div>
            </div>

          <div>
            <p class="text-blue-600 font-bold text-3xl mb-1 mt-6 md:mt-3">Order Total:</p>
            <p  class="text-2xl">~{{(Number(orderTax)+Number(itemSubtotal)+Number(serviceFee)+Number(tip)).toFixed(2)}} USD</p></div>
        </div>
        </div>
          <div class="md:w-2/3 mx-auto">
          <div class="container py-10 px-10 flex flex-col items-center grid md:grid-cols-2 gap-12 ">
            <button  class="mx-auto block w-full px-4 py-2.5 text-lg text-center text-white font-bold bg-red-500 hover:bg-red-600  rounded-full" @click="goTo(2,tip)">Back To Address Info</button>
            <button   class=" mx-auto  block w-full px-4 py-2.5 text-lg text-center text-white font-bold bg-green-600  rounded-full" @click="goTo(4,tip)">Continue</button>
          </div>
        </div>
      </div>
</template>

<style scoped>
</style>