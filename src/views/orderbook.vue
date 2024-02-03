<script setup>
import { ref, onMounted } from 'vue'
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue'
import { EllipsisVerticalIcon } from '@heroicons/vue/20/solid'
import axios from 'axios';
const statuses = {
  Complete: 'text-green-700 bg-green-50 ring-green-600/20',
  'In progress': 'text-gray-600 bg-gray-50 ring-gray-500/10',
  Archived: 'text-yellow-800 bg-yellow-50 ring-yellow-600/20',
}
const people = [
{ name: 'Lindsay Walton', title: 'Front-end Developer', email: 'lindsay.walton@example.com', role: 'Member' },
]
const orders= ref([])
async function getOrders() {
  const results = await axios.get('/.netlify/functions/getOrderBook')
  orders.value = results.data
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
              <router-link type="button" class="block rounded-md bg-blue-500 px-3 py-2 text-center text-sm font-semibold text-white hover:bg-blue-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500" to="/placeorder">Place Locker Order</router-link>
            </div>
          </div>
          <div class="mt-8 flow-root">
            <div class="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div class="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                <table class="min-w-full divide-y divide-gray-700">
                  <thead>
                    <tr>
                      <th scope="col" class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-white sm:pl-0">~USD/XMR</th>
                      <th scope="col" class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-white sm:pl-0">~Cost To You(USD)</th>
                      <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-white">~XMR You Will Recieve</th>
                      <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-white">Type</th>
                    </tr>
                  </thead>
                  <tbody class="divide-y divide-gray-800">
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
