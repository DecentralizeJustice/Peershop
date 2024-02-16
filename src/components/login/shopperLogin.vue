<script setup>
import axios from 'axios';
import { ref, onMounted, toRef } from 'vue'
import { Dialog, DialogPanel, DialogTitle, TransitionChild, TransitionRoot } from '@headlessui/vue'
import { CheckIcon } from '@heroicons/vue/24/outline'
const open = ref(false)
const emit = defineEmits(['refresh'])
const message = ref('')
const customChatDiv = ref(null)
const customChatDiv1 = ref(null)
const props = defineProps({
  orderData: Object
})
const orderData = toRef(props, 'orderData')
function waitforme(millisec) {
    return new Promise(resolve => {
        setTimeout(() => { resolve('') }, millisec);
    })
}
async function initialSetup() {
  try {
    await waitforme(500)
    const div = customChatDiv.value
    const div1 = customChatDiv.value
    div.scrollTo({ top: 99999999999999999999999999999, behavior: "smooth" })
    div1.scrollTo({ top: 99999999999999999999999999999, behavior: "smooth" })
  } catch (error) {
    console.log(error)
  }
}
async function sendMessage() {
  await axios.post('/.netlify/functions/sendMessage',
  { 
    chatID: orderData.value.orders[0].chatID, 
    message: message.value,
    sender: 'shopper'
  })
  message.value = ''
  refresh()
}
async function refresh(){
  emit('refresh')
  await waitforme(500)
}
function localTime(epoch) {
  var timestamp = epoch;
  var date = new Date(timestamp);
  var hours = date.getHours();
  var minutes = date.getMinutes();
  var ampm = hours >= 12 ? 'pm' : 'am';
  var day =  date.getDate()
  var month = date.getMonth() + 1
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? '0'+minutes : minutes;
  var strTime = hours + ':' + minutes + ' ' + ampm + ' ' + day + '/' + month
  return strTime;
}
function getChatImage(sender) {
  if (sender !== 'dgoon') {
    return 'https://res.cloudinary.com/dylevfpbl/image/upload/v1686024666/landingpage/avatars/man_2.svg'
  }
  return 'https://res.cloudinary.com/dylevfpbl/image/upload/v1687402881/landingpage/avatars/african-man.svg'
}
onMounted(async() => {
  initialSetup()
})
</script>

<template>
<section class="bg-gray-800 overflow-hidden">
  <TransitionRoot as="template" :show="open">
    <Dialog as="div" class="relative z-10" @close="open = false">
      <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0" enter-to="opacity-100" leave="ease-in duration-200" leave-from="opacity-100" leave-to="opacity-0">
        <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
      </TransitionChild>

      <div class="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95" enter-to="opacity-100 translate-y-0 sm:scale-100" leave="ease-in duration-200" leave-from="opacity-100 translate-y-0 sm:scale-100" leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95">
            <DialogPanel class="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 w-3/4 md:w-1/2 sm:p-6 sm:my-8  break-words">
              <div>
                <ul class="text-xl">
                  <li>Order Link: {{ orderData.genOrderInfo.wishListLink }}</li>
                  <li>List Total: {{ orderData.genOrderInfo.listTotal }} USD</li>
                  <li>Discount: {{ orderData.genOrderInfo.discount }}%</li>
                  <li>Order Notes: {{ orderData.genOrderInfo.orderNotes }}</li>
                  <li>Your XMR Refund Address: {{ orderData.genOrderInfo.xmrRefundAddress }}</li>
                </ul>
              </div>
              <div class="mt-5 sm:mt-6">
                <button type="button" class="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600" @click="open = false">Close</button>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
  <div class="container mx-auto px-4">
    <div class="relative p-10 bg-gray-900 overflow-hidden rounded-3xl">
      
      <div class="absolute top-1/2 left-1/2 min-w-max transform -translate-x-1/2 -translate-y-1/2">
        <div class="absolute bg-gradient-radial-dark w-full h-full"></div><img src="https://res.cloudinary.com/dylevfpbl/image/upload/v1685928443/landingpage/pattern-dark.png" alt="">
      </div>
      <div class="relative z-10">
        <div class="flex flex-wrap items-center -m-8">

<div class="w-full  p-8 ">
  <div class="w-full  p-2">
          <button @click='open = true' class="block w-full px-4 py-2.5 text-sm text-center text-white font-bold bg-red-500 hover:bg-red-600  rounded-full">View Order Details</button>
        </div>
</div>
</div>

        <div class="flex flex-wrap items-center -m-8">

          <div class="w-full md:w-1/2 p-8 ">
            <div class="md:max-w-md mx-auto">
              <div class="max-w-sm rounded shadow-lg">
              <div class="px-6 py-4 bg-gray-800" >
                <div class="rounded-md font-bold text-2xl mb-2 text-center mb-5 bg-blue-500 text-white py-4">Everyone Chat</div>
                <div style="height: 40vh;" class="overflow-auto" ref="customChatDiv" >
                <div v-for="(message, index) in orderData.everyoneChat" :key="message.timestamp">
                  <div class="chat"
                  :class="{ 'chat-start':  message.sender === 'dgoon', 
                  'chat-end':  message.sender !== 'dgoon' }">
                    <div class="chat-image avatar">
                      <div class="w-10 rounded-full">
                        <img :src="getChatImage(message.sender)" />
                      </div>
                    </div>
                    <div class="chat-header text-white">
                      {{ message.sender }}
                    </div>
                    <div class="chat-bubble break-words">{{ message.message }} </div>
                    <div class="chat-footer text-white">
                      Sent at {{localTime(message.timestamp)}}
                    </div>
                  </div>
              </div>
                     
            </div>
            <textarea class="appearance-none px-2 md:px-6 my-5 py-5 w-full text-lg text-gray-500 font-bold bg-gray-900 placeholder-gray-500 outline-none focus:ring-4 focus:ring-blue-200 rounded-3xl" type="text" rows="4" placeholder="Enter your message"
            v-model="message"></textarea>
            <div class="flex flex-wrap my-1">
              <div class="w-full lg:w-1/2 p-2"><button @click="refresh" class="block w-full px-4 py-2.5 text-sm text-center text-white font-bold bg-blue-500 hover:bg-blue-600 rounded-full">Check For New Messages</button></div>
                <div class="w-full lg:w-1/2 p-2"><button @click='sendMessage' class="block w-full px-4 py-2.5 text-sm text-center text-white font-bold bg-green-500 hover:bg-green-600  rounded-full">Send Message</button></div>
              </div>
              </div>
            </div>
            </div>
          </div>

          <div class="w-full md:w-1/2 p-8 ">
            <div class="md:max-w-md mx-auto">
              <div class="max-w-sm rounded shadow-lg">
              <div class="px-6 py-4 bg-gray-800" >
                <div class="rounded-md font-bold text-2xl mb-2 text-center mb-5 bg-blue-500 text-white py-4">Admin and You Chat</div>
                <div style="height: 40vh;" class="overflow-auto" ref="customChatDiv1" >
                <div v-for="(message, index) in orderData.shopperChat" :key="message.timestamp">
                  <div class="chat"
                  :class="{ 'chat-start':  message.from === 'dgoon', 
                  'chat-end':  message.from !== 'dgoon' }">
                    <div class="chat-image avatar">
                      <div class="w-10 rounded-full">
                        <img :src="getChatImage(message.from)" />
                      </div>
                    </div>
                    <div class="chat-header text-white">
                      {{ message.from }}
                    </div>
                    <div class="chat-bubble break-words">{{ message.message }} </div>
                    <div class="chat-footer text-white">
                      Sent at {{localTime(message.sent)}}
                    </div>
                  </div>
              </div>
                     
            </div>
            <textarea class="appearance-none px-2 md:px-6 my-5 py-5 w-full text-lg text-gray-500 font-bold bg-gray-900 placeholder-gray-500 outline-none focus:ring-4 focus:ring-blue-200 rounded-3xl" type="text" rows="4" placeholder="Enter your message"
            v-model="message"></textarea>
            <div class="flex flex-wrap my-1">
              <div class="w-full lg:w-1/2 p-2"><button @click="refresh" class="block w-full px-4 py-2.5 text-sm text-center text-white font-bold bg-blue-500 hover:bg-blue-600 rounded-full">Check For New Messages</button></div>
                <div class="w-full lg:w-1/2 p-2"><button @click='sendMessage' class="block w-full px-4 py-2.5 text-sm text-center text-white font-bold bg-green-500 hover:bg-green-600  rounded-full">Send Message</button></div>
              </div>
              </div>
            </div>
            </div>
          </div>
          

<!--           <div class="w-full md:w-1/2 break-words">
              <div class="px-10 mx-auto">
                <div class="rounded shadow-lg">
                <div class=" bg-gray-800" >
                  <div class="font-bold mb-2 text-center mb-5 bg-blue-500 text-white py-4">
                    <div class="text-xl px-5">Order Info</div>
                  </div>
                  <div style="height: 60vh;" class="overflow-auto px-5" ref="customChatDiv2">
                  <div class="text-white text-left text-xl">
                    <p> Item List:</p>
                    <br/>
                    <li v-for="(thing, key) in orderData.orders[0].itemList">
                      {{ key + 1}}: <br/>
                      Link: {{ thing.link }}<br/>
                      Notes: {{ thing.description }}<br/>
                      Cost: {{ thing.cost }}<br/>
                      Quantity: {{ thing.quantity }}<br/>
                    </li>
                  </div>
                  <div class="text-white text-left text-xl" v-if="orderData.orders[0].addressInfo"
                  >
                    <br/>
                    <h2>Address Info:</h2>
            <p style="text-indent: 2em;">Name: {{ orderData.orders[0].addressInfo.fullname }}</p>
            <p style="text-indent: 2em;">Street: {{ orderData.orders[0].addressInfo.streetAddress }}</p>
            <p style="text-indent: 2em;">Apt/Suit: {{ orderData.orders[0].addressInfo.aptNumber }}</p>
            <p style="text-indent: 2em;">City: {{ orderData.orders[0].addressInfo.city }}</p>
            <p style="text-indent: 2em;">Zipcode: {{ orderData.orders[0].addressInfo.zipcode }}</p>
            <p style="text-indent: 2em;">Country: {{ orderData.orders[0].addressInfo.country }}</p>
                  </div>


                  <div class="text-white text-left text-xl"
                  >
                  <p v-if="orderData.orders[0].lockerName">
                    <br/>
                    Locker Name:<br/> {{ orderData.orders[0].lockerName }}</p>
                  </div>

                  <div class="text-white text-left text-xl"
                  >
                  <p v-if="orderData.orders[0].lockerZipcode">
                    <br/>
                    Locker Zipcode:<br/> {{ orderData.orders[0].lockerZipcode }}</p>
                  </div>
                  <div class="text-white text-left text-xl"
                  >
                  <p v-if="orderData.orders[0].country">
                    <br/>
                    Country:<br/> {{ orderData.orders[0].country }}</p>
                  </div>



                  <br/>
                  <div class="text-white text-left text-xl py-3">
                    <p> Notes:</p>
                    <p>{{orderData.orders[0].extraNotes}}</p>
                  </div>
                  <div class="text-white text-left text-xl py-3">
                    <p> Total (USD):</p>
                    <p>{{orderData.orders[0].totalUSD}}</p>
                  </div>
                  <div class="text-white text-left text-xl py-3">
                    <p> Tax (USD):</p>
                    <p>{{orderData.orders[0].taxAmountUSD}}</p>
                  </div>
                  <div class="text-white text-left text-xl py-3">
                    <p> Item Subtotal(USD):</p>
                    <p>{{orderData.orders[0].itemsSubtotal}}</p>
                  </div>
                  <div class="text-white text-left text-xl py-3">
                    <p> Total Order Fee(USD):</p>
                    <p>{{orderData.orders[0].orderFeeUSD}}</p>
                  </div>
                  <div class="text-white text-left text-xl py-3">
                    <p> Tip(USD):</p>
                    <p>{{orderData.orders[0].extraAmountUSD}}</p>
                  </div>
                  <div class="text-white text-left text-xl py-3">
                    <p> Refund Address:</p>
                    <p>{{orderData.orders[0].refundAddress}}</p>
                  </div>  
              </div>
                </div>
              </div>
              </div>
            </div> -->

        </div>
      </div>

    </div>
  </div>
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
