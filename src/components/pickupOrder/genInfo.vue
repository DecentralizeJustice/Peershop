<script setup>
import { ref, computed, onMounted } from 'vue'
import globalJson from '@/assets/globalInfo.json'
const props = defineProps(['moneroAddress'])
const emit = defineEmits(['next', 'back'])
function next(){
  emit('next', moneroAddress.value)
}
function back(){
  emit('back', moneroAddress.value)
}
const moneroAddress = ref('')
const allready = computed(() => {
  if(moneroAddress.value.length < 80){
    return false
  }
return true
})
onMounted(() => {
  moneroAddress.value = props.moneroAddress
})
</script>

<template>
          
          <div class="w-full md:w-1/2 p-8 ">
            <div class="md:max-w-md mx-auto text-center mb-6">
              <span class="inline-block mb-2 text-lg text-blue-500 font-bold uppercase tracking-widest">Your XMR Refund Address</span>
                    <p class="mb-1 mt-2 text-2xl text-left text-white">
                      Please Enter Your XMR Refund Address. This is where your {{globalJson.earnerBond}} USD bond and your funds will be sent.<br/>  
                    </p>
            </div>
          </div>
          <div class="w-full md:w-1/2 p-8">
            <div class="md:max-w-md mx-auto text-center">
                  <div class="grid md:grid-cols-8 gap-y-8 gap-x-10">
                    <div class="md:col-span-8">
                      <label class="block text-xl font-medium leading-6 text-white">Your Monero Refund Address</label>
                      <div class="mt-2">
                        <textarea maxlength="250" v-model="moneroAddress" rows="5" class="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-blue-500 sm:text-sm sm:leading-6" />
                      </div>
                    </div>

                  </div>
            </div>
          </div>
          <div class="md:w-2/3 mx-auto">
          <div class="container py-10 px-10 flex flex-col items-center grid md:grid-cols-2 gap-12 ">
            <button  class="mx-auto block w-full px-4 py-2.5 text-lg text-center text-white font-bold bg-red-500 hover:bg-red-600  rounded-full" @click="back()">Back To Introduction</button>
            <button v-if="!allready" disabled class=" mx-auto  block w-full px-4 py-2.5 text-lg text-center text-white font-bold bg-slate-500  rounded-full">Continue</button>
            <button v-if="allready"  class=" mx-auto  block w-full px-4 py-2.5 text-lg text-center text-white font-bold bg-green-600  rounded-full" @click="next()">Continue</button>
          </div>
        </div>

</template>

<style scoped>
</style>