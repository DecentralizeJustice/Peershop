<script setup>
import axios from 'axios';
import { ref, onMounted, computed } from 'vue'
const allOrders = ref([])
const message = ref('')
const needApprovalIndex = ref(-1)
const approvalCounter = ref(0)
async function getAll() {
  try {
    const results = await axios.post('/.netlify/functions/adminGetAllOrders')
    allOrders.value = results.data
  } catch (error) {
    console.log(error)
  }
}
onMounted(() => {
  getAll()
})
const needApprovalOrders = computed(() => {
  const orders = []
  allOrders.value.forEach(element => {
    if(element.status[element.status.length - 1] === 'pending approval') {
      orders.push(element)
    }
  })
  return orders
})
function selectOrder(input){
  if(needApprovalIndex.value === input){
    needApprovalIndex.value = -1
    return
  }
  needApprovalIndex.value = input
}
async function approveOrder(orderId) {
  if(approvalCounter.value < 6){ approvalCounter.value +=1;console.log('only have:' + approvalCounter.value ); return;}
  await axios.post('/.netlify/functions/adminApproveOrder',
   { 
    orderId: orderId
  })
  approvalCounter.value = 0
  await refresh()
}
async function sendMessage(orderId) {
  await axios.post('/.netlify/functions/adminSendMessage',
   { 
    orderId: orderId, 
    message: message.value,
    chat: 'shopper'
  })
  message.value = ''
  await refresh()
}
async function refresh(){
  await getAll()
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
</script>

<template>
<section class="bg-gray-800 overflow-hidden">
  <div class="">
    <div class="relative md:pb-8 w-2/3 mx-auto bg-gray-900 overflow-hidden">
      <div class="relative"><img class="mb-8 mx-auto" src="" alt="">
        <div class="mx-auto">
          <div  class="mb-10 text-center">
            <h4 class="mb-4 text-4xl md:text-2xl text-white  tracking-tight">Orders That Need Approval</h4>
            <div class="">
              <div class="flex flex-wrap -m-5" v-for="(order, index) in needApprovalOrders" :key="order.orderId">
                <div class="w-full p-3 m-5" v-if="index !== needApprovalIndex">
                  <a class="block p-10 bg-gray-800 rounded-3xl text-left" @click="selectOrder(index)" >
                  <div class="flex flex-wrap -m-2">
                    <div class="flex-1 p-2">
                      <h3 class="font-heading text-xl text-white font-black">{{ order.orderId }}</h3>
                    </div>
                    <div class="w-auto p-2">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M17.9207 8.18018H11.6907H6.08072C5.12072 8.18018 4.64073 9.34018 5.32073 10.0202L10.5007 15.2002C11.3307 16.0302 12.6807 16.0302 13.5107 15.2002L15.4807 13.2302L18.6907 10.0202C19.3607 9.34018 18.8807 8.18018 17.9207 8.18018Z" fill="#374151"></path>
                      </svg>
                    </div>
                  </div>
                </a>
              </div>
                <div class="w-full p-3 my-3" v-if="index === needApprovalIndex">

                  <a class="block p-10 m-5 bg-gray-800 rounded-3xl text-left" >
                  <div class="flex flex-wrap -m-2">
                    <div class="flex-1 p-2 overflow-y-auto break-words">
                      <h3 class="font-heading mb-4 text-xl text-white"  @click="selectOrder(index)">{{order.orderId}}</h3>
                      <p class="text-white">
                        <span class="text-4xl">Meta Data:</span> 
<!--                           <li v-for="(data, dataKey) in order.allOrderInformation.orderInfo.metadata.info">
                            {{dataKey}}: {{ data }}
                            
                          </li> -->
                          <p class="my-5">Locker Info: <li v-for="(data, dataKey) in order.allOrderInformation.orderInfo.metadata.info.lockerInfo" 
                            :key="data.orderId">
                            {{dataKey}}: {{ data }}
                            
                          </li>{{  }}</p>
                          <p class="my-5">Order Notes: {{ order.allOrderInformation.orderInfo.metadata.info.orderNotes }}</p>
                          <p class="my-5">Earner Incintive: {{ order.allOrderInformation.orderInfo.metadata.info.earnerIncintive }}%</p>
                          <p class="my-5">Monero Return Address: {{ order.allOrderInformation.orderInfo.metadata.info.moneroAddress }}</p>
                          <p class="my-5">Cart: 
                            <li v-for="(data, index) in order.allOrderInformation.orderInfo.metadata.info.cart" class="my-5">
                            {{index + 1}}: 
                              <li v-for="(data1, index1) in data">
                                {{index1}}: {{ data1 }}
                                </li>
                            </li>
                          </p>
                          <p class="my-5">Constants: <br/>
                            <li class="my-2" v-for="(data, dataKey) in order.allOrderInformation.orderInfo.metadata.constants">
                            {{dataKey}}: {{ data }}
                            
                          </li></p>
                          
<!--                         <li v-for="(value, key) in order">
                          {{key}}: {{ value }}
                        </li> -->
                      </p>
                      <p class="text-white mt-5">
                          <span class="text-4xl">Payment Info:</span> 
                          <li v-for="(paymentData) in order.allOrderInformation.paymentInfo">
                            <li v-for="(paymentDataInfo, paymentDataKey) in paymentData">
                              {{paymentDataKey}}: {{ paymentDataInfo }}
                            </li>
                          </li>
                        
<!--                         <li v-for="(value, key) in order">
                          {{key}}: {{ value }}
                        </li> -->
                      </p>
                      <div class="mt-8">
                        <div class="flex flex-wrap items-center">
                          <div class="w-full py-4">
                            <div class="md:max-w-md mx-auto">
                              <div class="rounded shadow-lg">
                              <div class="px-6 py-4 bg-gray-900" >
                                <div class="rounded-md font-bold text-2xl mb-2 text-center mb-5 bg-blue-500 text-white py-4">Just Shopper Chat</div>
                                <div style="height: 40vh;" class="overflow-auto" ref="customChatDiv" >
                                <div v-for="(message, index) in order.shopperChat">
                                  <div class="chat"
                                  :class="{ 'chat-start':  message.sender === 'dgoon', 
                                  'chat-end':  message.sender !== 'dgoon' }">
                                    <div class="chat-image avatar">
                                      <div class="w-10 rounded-full">
                                        <!-- <img :src="getChatImage(message.sender)" /> -->
                                      </div>
                                    </div>
                                    <div class="chat-header text-white">
                                      {{ message.sender }}
                                    
                                    </div>
                                    <div class="chat-bubble break-words text-white">{{ message.message }} </div>
                                    <div class="chat-footer text-white">
                                      Sent at {{localTime(message.timestamp)}}
                                    </div>
                                  </div>
                              </div>
                                    
                            </div>
                            <textarea class="appearance-none px-2 md:px-6 my-5 py-5 w-full text-lg text-gray-500 font-bold bg-gray-900 placeholder-gray-500 outline-none focus:ring-4 focus:ring-blue-200 rounded-3xl" type="text" rows="4" placeholder="Enter your message"
                            v-model="message"></textarea>
                            <div class="flex flex-wrap my-1">
                              <div class="w-full lg:w-1/2 p-2"><button @click='refresh' class="block w-full px-4 py-2.5 text-sm text-center text-white font-bold bg-blue-500 hover:bg-blue-600 rounded-full">Check For New Messages</button></div>
                                <div class="w-full lg:w-1/2 p-2"><button @click='sendMessage(order.orderId)' class="block w-full px-4 py-2.5 text-sm text-center text-white font-bold bg-green-500 hover:bg-green-600  rounded-full">Send Message</button></div>
                              </div>
                              </div>
                            </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="flex flex-wrap my-1">
                          <div class="w-full lg:w-1/2 p-2"><button @click='approveOrder(order.orderId)' class="block w-full px-4 py-2.5 text-sm text-center text-white font-bold bg-green-500 hover:bg-green-600  rounded-full">Approve Order</button></div>
                      </div>
                    </div>
                    
                    <div class="w-full" @click="selectOrder(index)">
                      <svg width="24" height="50" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M6.07928 15.8198L12.3093 15.8198L17.9193 15.8198C18.8793 15.8198 19.3593 14.6598 18.6793 13.9798L13.4993 8.79983C12.6693 7.96983 11.3193 7.96983 10.4893 8.79983L8.51928 10.7698L5.30927 13.9798C4.63927 14.6598 5.11928 15.8198 6.07928 15.8198Z" fill="#374151"></path>
                      </svg>
                    </div>
                  </div>
                </a>
              </div>

              </div>
        </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
<section> 
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
