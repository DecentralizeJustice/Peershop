<script setup>
import { ref, computed } from 'vue'
import { Switch, SwitchGroup, SwitchLabel } from '@headlessui/vue'
const emit = defineEmits(['next'])
const enabled0 = ref(false)
const enabled1 = ref(false)
const enabled2 = ref(false)
const requirements = [
{
    title: 'Disputes Process',
    text: `Disputes are rare, but they do require using our chrome extension tool to to handle them.`
  },
  {
    title: 'Be Kind',
    text: `This p2p system requires both parties to work together. If you have any questions or issues, shoot me a message in the admin chat.`
  },
  {
    title: 'Thank You',
    text: `Thank you for supporting the new and growing p2p economy.`
  }
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
  return true
})

</script>

<template>
          
          <div class="w-full md:w-1/2 p-8 ">
            <div class="md:max-w-md mx-auto text-center">
              <span class="inline-block mb-6 text-lg text-blue-500 font-bold uppercase tracking-widest">Earn Monero</span>
                    <p class="mb-8 mt-2 text-2xl text-left text-white">By using this service to earn Monero, you will be ordering Amazon Wishlist items for people. We require a bond from both parties, and we have a system to prevent fraud by both parties. You can read more about this system here: <router-link to="guides/shopper" class="text-blue-600">https://peershop.app/guides/earner</router-link>. Agree to the terms to the right and continue.
                    </p>
            </div>
          </div>
          <div class="w-full md:w-1/2 p-8">
            <div class="md:max-w-md mx-auto text-center items-center ">
                  <h3 class="font-heading text-4xl text-white font-black tracking-tight mb-10">Earner Requirements</h3>
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