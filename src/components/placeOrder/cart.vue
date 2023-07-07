<script setup>
import { ref, computed } from 'vue'
import { Switch, SwitchGroup, SwitchLabel } from '@headlessui/vue'
import cartSVG from '@/assets/svg/cart.svg'
const emit = defineEmits(['next'])
const enabled0 = ref(false)
const enabled1 = ref(false)
const enabled2 = ref(false)
const enabled3 = ref(false)
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
              <span class="inline-block mb-6 text-lg text-blue-500 font-bold uppercase tracking-widest">Add Items to Cart</span>
              <form>
                  <div class="grid grid-cols-1 gap-y-8">
                    <div class="sm:col-span-4">
                      <label for="username" class="block text-xl font-medium text-white">Item Link</label>
                      <div class="mt-2">
                        <div class="flex rounded-md bg-white/5 ring-1 ring-inset ring-white/10 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-500">
                          <input type="text" class="flex-1 border-0 bg-transparent py-1.5 pl-1 text-white focus:ring-0 sm:text-sm sm:leading-6" />
                        </div>
                      </div>
                    </div>
                    <div class="sm:col-span-4">
                      <label for="username" class="block text-sm font-medium leading-6 text-white">Item Price</label>
                      <div class="mt-2">
                        <div class="flex rounded-md bg-white/5 ring-1 ring-inset ring-white/10 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-500">
                          <span class="flex select-none items-center pl-3 text-gray-500 sm:text-sm">workcation.com/</span>
                          <input type="text" name="username" id="username" autocomplete="username" class="flex-1 border-0 bg-transparent py-1.5 pl-1 text-white focus:ring-0 sm:text-sm sm:leading-6" placeholder="janesmith" />
                        </div>
                      </div>
                    </div>
                    <div class="sm:col-span-4">
                      <label for="username" class="block text-sm font-medium leading-6 text-white">Item Quantity</label>
                      <div class="mt-2">
                        <div class="flex rounded-md bg-white/5 ring-1 ring-inset ring-white/10 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-500">
                          <span class="flex select-none items-center pl-3 text-gray-500 sm:text-sm">workcation.com/</span>
                          <input type="text" name="username" id="username" autocomplete="username" class="flex-1 border-0 bg-transparent py-1.5 pl-1 text-white focus:ring-0 sm:text-sm sm:leading-6" placeholder="janesmith" />
                        </div>
                      </div>
                    </div>
                    <div class="col-span-full">
                      <label for="about" class="block text-sm font-medium leading-6 text-white">Item Notes</label>
                      <div class="mt-2">
                        <textarea id="about" name="about" rows="3" class="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6" />
                      </div>
                      <p class="mt-3 text-sm leading-6 text-gray-400"></p>
                    </div>
                  </div>
            </form>
            </div>
          </div>
          <div class="w-full md:w-1/2 p-10 text-center">
          <div class="flex flex-col justify-center py-3 h-full bg-gray-800 rounded-3xl">
            <div class="flex-initial justify-center">
              <h2 class="font-heading text-3xl text-white font-black tracking-tight">Your Cart Is Empty</h2>
              <div class="w-1/3 p-4 flex flex-col justify-center mx-auto"><img class="mx-auto" :src="cartSVG" alt=""></div>
            </div>
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