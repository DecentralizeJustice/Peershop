<script setup>
import { ref, computed, onMounted } from 'vue'
const props = defineProps(['addressInfo', 'orderNotes', 'moneroAddress'])
const emit = defineEmits(['next', 'back'])
function next(){
  emit('next', addressInfo.value, orderNotes.value, moneroAddress.value)
}
function back(){
  emit('back', addressInfo.value, orderNotes.value, moneroAddress.value)
}
const name= ref('')
const street = ref('')
const aptNumber = ref('')
const city = ref('')
const zipcode = ref('')
const country = ref('')
const orderNotes = ref('')
const moneroAddress = ref('')
const allready = computed(() => {
/*   if(lockerName.value.length < 0){
    return false
  }
  if(lockerZipcode.value.length < 3){
    return false
  } */
  if(moneroAddress.value.length < 80){
    return false
  }
return true
})
onMounted(() => {
  name.value = props.addressInfo.name
  street.value = props.addressInfo.street
  aptNumber.value = props.addressInfo.aptNumber
  city.value = props.addressInfo.city
  zipcode.value = props.addressInfo.zipcode
  country.value = props.addressInfo.country
  orderNotes.value = props.orderNotes
  moneroAddress.value = props.moneroAddress
})
const addressInfo = computed(() => {
  return {
    name: name.value,
    street: street.value,
    aptNumber: aptNumber.value,
    city: city.value,
    zipcode: zipcode.value,
    country: country.value
  }
})
</script>

<template>
          
          <div class="w-full md:w-1/2 p-8 ">
            <div class="md:max-w-md mx-auto text-center mb-6">
              <span class="inline-block mb-2 text-lg text-blue-500 font-bold uppercase tracking-widest">Address Info</span>
                    <p class="mb-1 mt-2 text-2xl text-left text-white">
                      You can have your order delivered to any address.<br/> 
                    </p>
            </div>
          </div>
          <div class="w-full md:w-1/2 p-8">
            <div class="md:max-w-md mx-auto text-center">
              <span class="inline-block mb-6 text-lg text-blue-500 font-bold uppercase tracking-widest">Delivery Location Info:</span>
                  <div class="grid md:grid-cols-8 gap-y-8 gap-x-10">

                    <div class="md:col-span-8">
                      <label for="pendingItemLink" class="block text-xl font-medium text-white">Name</label>
                      <div class="relative mt-2 rounded-md shadow-sm">
                        <div class="flex rounded-md bg-white/5 ring-1 ring-inset ring-white/10 focus-within:ring-2 focus-within:ring-inset focus-within:ring-blue-500">
                          <input maxlength="60" v-model="name" type="text" class="flex-1 border-0 bg-transparent py-1.5 pl-1 text-white focus:ring-0 sm:text-sm sm:leading-6" />
                        </div>
                      </div>
                    </div>
                    <div class="md:col-span-8">
                      <label for="pendingItemLink" class="block text-xl font-medium text-white">Street Address or P.O. Box</label>
                      <div class="relative mt-2 rounded-md shadow-sm">
                        <div class="flex rounded-md bg-white/5 ring-1 ring-inset ring-white/10 focus-within:ring-2 focus-within:ring-inset focus-within:ring-blue-500">
                          <input maxlength="60" v-model="street" type="text" class="flex-1 border-0 bg-transparent py-1.5 pl-1 text-white focus:ring-0 sm:text-sm sm:leading-6" />
                        </div>
                      </div>
                    </div>
                    <div class="md:col-span-8">
                      <label for="pendingItemLink" class="block text-xl font-medium text-white">Apt, suite, unit, building, floor, etc.</label>
                      <div class="relative mt-2 rounded-md shadow-sm">
                        <div class="flex rounded-md bg-white/5 ring-1 ring-inset ring-white/10 focus-within:ring-2 focus-within:ring-inset focus-within:ring-blue-500">
                          <input maxlength="60" v-model="aptNumber" type="text" class="flex-1 border-0 bg-transparent py-1.5 pl-1 text-white focus:ring-0 sm:text-sm sm:leading-6" />
                        </div>
                      </div>
                    </div>
                    <div class="md:col-span-8">
                      <label for="pendingItemLink" class="block text-xl font-medium text-white">City</label>
                      <div class="relative mt-2 rounded-md shadow-sm">
                        <div class="flex rounded-md bg-white/5 ring-1 ring-inset ring-white/10 focus-within:ring-2 focus-within:ring-inset focus-within:ring-blue-500">
                          <input maxlength="60" v-model="city" type="text" class="flex-1 border-0 bg-transparent py-1.5 pl-1 text-white focus:ring-0 sm:text-sm sm:leading-6" />
                        </div>
                      </div>
                    </div>
                    

                    <div class="md:col-span-8">
                      <label for="pendingItemLink" class="block text-xl font-medium text-white">Zipcode</label>
                      <div class="relative mt-2 rounded-md shadow-sm">
                        <div class="flex rounded-md bg-white/5 ring-1 ring-inset ring-white/10 focus-within:ring-2 focus-within:ring-inset focus-within:ring-blue-500">
                          <input maxlength="60"
                          v-model="zipcode"  class="flex-1 border-0 bg-transparent py-1.5 pl-1 text-white focus:ring-0 sm:text-sm sm:leading-6" />
                        </div>
                      </div>
                    </div>
                    <div class="md:col-span-8">
                      <label for="pendingItemLink" class="block text-xl font-medium text-white">Country</label>
                      <div class="relative mt-2 rounded-md shadow-sm">
                        <div class="flex rounded-md bg-white/5 ring-1 ring-inset ring-white/10 focus-within:ring-2 focus-within:ring-inset focus-within:ring-blue-500">
                          <input maxlength="60" v-model="country" type="text" class="flex-1 border-0 bg-transparent py-1.5 pl-1 text-white focus:ring-0 sm:text-sm sm:leading-6" />
                        </div>
                      </div>
                    </div>

                    <div class="md:col-span-8">
                      <label class="block text-xl font-medium leading-6 text-white">Your Monero Refund Address</label>
                      <div class="mt-2">
                        <textarea maxlength="250" v-model="moneroAddress" rows="2" class="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-blue-500 sm:text-sm sm:leading-6" />
                      </div>
                    </div>
                    <div class="md:col-span-8">
                      <label class="block text-xl font-medium leading-6 text-white">General Order Notes</label>
                      <div class="mt-2">
                        <textarea maxlength="250" v-model="orderNotes" rows="3" class="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-blue-500 sm:text-sm sm:leading-6" />
                      </div>
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