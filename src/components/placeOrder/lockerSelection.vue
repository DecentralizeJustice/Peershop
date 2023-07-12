<script setup>
import { ref, computed, onMounted } from 'vue'
const emit = defineEmits(['next', 'back'])
function next(){
  emit('next', lockerInfo.value)
}
function back(){
  emit('back', lockerInfo.value)
}
const lockerName = ref('')
const type = ref('')
const lockerZipcode = ref('')
const allready = computed(() => {
  if(lockerName.value.length < 2){
    return false
  }
  if(lockerZipcode.value.length < 3){
    return false
  }
  if(type.value === ''){
    return false
  }
return true
})
const props = defineProps(['lockerInfo'])
onMounted(() => {
  lockerName.value = props.lockerInfo.lockerName
  type.value = props.lockerInfo.type
  lockerZipcode.value = props.lockerInfo.lockerZipcode
})
const lockerInfo = computed(() => {
  return {
    lockerName: lockerName.value,
    type: type.value,
    lockerZipcode: lockerZipcode.value
  }
})
</script>

<template>
          
          <div class="w-full md:w-1/2 p-8 ">
            <div class="md:max-w-md mx-auto text-center mb-6">
              <span class="inline-block mb-2 text-lg text-blue-500 font-bold uppercase tracking-widest">Locker Selection</span>
                    <p class="mb-1 mt-2 text-2xl text-left text-white">
                      You can have your order delivered to an Amazon Locker or Amazon Hub Counter+. You can find delivery locations here:<br/> 
                      <p class="text-blue-500"><a href="https://www.amazon.com/ulp" target="_blank" rel="noopener noreferrer"
                      class="text-blue-500  font-bold text-2xl dark:text-blue-500 hover:underline">Amazon Delivery Locations</a></p> 
                    </p>
            </div>
            <div class="md:max-w-md mx-auto text-center mt-12">
              <span class=" text-blue-300 inline-block mb-2 text-lg text-white font-bold uppercase tracking-widest">Locker Notes</span>
                    <p class="mb-1 mt-2 text-xl text-left text-white">
                      <span class="text-2xl font-semibold text-blue-500">Phone Usage:</span><br/> Some lockers require a phone to access. This is noted on the Amazon Delivery Location page. 
                    </p>
                    <p class="mb-1 mt-3 text-xl text-left text-white">
                      <span class="text-2xl font-semibold text-blue-500">Extra Fees:</span><br/> Some lockers might be full and/or require an extra delivery fee. You should be ok with traveling to another location, waiting, or  
                      paying extra.
                    </p>
            </div>
          </div>
          <div class="w-full md:w-1/2 p-8">
            <div class="md:max-w-md mx-auto text-center">
              <span class="inline-block mb-6 text-lg text-blue-500 font-bold uppercase tracking-widest">Delivery Location Info:</span>
                  <div class="grid md:grid-cols-8 gap-y-8 gap-x-10">

                    <div class="md:col-span-8">
                      <label for="pendingItemLink" class="block text-xl font-medium text-white">Location Name</label>
                      <div class="relative mt-2 rounded-md shadow-sm">
                        <div class="flex rounded-md bg-white/5 ring-1 ring-inset ring-white/10 focus-within:ring-2 focus-within:ring-inset focus-within:ring-blue-500">
                          <input maxlength="60" v-model="lockerName" type="text" class="flex-1 border-0 bg-transparent py-1.5 pl-1 text-white focus:ring-0 sm:text-sm sm:leading-6" />
                        </div>
                      </div>
                    </div>

                    <div class="md:col-span-8">
                      <label for="pendingItemLink" class="block text-xl font-medium text-white">Location Zipcode</label>
                      <div class="relative mt-2 rounded-md shadow-sm">
                        <div class="flex rounded-md bg-white/5 ring-1 ring-inset ring-white/10 focus-within:ring-2 focus-within:ring-inset focus-within:ring-blue-500">
                          <input maxlength="20"
                          v-model="lockerZipcode" type="text" class="flex-1 border-0 bg-transparent py-1.5 pl-1 text-white focus:ring-0 sm:text-sm sm:leading-6" />
                        </div>
                      </div>
                    </div>

                    <div class="md:col-span-8">
                    <fieldset>
                      <div class="space-y-5">
                        <div class="relative flex items-start">
                          <div class="flex h-6 items-center">
                            <input v-model='type' type="radio" value="Amazon Hub Counter+"
                            class="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-600" />
                          </div>
                          <div class="ml-3 text-lg leading-6">
                            <label for="candidates" class="font-medium text-white">Amazon Hub Counter+</label>
                          </div>
                        </div>
                        <div class="relative flex items-start">
                          <div class="flex h-6 items-center">
                            <input  type="radio" v-model='type' value="Amazon Locker"
                            class="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-600" />
                          </div>
                          <div class="ml-3 text-lg leading-6">
                            <label for="candidates" class="font-medium text-white">Amazon Locker</label>
                          </div>
                        </div>
                      </div>
                    </fieldset>

                    </div>

                  </div>
            </div>
          </div>
          <div class="md:w-2/3 mx-auto">
          <div class="container py-10 px-10 flex flex-col items-center grid md:grid-cols-2 gap-12 ">
            <button  class="mx-auto block w-full px-4 py-2.5 text-lg text-center text-white font-bold bg-red-500 hover:bg-red-600  rounded-full" @click="back()">Back To Cart</button>
            <button v-if="!allready" disabled class=" mx-auto  block w-full px-4 py-2.5 text-lg text-center text-white font-bold bg-slate-500  rounded-full">Order Summary</button>
            <button v-if="allready"  class=" mx-auto  block w-full px-4 py-2.5 text-lg text-center text-white font-bold bg-green-600  rounded-full" @click="next()">Order Summary</button>
          </div>
        </div>

</template>

<style scoped>
</style>