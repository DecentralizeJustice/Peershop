<script setup>
import { ref, computed, onMounted } from 'vue'
import globalJson from '@/assets/globalInfo.json'
import box1 from '@/assets/svg/box1.svg'
import box2 from '@/assets/svg/box2.svg'
import box3 from '@/assets/svg/box3.svg'
import box4 from '@/assets/svg/box4.svg'
import box5 from '@/assets/svg/box5.svg'
const emit = defineEmits(['back', 'goTo'])
const props = defineProps(['cart', 'lockerInfo'])

const lockerInfo = ref({})
const cart = ref([])

function goTo(step){
  emit('goTo', step)
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
const allready = computed(() => {
  return false
})

const itemSubtotal = computed(() => {
  let subtotal = Number(0)
  cart.value.forEach(element => {
    subtotal += (element.quantity * element.price)
  });
  return subtotal
})
const orderTax = computed(() => {
  return itemSubtotal.value*Number(globalJson.estimatedTax)*Number(1/100)
})
onMounted(() => {
  cart.value = props.cart
  lockerInfo.value = props.lockerInfo
})
</script>

<template>
          <div class="w-full text-center text-3xl mt-6 text-blue-300 font-bold"><h1>Order Summary</h1></div>
          <div class="w-full md:w-1/2 p-10 text-center">
          <div class="flex flex-col justify-content:start h-full bg-gray-800 rounded-3xl max-h-[36rem] overflow-y-auto mt-6">
            <div class="px-4 md:px-8 py-5 text-white">
              <h2 class="inline-block text-2xl text-blue-500 font-bold uppercase tracking-widest">Locker Info 
                <button class="block w-full pb-1 mt-4 text-lg text-center text-white font-bold bg-red-500  rounded-full"
                    @click="goTo(2)">Edit Locker Info</button>
                  </h2> 
                  <div>
                  <p class="text-left text-lg my-2 mt-4 break-all">Locker Name: {{ lockerInfo.lockerName }}</p>
                  <p class="text-left text-lg my-2 break-all">Locker Zipcode: {{ lockerInfo.lockerZipcode }}</p>
                  <p class="text-left text-lg my-2 break-all">Locker Type: {{ lockerInfo.type }}</p>
                  </div>

            </div>
          </div>  
        </div>

          <div class="w-full md:w-1/2 p-10 text-center">
          <div class="flex flex-col justify-content:start h-full bg-gray-800 rounded-3xl max-h-[30rem] overflow-y-auto">
            <div class="px-4 md:px-8 py-5 text-white">
              <h2 class="inline-block text-2xl text-blue-500 font-bold uppercase tracking-widest">Your Cart 
                <button class="block w-full pb-1 mt-4 text-lg text-center text-white font-bold bg-red-500  rounded-full"
                    @click="goTo(1)">Edit Cart</button>
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
        <div class="w-full px-2 justify-center mx-auto text-center">
          <div class="px-4 sm:px-0 text-white">
          <h3 class="text-2xl">Estimated Fees</h3>

          <div class="grid md:grid-cols-2 gap-4 md:w-4/6 mx-auto text-xl  text-center md:mt-0 mt-5">
            <div class="md:py-4">
              <div class="text-white">
                <p class=" mb-4"><span class="text-blue-300 font-bold">Item Subtotal:</span><br/>{{itemSubtotal.toFixed(2)}} USD</p>
                <p><span class="text-blue-300 font-bold">Estimated {{globalJson.estimatedTax}}% Tax: <br/></span>
                  {{orderTax.toFixed(2)}} USD </p>
               </div>
            </div>
            <div class="md:py-4">
              <div class="text-white">
                <p class=" mb-4"><span class="text-blue-300 font-bold">Non-Refundable Service Fee:</span><br/>{{globalJson.myServiceFeeBase}} USD</p>
                <p><span class="text-blue-300 font-bold">Refundable Shopper Bond:</span><br/>{{(Number(globalJson.shopperBond)).toFixed(2)}} USD</p>
              </div>
            </div>
            </div>
          <div>
            <p class="text-blue-600 font-bold text-3xl mb-1 mt-6 md:mt-3">Order Total:</p>
            <p  class="text-2xl">{{(itemSubtotal+orderTax+Number(globalJson.myServiceFeeBase)+ Number(globalJson.shopperBond)).toFixed(2)}} USD</p></div>
        </div>

        </div>
          <div class="md:w-2/3 mx-auto">
          <div class="container py-10 px-10 flex flex-col items-center grid md:grid-cols-2 gap-12 ">
            <button  class="mx-auto block w-full px-4 py-2.5 text-lg text-center text-white font-bold bg-red-500 hover:bg-red-600  rounded-full" @click="goTo(2)">Back To Locker Info</button>
            <button v-if="!allready" disabled class=" mx-auto  block w-full px-4 py-2.5 text-lg text-center text-white font-bold bg-slate-500  rounded-full">Min. Order is {{ globalJson.minLockerOrder }} USD</button>
            <button v-if="allready"  class=" mx-auto  block w-full px-4 py-2.5 text-lg text-center text-white font-bold bg-green-600  rounded-full" @click="next()">Continue To Payment</button>
          </div>
        </div>

</template>

<style scoped>
</style>