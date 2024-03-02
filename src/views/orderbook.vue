<script setup>
import { ref, onMounted } from 'vue'
import { Dialog, DialogPanel, DialogTitle, TransitionChild, TransitionRoot } from '@headlessui/vue'
import { CheckIcon } from '@heroicons/vue/24/outline'
import axios from 'axios';
import { RouterLink } from 'vue-router';
const open = ref(false)
const chosenOrder = ref(38)
const orders= ref([])
async function getOrders() {
  const results = await axios.get('/.netlify/functions/getOrderBook')
  orders.value = results.data
}
async function setDialogContent(order) {
  chosenOrder.value = order
  open.value = true
  console.log(order)
}
onMounted(() => {
  getOrders()
})
</script>

<template>
<section class="py-10 bg-gray-800 overflow-hidden">
  <div class="container mx-auto px-4">
    <div class="relative py-16 px-8 bg-gray-900 overflow-hidden border border-gray-800 rounded-3xl">
<!--       <div class="absolute top-1/2 left-1/2 min-w-max transform -translate-x-1/2 -translate-y-1/2">
        <div class="absolute bg-gradient-radial-dark w-full h-full"></div><img src="https://res.cloudinary.com/dylevfpbl/image/upload/v1685928443/landingpage/pattern-dark.png" alt="">
      </div> -->
      <div class="relative mb-10 md:max-w-xl mx-auto text-center">
        <!-- <span class="inline-block mb-5 text-sm text-blue-500 font-bold uppercase tracking-widest">Frequently asked questions</span> -->
        <h2 class="font-heading mb-6 text-4xl md:text-5xl lg:text-6xl text-white font-black tracking-tight">Order Book</h2>
      </div>
      <ul role="list" class="divide-y divide-gray-100">
        <div class="bg-gray-900">
    <div class="mx-auto max-w-7xl">
      <div class="bg-gray-900 py-10">
        <div class="px-4 sm:px-6 lg:px-8">
          <div class="sm:flex sm:items-center">
            <div class="sm:flex-auto">
              <p class="mt-2 text-sm text-gray-300">A list of all the orders waiting to be fulfilled by earners.</p>
            </div>
            <div class="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
              <router-link type="button" class="block rounded-md bg-blue-500 px-3 py-2 text-center text-sm font-semibold text-white hover:bg-blue-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500" to="/placeorder">Place Order</router-link>
            </div>
          </div>
          
          <div v-if="orders.length===0" class="text-4xl text-white text-center my-5 font-medium">
            No Current Orders
          </div>
          <div class="mt-8 flow-root" v-if="orders.length>0">
            <div class="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div class="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8 md:hidden">
                <table class="min-w-full divide-y divide-gray-700">
                  <thead>
                    <tr>
                      <th scope="col" class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-white sm:pl-0">~USD/XMR</th>
                      <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-white">~XMR You Will Recieve</th>
                    </tr>
                  </thead>
                  <tbody class="divide-y divide-gray-800" >
                    <tr v-for="(order, index) in orders" :key="order.index">
                      <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-white sm:pl-0">{{ order.rate }}</td>
                      <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-300">{{ (Number(order.usd) / Number(order.rate)).toFixed(5) }}</td>
                      <td class="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                        <button class="text-blue-400 hover:text-blue-300" @click="setDialogContent(index)"
                          >More Info</button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <TransitionRoot as="template" :show="open">
                <Dialog as="div" class="relative z-10" @close="open = false">
                  <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0" enter-to="opacity-100" leave="ease-in duration-200" leave-from="opacity-100" leave-to="opacity-0">
                    <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                  </TransitionChild>

                  <div class="fixed inset-0 z-10 w-screen overflow-y-auto">
                    <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                      <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95" enter-to="opacity-100 translate-y-0 sm:scale-100" leave="ease-in duration-200" leave-from="opacity-100 translate-y-0 sm:scale-100" leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95">

                        <DialogPanel class="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-sm sm:p-6">
                          <div>
                            <div class="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                              <CheckIcon class="h-6 w-6 text-green-600" aria-hidden="true" />
                            </div>
                            <div class="mt-3 text-center sm:mt-5">
                              <DialogTitle as="h3" class="text-base font-semibold leading-6 text-gray-900">Order Info</DialogTitle>
                              <div class="mt-2 text-xl text-gray-500 text-left">
                                <p class="">~USD/XMR: {{ orders[chosenOrder].rate  }}</p>
                                <p class="">~Cost To You(USD): {{ orders[chosenOrder].usd}}</p>
                                <p class="">~XMR You Will Receive: {{ (Number(orders[chosenOrder].usd) / Number(orders[chosenOrder].rate)).toFixed(5)}}</p>
                                <p class="">Type: Gift Registry</p>
                              </div>
                            </div>
                          </div>
                          <div class="mt-5 sm:mt-6">
                            <routerLink  class="inline-flex w-full justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600" :to="`/pickuporder#${orders[chosenOrder].id}`">Pickup Order</routerLink>
                          </div>
                        </DialogPanel>
                      </TransitionChild>
                    </div>
                  </div>
                </Dialog>
              </TransitionRoot>


              <div class="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8 hidden md:block">
                <table class="min-w-full divide-y divide-gray-700">
                  <thead>
                    <tr>
                      <th scope="col" class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-white sm:pl-0">~USD/XMR</th>
                      <th scope="col" class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-white sm:pl-0">~Cost To You(USD)</th>
                      <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-white">~XMR You Will Recieve</th>
                      <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-white">Type</th>
                    </tr>
                  </thead>
                  <tbody class="divide-y divide-gray-800 " >
                    <tr v-for="order in orders" :key="order.index">
                      <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-white sm:pl-0">{{ order.rate }}</td>
                      <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-300">{{ order.usd }}</td>
                      <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-300">{{ (Number(order.usd) / Number(order.rate)).toFixed(5) }}</td>
                      <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-300">Gift Registry</td>
                      <td class="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                        <router-link class="text-blue-400 hover:text-blue-300" :to="`/pickuporder#${order.id}`"
                          >Select This Order</router-link>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  </div>

  </ul>
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
