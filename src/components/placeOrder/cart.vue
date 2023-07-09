<script setup>
import { ref, computed } from 'vue'
import { Switch, SwitchGroup, SwitchLabel } from '@headlessui/vue'
import { ExclamationCircleIcon } from '@heroicons/vue/20/solid'
import cartSVG from '@/assets/svg/cart.svg'
const emit = defineEmits(['next'])

const pendingItemLink = ref('')
const pendingItemPrice = ref(0)
const pendingItemQuantity = ref(1)
const pendingItemNotes = ref('')

const cart = ref([])

const linkError = ref(false)
const amountError = ref(false)
const quantityError = ref(false)

function next(){
  emit('next')
}
function addToCart() {
  if(pendingItemLink.value.length < 4 || pendingItemLink.value.length > 1000){
    linkError.value = true
    return
  }
  linkError.value = false

  pendingItemPrice.value = Math.round((Number(pendingItemPrice.value)+ Number.EPSILON) * 100) / 100
  if(pendingItemPrice.value < .01 || pendingItemPrice.value > 5000 ){
    amountError.value = true
    return
  }
  amountError.value = false

  pendingItemQuantity.value = Number(pendingItemQuantity.value).toFixed(0)
  if(pendingItemQuantity.value < 1 || pendingItemQuantity.value > 100){
    quantityError.value = true
    return
  }
  quantityError.value = false

  cart.value.push(
    {
    itemLink: pendingItemLink.value,
    price: pendingItemPrice.value,
    quantity: pendingItemQuantity.value,
    notes: pendingItemNotes.value
    }
  )
  pendingItemLink.value = '',
  pendingItemPrice.value = 0,
  pendingItemQuantity.value = 1,
  pendingItemNotes.value = ''
  console.log(cart.value)
}

const allready = computed(() => {
  return true
})

</script>

<template>
          
          <div class="w-full md:w-1/2 p-8 ">
            <div class="md:max-w-md mx-auto text-center">
              <span class="inline-block mb-6 text-lg text-blue-500 font-bold uppercase tracking-widest">Add Items to Cart</span>
                  <div class="grid md:grid-cols-8 gap-y-8 gap-x-10">

                    <div class="md:col-span-8">
                      <label for="pendingItemLink" class="block text-xl font-medium text-white">Amazon Item Link</label>
                      <div class="relative mt-2 rounded-md shadow-sm">
                        <div class="flex rounded-md bg-white/5 ring-1 ring-inset ring-white/10 focus-within:ring-2 focus-within:ring-inset focus-within:ring-blue-500">
                          <input v-model="pendingItemLink" type="text" class="flex-1 border-0 bg-transparent py-1.5 pl-1 text-white focus:ring-0 sm:text-sm sm:leading-6" />
                        </div>
                        <div v-if="linkError" class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                          <ExclamationCircleIcon class="h-5 w-5 text-red-500" aria-hidden="true" />
                        </div>
                      </div>
                      <p class="mt-2 text-sm text-red-600" v-if="linkError">Not a valid link.</p>
                    </div>

                    <div class="md:col-span-4">
                      <label for="pendingItemLink" class="block text-xl font-medium text-white">Item Price</label>
                      <div class="relative mt-2 rounded-md shadow-sm">
                        <div class="flex rounded-md bg-white/5 ring-1 ring-inset ring-white/10 focus-within:ring-2 focus-within:ring-inset focus-within:ring-blue-500">
                          <input v-model="pendingItemPrice" type="number" class="flex-1 border-0 bg-transparent py-1.5 pl-1 text-white focus:ring-0 sm:text-sm sm:leading-6" />
                        </div>
                        <div v-if="amountError" class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                          <ExclamationCircleIcon class="h-5 w-5 text-red-500" aria-hidden="true" />
                        </div>
                        <div v-if="!amountError" class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                          <span class="text-gray-500 sm:text-sm" id="price-currency">USD</span>
                        </div>
                      </div>
                      <p class="mt-2 text-sm text-red-600" v-if="amountError">Not Valid Amount</p>
                    </div>


                    <div class="md:col-span-4">
                      <label for="pendingItemLink" class="block text-xl font-medium text-white">Item Quantity</label>
                      <div class="relative mt-2 rounded-md shadow-sm">
                        <div class="flex rounded-md bg-white/5 ring-1 ring-inset ring-white/10 focus-within:ring-2 focus-within:ring-inset focus-within:ring-blue-500">
                          <input v-model="pendingItemQuantity" type="number" class="flex-1 border-0 bg-transparent py-1.5 pl-1 text-white focus:ring-0 sm:text-sm sm:leading-6" />
                        </div>
                      </div>
                      <p class="mt-2 text-sm text-red-600" v-if="quantityError">Not Valid Quantity</p>
                    </div>

                    <div class="col-span-full">
                      <label class="block text-xl font-medium leading-6 text-white">Item Notes (optional)</label>
                      <div class="mt-2">
                        <textarea maxlength="150" v-model="pendingItemNotes" rows="3" class="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6" />
                      </div>
                      <p class="mt-3 text-sm leading-6 text-gray-400"></p>
                    </div>
                  </div>
            <div class="w-full justify center">
                    <div class="container pt-5 mx-0 min-w-full flex flex-col items-center">
                      <button class=" md:w-1/2  block w-full px-4 py-2.5 text-lg text-center text-white font-bold bg-green-500 hover:bg-green-600  rounded-full" 
                      @click="addToCart()">Add To Cart</button>
                    </div>
                  </div>
            </div>
          </div>
          <div class="w-full md:w-1/2 p-10 text-center">
          <div class="flex flex-col justify-center py-3 h-full bg-gray-800 rounded-3xl">
            <div class="flex-initial justify-center">
              <h2 class="font-heading text-3xl text-white font-black tracking-tight px-4">Your Cart Is Empty</h2>
              <div class="w-1/3 p-4 flex flex-col justify-center mx-auto"><img class="mx-auto" :src="cartSVG" alt=""></div>
            </div>
          </div>
        </div>
<!--         <div class="w-full p-10 text-center">
          <div class="flex flex-col justify-center py-3 h-full bg-gray-800 rounded-3xl">
            <form>
    <div class="space-y-12">

      <div class="p-8">
        <h2 class="text-base font-semibold leading-7 text-white">Personal Information</h2>
        <p class="mt-1 text-sm leading-6 text-gray-400">Use a permanent address where you can receive mail.</p>

        <div class="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
          <div class="sm:col-span-3">
            <label for="first-name" class="block text-sm font-medium leading-6 text-white">First name</label>
            <div class="mt-2">
              <input type="text" name="first-name" id="first-name" autocomplete="given-name" class="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6" />
            </div>
          </div>

          <div class="sm:col-span-3">
            <label for="last-name" class="block text-sm font-medium leading-6 text-white">Last name</label>
            <div class="mt-2">
              <input type="text" name="last-name" id="last-name" autocomplete="family-name" class="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6" />
            </div>
          </div>

          <div class="sm:col-span-4">
            <label for="email" class="block text-sm font-medium leading-6 text-white">Email address</label>
            <div class="mt-2">
              <input id="email" name="email" type="email" autocomplete="email" class="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6" />
            </div>
          </div>

          <div class="sm:col-span-3">
            <label for="country" class="block text-sm font-medium leading-6 text-white">Country</label>
            <div class="mt-2">
              <select id="country" name="country" autocomplete="country-name" class="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6 [&_*]:text-black">
                <option>United States</option>
                <option>Canada</option>
                <option>Mexico</option>
              </select>
            </div>
          </div>

          <div class="col-span-full">
            <label for="street-address" class="block text-sm font-medium leading-6 text-white">Street address</label>
            <div class="mt-2">
              <input type="text" name="street-address" id="street-address" autocomplete="street-address" class="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6" />
            </div>
          </div>

          <div class="sm:col-span-2 sm:col-start-1">
            <label for="city" class="block text-sm font-medium leading-6 text-white">City</label>
            <div class="mt-2">
              <input type="text" name="city" id="city" autocomplete="address-level2" class="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6" />
            </div>
          </div>

          <div class="sm:col-span-2">
            <label for="region" class="block text-sm font-medium leading-6 text-white">State / Province</label>
            <div class="mt-2">
              <input type="text" name="region" id="region" autocomplete="address-level1" class="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6" />
            </div>
          </div>

          <div class="sm:col-span-2">
            <label for="postal-code" class="block text-sm font-medium leading-6 text-white">ZIP / Postal code</label>
            <div class="mt-2">
              <input type="text" name="postal-code" id="postal-code" autocomplete="postal-code" class="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6" />
            </div>
          </div>
        </div>
      </div>
    </div>

  </form>
          </div>
        </div> -->
        
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