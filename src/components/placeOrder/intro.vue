<script setup>
import { ref, computed } from 'vue'
import { Switch, SwitchGroup, SwitchLabel } from '@headlessui/vue'
const emit = defineEmits(['next'])
const enabled0 = ref(false)
const enabled1 = ref(false)
const enabled2 = ref(false)
const enabled3 = ref(false)
const requirements = [
{
    title: 'Check Order Regularly',
    text: `Your required to check on your order every day.`
  },
  {
    title: 'Ships from Amazon',
    text: `All of your items must ship Directly from Amazon`
  },
  {
    title: 'Good Supply',
    text: `Your Items should be in good stock. Good stock is generally 2+ in stock.`
  },
  {
    title: 'Open To the Public',
    text: `None of your items can be prime member only items.`
  },
]
function next(){
  emit('next')
}
const allready = computed(() => {
  if(!enabled0.value){
    return false
  }
  if(!enabled1.value){
    return false
  }
  if(!enabled2.value){
    return false
  }
  if(!enabled3.value){
    return false
  }
  return true
})

</script>

<template>
          
          <div class="w-full md:w-1/2 p-8 ">
            <div class="md:max-w-md mx-auto text-center">
              <span class="inline-block mb-6 text-lg text-blue-500 font-bold uppercase tracking-widest">Anon Shop Intro</span>
                    <p class="mb-8 mt-2 text-2xl text-left text-white">Anon shop is a peer-to-peer marketplace that 
                      allows you to shop on Amazon anonymously.
                      You place an order to an Amazon locker (or hub counter) near you. Another person from the Monero Community then arranges your item(s) to be delivered to the locker.
                      Once you pick your items up and are satisfied, the funds are released to the correct party.
                    </p>
                    <p class="mb-8 mt-2 text-2xl text-left text-white">
                      Our platform has a novel design, but is very secure. Please read more about how we work and click the toggle boxes next to the order requirements. 
                      After that you can continue to place a order.
                    </p>
            </div>
          </div>
          <div class="w-full md:w-1/2 p-8">
            <div class="md:max-w-md mx-auto text-center items-center ">
                  <h3 class="font-heading text-4xl text-white font-black tracking-tight mb-10">Order Requirements</h3>
                  <SwitchGroup as="div" class="flex items-center justify-stretch mt-5">
                    <Switch v-model="enabled0" :class="[enabled0 ? 'bg-blue-500' : 'bg-gray-200', 'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2']">
                      <span aria-hidden="true" :class="[enabled0 ? 'translate-x-5' : 'translate-x-0', 'pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out']" />
                    </Switch>
                    <SwitchLabel as="span" class="ml-3 text-sm" style="">
                      <h4 class="font-medium  text-3xl text-blue-500">{{ requirements[0].title }}</h4>
                      <p class="text-white text-xl mt-4 text-left">{{ requirements[0].text }}</p>
                    </SwitchLabel>
                  </SwitchGroup>
                  <SwitchGroup as="div" class="flex items-center justify-stretch mt-5">
                    <Switch v-model="enabled1" :class="[enabled1 ? 'bg-blue-500' : 'bg-gray-200', 'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2']">
                      <span aria-hidden="true" :class="[enabled1 ? 'translate-x-5' : 'translate-x-0', 'pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out']" />
                    </Switch>
                    <SwitchLabel as="span" class="ml-3 text-sm" style="">
                      <h4 class="font-medium  text-3xl text-blue-500">{{ requirements[1].title }}</h4>
                      <p class="text-white text-xl mt-4 text-left">{{ requirements[1].text }}</p>
                    </SwitchLabel>
                  </SwitchGroup>
                  <SwitchGroup as="div" class="flex items-center justify-stretch mt-5">
                    <Switch v-model="enabled2" :class="[enabled2 ? 'bg-blue-500' : 'bg-gray-200', 'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2']">
                      <span aria-hidden="true" :class="[enabled2 ? 'translate-x-5' : 'translate-x-0', 'pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out']" />
                    </Switch>
                    <SwitchLabel as="span" class="ml-3 text-sm" style="">
                      <h4 class="font-medium  text-3xl text-blue-500">{{ requirements[2].title }}</h4>
                      <p class="text-white text-xl mt-4 text-left">{{ requirements[2].text }}</p>
                    </SwitchLabel>
                  </SwitchGroup>
                  <SwitchGroup as="div" class="flex items-center justify-stretch mt-5">
                    <Switch v-model="enabled3" :class="[enabled3 ? 'bg-blue-500' : 'bg-gray-200', 'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2']">
                      <span aria-hidden="true" :class="[enabled3 ? 'translate-x-5' : 'translate-x-0', 'pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out']" />
                    </Switch>
                    <SwitchLabel as="span" class="ml-3 text-sm" style="">
                      <h4 class="font-medium  text-3xl text-blue-500">{{ requirements[3].title }}</h4>
                      <p class="text-white text-xl mt-4 text-left">{{ requirements[3].text }}</p>
                    </SwitchLabel>
                  </SwitchGroup>
              </div>
          </div>
          <div class="w-full p-2 justify center">
          <div class="container py-10 px-10 mx-0 min-w-full flex flex-col items-center">
            <button v-if="!allready" disabled class=" md:w-1/4  block w-full px-4 py-2.5 text-lg text-center text-white font-bold bg-slate-500  rounded-full">Continue</button>
            <button v-if="allready"  class=" md:w-1/4  block w-full px-4 py-2.5 text-lg text-center text-white font-bold bg-blue-500 hover:bg-blue-600  rounded-full" @click="next()">Continue</button>
          </div>
        </div>

</template>

<style scoped>
.bg-gradient-radial-dark-light {
  background-image:radial-gradient(50% 50% at 50% 50%,rgba(31,41,55,0) 0,#1f2937 100%)
}
.bg-gradient-radial-dark {
  background-image:radial-gradient(50% 50% at 50% 50%,rgba(17,24,39,0) 0,#111827 100%)
}
</style>