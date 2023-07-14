<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import globalJson from '@/assets/globalInfo.json'
import box1 from '@/assets/svg/box1.svg'
import box2 from '@/assets/svg/box2.svg'
import box3 from '@/assets/svg/box3.svg'
import box4 from '@/assets/svg/box4.svg'
import box5 from '@/assets/svg/box5.svg'
const emit = defineEmits(['back', 'goTo', 'next'])
const props = defineProps(['cart', 'lockerInfo', 'orderNotes', 'earnerIncintive', 'defaultEarnerPercentage', 'moneroAddress'])
const lockerInfo = ref({})
const cart = ref([])
const orderEarnerInfoExpanded = ref(false)
const earnerPercentage = ref(props.defaultEarnerPercentage)
const orderNotes = ref('')
function goTo(step, earnerPercentage){
  emit('goTo', step, earnerPercentage)
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
  return itemSubtotal.value*Number(globalJson.estimatedTax)*Number(1/100)
})
const costAfterIncentive = computed(() => {
  if(earnerPercentage.value === ''){
    return Number.NaN
  }
  const subtotal = Number(orderTax.value) + Number(itemSubtotal.value)
  const discountAmount = Number(subtotal* (Number(earnerPercentage.value) * Number(1/100)))
  return subtotal + discountAmount
})
onMounted(() => {
  cart.value = props.cart
  lockerInfo.value = props.lockerInfo
  orderNotes.value = props.orderNotes
  earnerPercentage.value = props.earnerIncintive
})
watch(earnerPercentage, (percentage) => {
  if (percentage === '') {
    return
  }
  earnerPercentage.value = Number(parseInt(percentage).toFixed(0))
})
</script>

<template><div class="flex flex-wrap items-center p-1">
          <div class="w-full text-center text-3xl mt-6 text-blue-300 font-bold "><h1>Order Summary</h1></div>
          <div class="w-full md:w-1/2 p-10 text-center">
          <div class="flex flex-col justify-content:start h-full bg-gray-800 rounded-3xl max-h-[36rem] overflow-y-auto mt-6">
            <div class="px-4 md:px-8 py-5 text-white">
              <h2 class="inline-block text-2xl text-blue-500 font-bold uppercase tracking-widest">General Info 
                <button class="block w-full pb-1 mt-4 text-lg text-center text-white font-bold bg-red-500  rounded-full"
                    @click="goTo(2,earnerPercentage)">Edit General Info</button>
                  </h2> 
                  <div>
                  <p class="text-left text-lg my-2 mt-4 break-all">Locker Name: {{ lockerInfo.lockerName }}</p>
                  <p class="text-left text-lg my-2 break-all">Locker Zipcode: {{ lockerInfo.lockerZipcode }}</p>
                  <p class="text-left text-lg my-2 break-all">Locker Type: {{ lockerInfo.type }}</p>
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
                    @click="goTo(1, earnerPercentage)">Edit Cart</button>
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
          <div class="relative  mx-auto">
        <div class="flex flex-wrap mt-1">
          <div class="md:w-1/2 p-3 my-3 mx-auto" v-if="!orderEarnerInfoExpanded">
            <a class="block p-10 bg-gray-800 rounded-3xl text-left" @click="orderEarnerInfoExpanded = true" >
            <div class="flex flex-wrap -m-2">
              <div class="flex-1 p-2">
                <h3 class="font-heading text-xl text-white font-black">What is the Earner Incentive Percentage?</h3>
              </div>
              <div class="w-auto p-2">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M17.9207 8.18018H11.6907H6.08072C5.12072 8.18018 4.64073 9.34018 5.32073 10.0202L10.5007 15.2002C11.3307 16.0302 12.6807 16.0302 13.5107 15.2002L15.4807 13.2302L18.6907 10.0202C19.3607 9.34018 18.8807 8.18018 17.9207 8.18018Z" fill="#374151"></path>
                </svg>
              </div>
            </div>
          </a>
        </div>
        <div class="w-1/2 p-3 my-3" v-if="orderEarnerInfoExpanded">
            <a class="block p-10 bg-gray-800 rounded-3xl text-left" @click="orderEarnerInfoExpanded = false">
            <div class="flex flex-wrap -m-2">
              <div class="flex-1 p-2">
                <h3 class="font-heading mb-4 text-xl text-white font-black">What is the Earner Incentive Percentage?</h3>
                <p class="text-gray-400 font-bold text-lg">The earner is the person who pickups up and completes your order. 
                  The percentage that you pay them will affect the quality and speed of your order completion. 
                  You are free to place an order with a large discount but there is no guarantee that your order will be picked up by an earner. You will pay the
                  Non-Refundable Service Fee if you place an order, regardless of if your order is picked up or not. If you want your order completed reasonably,
                   stick with the default minimum {{  props.defaultEarnerPercentage }}%.
                </p>
              </div>
              <div class="w-auto p-2">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M6.07928 15.8198L12.3093 15.8198L17.9193 15.8198C18.8793 15.8198 19.3593 14.6598 18.6793 13.9798L13.4993 8.79983C12.6693 7.96983 11.3193 7.96983 10.4893 8.79983L8.51928 10.7698L5.30927 13.9798C4.63927 14.6598 5.11928 15.8198 6.07928 15.8198Z" fill="#374151"></path>
                </svg>
              </div>
            </div>
          </a>
        </div>
        <div class="md:w-1/2 p-3 my-3 mx-auto">
            <h3 class="text-2xl">Earner Incentive Percentage (%):</h3>
            <div class="w-1/2 md:w-1/4 mx-auto md:mt-3 mt-5">
              <div class="relative mt-2 rounded-md shadow-sm">
                <div class="flex rounded-md bg-white/5 ring-1 ring-inset ring-white/10 focus-within:ring-2 focus-within:ring-inset focus-within:ring-blue-500">
                  <input maxlength="20"
                  v-model="earnerPercentage" type="number" class="flex-1 border-0 bg-transparent py-1.5 pl-1 text-white focus:ring-0 sm:text-sm sm:leading-6" />
                </div>
              </div>
            </div>
        </div>
        </div>
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
                  <p class=" mt-4"><span class="text-blue-300 font-bold">Items Cost After Incentive:</span><br/>{{costAfterIncentive.toFixed(2)}} USD</p>
                  <p class=" mt-4"><span class="text-blue-300 font-bold">Earner Incentive:</span><br/>
                    <span v-if="earnerPercentage>0" class="text-green-500 font-bold">+{{(Number(earnerPercentage)*Number(1/100)*Number(Number(orderTax) + Number(itemSubtotal))).toFixed(2)}} USD</span>
                    <span v-if="earnerPercentage<=0" class="text-red-500 font-bold">{{(Number(earnerPercentage)*Number(1/100)*Number(Number(orderTax) + Number(itemSubtotal))).toFixed(2)}} USD</span>
                  </p>
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
            <p  class="text-2xl">~{{(Number(costAfterIncentive)+Number(globalJson.myServiceFeeBase)+ Number(globalJson.shopperBond)).toFixed(2)}} USD</p></div>
        </div>
        </div>
          <div class="md:w-2/3 mx-auto">
          <div class="container py-10 px-10 flex flex-col items-center grid md:grid-cols-2 gap-12 ">
            <button  class="mx-auto block w-full px-4 py-2.5 text-lg text-center text-white font-bold bg-red-500 hover:bg-red-600  rounded-full" @click="emit('back', earnerPercentage)">Back To Locker Info</button>
            <button v-if="itemSubtotal < Number(globalJson.minLockerOrder) ||  isNaN(costAfterIncentive)" disabled class=" mx-auto  block w-full px-4 py-2.5 text-lg text-center text-white font-bold bg-slate-500  rounded-full">Min. Order Subtotal is {{ globalJson.minLockerOrder }} USD</button>
            <button v-if="!(itemSubtotal < Number(globalJson.minLockerOrder)) && !isNaN(costAfterIncentive)"  class=" mx-auto  block w-full px-4 py-2.5 text-lg text-center text-white font-bold bg-green-600  rounded-full" @click="emit('next', earnerPercentage)">Continue</button>
          </div>
        </div>
      </div>
</template>

<style scoped>
</style>