<script setup>
import { onMounted, watch, ref, computed } from 'vue'
import globalJson from '@/assets/globalInfo.json'
const emit = defineEmits(['back', 'goTo', 'next'])
const props = defineProps(['wishListInfo'])
function goTo(step){
  emit('goTo', step)
}
const orderEarnerInfoExpanded = ref(false)
const total = computed(() => {
  return  (Number(wishListInfo.listTotal)+Number(globalJson.budgetOrderServiceFeePercent*wishListInfo.listTotal*.01)+Number(globalJson.shopperBond)-Number(wishListInfo.discount*.01*wishListInfo.listTotal)).toFixed(2) 
})

onMounted(() => {
  
})
</script>

<template><div class="flex flex-wrap items-center p-1">
          <div class="w-full text-center text-3xl mt-6 text-blue-300 font-bold "><h1>Order Summary</h1></div>
          <div class="w-full md:w-1/2 p-10 text-center">
          <div class="flex flex-col justify-content:start h-full bg-gray-800 rounded-3xl max-h-[36rem] overflow-y-auto mt-6">
            <div class="px-4 md:px-8 py-5 text-white">
                  <div>
                  <p class="text-left text-lg my-2 mt-4 break-all">Wish List Link: <br/>{{ wishListInfo.wishListLink }}</p>
                  <p class="text-left text-lg my-2 break-all">Wish List Total: {{ wishListInfo.listTotal }} USD</p>
                  <p class="text-left text-lg my-2 break-all">Total Discount: {{ wishListInfo.discount }} USD</p>
                  <p class="text-left text-lg my-2 break-all mt-4">Order Notes:<br/> 
                    <span v-if="wishListInfo.orderNotes.length > 0">{{wishListInfo.orderNotes}}</span> 
                    <span v-if="wishListInfo.orderNotes.length < 1">None</span> 
                  </p>
                  <p class="text-left text-lg my-2 break-all mt-4">Monero Refund Address:<br/> {{wishListInfo.xmrRefundAddress}}</p>
                  <p class="text-left text-lg my-2 break-all">Total Due:  {{(Number(wishListInfo.listTotal)+Number(globalJson.budgetOrderServiceFeePercent*wishListInfo.listTotal*.01)+Number(globalJson.shopperBond)-Number(wishListInfo.discount*.01*wishListInfo.listTotal)).toFixed(2)}} USD</p>  
                </div>

            </div>
          </div>  
        </div>

          <div class="w-full md:w-1/2 p-10 text-center">
          <div class="flex flex-col justify-content:start h-full bg-gray-800 rounded-3xl max-h-[30rem] overflow-y-auto">
            <div class="md:max-w-md mx-auto text-center">
                    <p class="mb-8 mt-2 text-2xl text-left text-white">
                      Peer Shop allows people to spend/acquire Monero without using a centralized exchange. 
                      This requires you to be informed on how the system works. Some common questions can be found in our faq section. 
                      Once your ready, continue to get your passphrase and pay.
                    </p>

            </div>
          </div> 
        </div>
<!--         <div class="w-full px-2 justify-center mx-auto text-center">
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
                   stick with the default minimum%.
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
        </div>
      </div>
        </div>
        </div> -->

          <div class="md:w-2/3 mx-auto">
          <div class="container py-10 px-10 flex flex-col items-center grid md:grid-cols-2 gap-12 ">
            <button  class="mx-auto block w-full px-4 py-2.5 text-lg text-center text-white font-bold bg-red-500 hover:bg-red-600  rounded-full" @click="emit('back')">Back To Wish List Info</button>
            <button   class=" mx-auto  block w-full px-4 py-2.5 text-lg text-center text-white font-bold bg-green-600  rounded-full" @click="emit('next')">Continue</button>
          </div>
        </div>
      </div>
</template>

<style scoped>
</style>