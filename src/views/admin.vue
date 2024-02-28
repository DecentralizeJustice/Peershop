<script setup>
import { onMounted, ref } from "vue"
import axios from 'axios';
import { MinusSmallIcon, PlusSmallIcon } from '@heroicons/vue/24/outline'
import { Disclosure, DisclosureButton, DisclosurePanel, Dialog, DialogPanel, TransitionChild, TransitionRoot } from '@headlessui/vue'
const orders = ref({})
onMounted(async () => {
  const results = await axios.post('/.netlify/functions/adminGetAllOrders', {})
  orders.value = results.data
  await initialSetup()
})


const openDia = ref(false)
const message = ref('')
const message1 = ref('')
const message2 = ref('')


const customChatDiv = ref(null)
const customChatDiv1 = ref(null)
const customChatDiv2 = ref(null)

async function initialSetup() {
  try {
    // await waitforme(500)
    // const div = customChatDiv.value
    // const div1 = customChatDiv1.value
    // const div2 = customChatDiv2.value
    // div.scrollTo({ top: 99999999999999999999999999999, behavior: "smooth" })
    // div1.scrollTo({ top: 99999999999999999999999999999, behavior: "smooth" })
    // div2.scrollTo({ top: 99999999999999999999999999999, behavior: "smooth" })
  } catch (error) {
    console.log(error)
  }
}
async function sendMessage(to, note,orderId) {
  await axios.post('/.netlify/functions/sendAdminMessage',
  { 
    to: to, 
    message: note,
    sender: 'Admin DGoon',
    document: orderId
  })
  message.value = ''
  message1.value = ''
  message2.value = ''
  refresh()
}



async function refresh(){
  window.location.reload()
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
  if (sender === 'shopper') {
    return 'https://res.cloudinary.com/dylevfpbl/image/upload/v1686024666/landingpage/avatars/man_2.svg'
  }
  if (sender === 'earner') {
    return 'https://res.cloudinary.com/dylevfpbl/image/upload/v1686024733/landingpage/avatars/man_6.svg'
  }
  if (sender === 'Admin DGoon') {
    return 'https://res.cloudinary.com/dylevfpbl/image/upload/v1687402881/landingpage/avatars/african-man.svg'
  }
  return ''
}
</script>

<template>
<section class="py-10 bg-gray-800 overflow-hidden">
  <div class="">
    <div class="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8 lg:py-40">
      <div class="mx-auto max-w-4xl divide-y divide-gray-900/10">
        <h2 class="text-2xl font-bold leading-10 tracking-tight text-white">Orders</h2>
        <dl class="mt-10 space-y-6 divide-y divide-black-900/10">
          <Disclosure as="div" v-for="order in orders" :key="order.orderDetails.orderId" class="pt-6" v-slot="{ open }">
            <dt>
              <DisclosureButton class="flex w-full items-start justify-between text-left ">
                <span class="text-base font-semibold leading-7">{{ order.orderDetails.orderId }}{{  }}</span>
                <span class="ml-6 flex h-7 items-center">
                  <PlusSmallIcon v-if="!open" class="h-6 w-6" aria-hidden="true" />
                  <MinusSmallIcon v-else class="h-6 w-6" aria-hidden="true" />
                </span>
              </DisclosureButton>
            </dt>
            <DisclosurePanel as="dd" class="mt-2 pr-12">
              <section class="bg-gray-800 overflow-hidden">
            <TransitionRoot as="template" :show="openDia">
              <Dialog as="div" class="relative z-10" @close="openDia = false">
                <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0" enter-to="opacity-100" leave="ease-in duration-200" leave-from="opacity-100" leave-to="opacity-0">
                  <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                </TransitionChild>

                <div class="fixed inset-0 z-10 w-screen overflow-y-auto">
                  <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                    <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95" enter-to="opacity-100 translate-y-0 sm:scale-100" leave="ease-in duration-200" leave-from="opacity-100 translate-y-0 sm:scale-100" leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95">
                      <DialogPanel class="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 w-3/4 md:w-1/2 sm:p-6 sm:my-8  break-words">
                        <div>
                          <ul class="text-xl">
                            {{ order }}
                          </ul>
                        </div>
                        <div class="mt-5 sm:mt-6">
                          <button type="button" class="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600" @click="openDia = false">Close</button>
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
                    <button @click='openDia = true' class="block w-full px-4 py-2.5 text-sm text-center text-white font-bold bg-red-500 hover:bg-red-600  rounded-full">View Order Details</button>
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
                <div v-for="(message, index) in order.chats.everyoneChat" :key="message.timestamp">
                  <div class="chat"
                  :class="{ 'chat-start':  message.sender !== 'Admin DGoon', 
                  'chat-end':  message.sender === 'Admin DGoon' }">
                    <div class="chat-image avatar">
                      <div class="w-10 rounded-full">
                        <img :src="getChatImage(message.sender)" />
                      </div>
                    </div>
                    <div class="chat-header text-white">
                      {{ message.sender.charAt(0).toUpperCase() + message.sender.slice(1) }}
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
                <div class="w-full lg:w-1/2 p-2"><button @click='sendMessage("everyone", message,order._id)' class="block w-full px-4 py-2.5 text-sm text-center text-white font-bold bg-green-500 hover:bg-green-600  rounded-full">Send Message</button></div>
              </div>
              </div>
            </div>
            </div>
          </div>

          <div class="w-full md:w-1/2 p-8 ">
            <div class="md:max-w-md mx-auto">
              <div class="max-w-sm rounded shadow-lg">
              <div class="px-6 py-4 bg-gray-800" >
                <div class="rounded-md font-bold text-2xl mb-2 text-center mb-5 bg-red-500 text-white py-4">Earner Chat</div>
                <div style="height: 40vh;" class="overflow-auto" ref="customChatDiv1" >
                <div v-for="(message, index) in order.chats.earnerChat" :key="message.timestamp">
                  <div class="chat"
                  :class="{ 'chat-start':  message.sender !== 'Admin DGoon', 
                  'chat-end':  message.sender === 'Admin DGoon' }">
                    <div class="chat-image avatar">
                      <div class="w-10 rounded-full">
                        <img :src="getChatImage(message.sender)" />
                      </div>
                    </div>
                    <div class="chat-header text-white">
                      {{ message.sender.charAt(0).toUpperCase() + message.sender.slice(1) }}
                    </div>
                    <div class="chat-bubble break-words">{{ message.message }} </div>
                    <div class="chat-footer text-white">
                      Sent at {{localTime(message.timestamp)}}
                    </div>
                  </div>
              </div>
                     
            </div>
            <textarea class="appearance-none px-2 md:px-6 my-5 py-5 w-full text-lg text-gray-500 font-bold bg-gray-900 placeholder-gray-500 outline-none focus:ring-4 focus:ring-blue-200 rounded-3xl" type="text" rows="4" placeholder="Enter your message"
            v-model="message1"></textarea>
            <div class="flex flex-wrap my-1">
              <div class="w-full lg:w-1/2 p-2"><button @click="refresh" class="block w-full px-4 py-2.5 text-sm text-center text-white font-bold bg-blue-500 hover:bg-blue-600 rounded-full">Check For New Messages</button></div>
                <div class="w-full lg:w-1/2 p-2"><button @click='sendMessage("earner", message1,order._id)' class="block w-full px-4 py-2.5 text-sm text-center text-white font-bold bg-green-500 hover:bg-green-600  rounded-full">Send Message</button></div>
              </div>
              </div>
            </div>
            </div>
          </div>
          <div class="w-full md:w-1/2 p-8 ">
            <div class="md:max-w-md mx-auto">
              <div class="max-w-sm rounded shadow-lg">
              <div class="px-6 py-4 bg-gray-800" >
                <div class="rounded-md font-bold text-2xl mb-2 text-center mb-5 bg-red-500 text-white py-4">Shopper Chat</div>
                <div style="height: 40vh;" class="overflow-auto" ref="customChatDiv2" >
                <div v-for="(message, index) in order.chats.shopperChat" :key="message.timestamp">
                  <div class="chat"
                  :class="{ 'chat-start':  message.sender !== 'Admin DGoon', 
                  'chat-end':  message.sender === 'Admin DGoon' }">
                    <div class="chat-image avatar">
                      <div class="w-10 rounded-full">
                        <img :src="getChatImage(message.sender)" />
                      </div>
                    </div>
                    <div class="chat-header text-white">
                      {{ message.sender.charAt(0).toUpperCase() + message.sender.slice(1) }}
                    </div>
                    <div class="chat-bubble break-words">{{ message.message }} </div>
                    <div class="chat-footer text-white">
                      Sent at {{localTime(message.timestamp)}}
                    </div>
                  </div>
              </div>
                     
            </div>
            <textarea class="appearance-none px-2 md:px-6 my-5 py-5 w-full text-lg text-gray-500 font-bold bg-gray-900 placeholder-gray-500 outline-none focus:ring-4 focus:ring-blue-200 rounded-3xl" type="text" rows="4" placeholder="Enter your message"
            v-model="message2"></textarea>
            <div class="flex flex-wrap my-1">
              <div class="w-full lg:w-1/2 p-2"><button @click="refresh" class="block w-full px-4 py-2.5 text-sm text-center text-white font-bold bg-blue-500 hover:bg-blue-600 rounded-full">Check For New Messages</button></div>
                <div class="w-full lg:w-1/2 p-2"><button @click='sendMessage("shopper", message2,order._id)' class="block w-full px-4 py-2.5 text-sm text-center text-white font-bold bg-green-500 hover:bg-green-600  rounded-full">Send Message</button></div>
              </div>
              </div>
            </div>
            </div>
          </div>

        </div>
      </div>

    </div>
  </div>
</section>
            </DisclosurePanel>
          </Disclosure>
        </dl>
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
