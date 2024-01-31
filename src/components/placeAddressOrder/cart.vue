<script setup>
import { ref, computed, onMounted } from 'vue'
import { ExclamationCircleIcon } from '@heroicons/vue/20/solid'
import globalJson from '@/assets/globalInfo.json'
import cartSVG from '@/assets/svg/cart.svg'
import box1 from '@/assets/svg/box1.svg'
import box2 from '@/assets/svg/box2.svg'
import box3 from '@/assets/svg/box3.svg'
import box4 from '@/assets/svg/box4.svg'
import box5 from '@/assets/svg/box5.svg'
const emit = defineEmits(['next', 'back'])
const props = defineProps(['cart'])
const pendingItemLink = ref('')
const pendingItemPrice = ref(0)
const pendingItemQuantity = ref(1)
const pendingItemNotes = ref('')

const cart = ref([])

const linkError = ref(false)
const amountError = ref(false)
const quantityError = ref(false)

function next(){
  emit('next', cart.value)
}
function back(){
  emit('back', cart.value)
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
    price: Number(pendingItemPrice.value),
    quantity: Number(pendingItemQuantity.value),
    notes: pendingItemNotes.value
    }
  )
  pendingItemLink.value = '',
  pendingItemPrice.value = 0,
  pendingItemQuantity.value = 1,
  pendingItemNotes.value = ''
}
function getbox(index) {
  const boxlist = [
    box1,
    box2,
    box3,
    box4,
    box5
  ]
  return boxlist[(index) % boxlist.length]
}
function removeItem(index) {
  cart.value = cart.value.toSpliced(index, 1)
  return
}
const allready = computed(() => {
  if(itemSubtotal.value > Number(globalJson.minLockerOrder)){
    return true
  }
  return false
})

const itemSubtotal = computed(() => {
  let subtotal = Number(0)
  if(cart.value.length < 1){
    return 0
  }
  cart.value.forEach(element => {
    subtotal += (element.quantity * element.price)
  });
  return subtotal
})
const orderTax = computed(() => {
  return itemSubtotal.value*Number(globalJson.estimatedTax)*Number(1/100)
})
const serviceFee = computed(() => {
  const minfee = Number(globalJson.addressMinFee)
  const percentFee = Number(itemSubtotal.value)*Number(globalJson.addressPercentage)*.01
  if(minfee > percentFee){ 
    return minfee
  }
  else{
    return percentFee
  }
})
onMounted(() => {
  cart.value = props.cart
})
</script>

<template>
          
          <div class="w-full md:w-1/2 p-8 ">
            <div class="md:max-w-md mx-auto text-center">
              <span class="inline-block mb-6 text-lg text-blue-500 font-bold uppercase tracking-widest">Add Items to Cart</span>
                  <div class="grid md:grid-cols-8 gap-y-8 gap-x-10">

                    <div class="md:col-span-8">
                      <label for="pendingItemLink" class="block text-xl font-medium text-white">Item Link</label>
                      <div class="relative mt-2 rounded-md shadow-sm">
                        <div class="flex rounded-md bg-white/5 ring-1 ring-inset ring-white/10 focus-within:ring-2 focus-within:ring-inset focus-within:ring-blue-500">
                          <input v-model="pendingItemLink" type="text" class="flex-1 border-0 bg-transparent py-1.5 pl-1 text-white focus:ring-0 sm:text-sm sm:leading-6" maxlength="500"/>
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
          <div class="flex flex-col justify-content:start h-full bg-gray-800 rounded-3xl max-h-[36rem] overflow-y-auto">
            <div class="flex-initial justify-center" v-if="cart.length === 0">
              <h2 class="font-heading text-3xl text-white font-black tracking-tight p-4">Your Cart Is Empty</h2>
              <div class="w-1/3 p-4 flex flex-col justify-center mx-auto"><img class="mx-auto" :src="cartSVG" alt=""></div>
            </div>
            <div class="px-4 md:px-8 py-5 text-white" v-if="cart.length !== 0">
              <h2 class="inline-block text-2xl text-blue-500 font-bold uppercase tracking-widest">Your Cart</h2>
              <ul role="list" class="divide-y divide-gray-100">
                <li v-for="(item ,index) in cart" :key="item.itemLink" class="flex gap-x-4 py-5">
                  <img class="h-12 w-12 flex-none" :src="getbox(index)" alt="" />
                  <div class="flex-auto md:space-y-2 space-y-4">
                    <div class="flex items-baseline justify-between gap-x-4">
                      <p class="text-sm font-semibold leading-6 text-white">Item# {{ index + 1 }}</p>
                      <p class="text-md text-white" v-if="item.quantity < 2">
                        Item Price:  <br/>{{ item.price }} USD
                      </p>
                      <p class="text-md text-white" v-if="item.quantity > 1">
                        Items Total: <br/>{{ Number(item.price*item.quantity).toFixed(2) }} USD
                      </p>
                    </div>
                    <p class="mt-1 line-clamp-2 text-md leading-6 text-white text-left">Quantity: {{ item.quantity }}</p>
                    <p class="mt-1 text-md leading-6 text-white text-left" v-if="item.quantity > 1">
                        Item Price: {{ item.price }} USD
                      </p>
                    <p class="mt-1 line-clamp-2 text-md leading-6 text-white text-left text-blue-500"><a :href="item.itemLink" target="_blank" rel="noopener noreferrer"
                      class="text-blue-500 dark:text-blue-500 hover:underline">Product Link:</a></p>
                      <p  class="mt-1 line-clamp-2 text-md leading-6 text-white text-left break-all">{{ item.itemLink }}</p>
                    <p v-if='item.notes.length > 0' class="mt-1  text-md leading-6 text-white text-left break-all">Item Notes: <br/>{{ item.notes }}</p>
                    <button class="md:w-1/4  block w-full pb-1 mt-4 text-lg text-center text-white font-bold bg-red-500  rounded-full"
                    @click="removeItem(index)">Remove</button>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div class="w-full px-2 justify-center mx-auto text-center">
          <div class="px-4 sm:px-0 text-white">
          <h3 class="text-2xl">Estimated Fees</h3>

          <div class="grid md:grid-cols-2 gap-4 md:w-4/6 mx-auto text-xl  text-center md:mt-0 mt-5">
            <div class="md:py-4">
              <div class="text-white">
                <p class=" mb-4"><span class="text-blue-300 font-bold">Item Subtotal:</span><br/>{{itemSubtotal.toFixed(2)}} USD</p>
                <p><span class="text-blue-300 font-bold">Estimated {{globalJson.estimatedTax}}% Tax: <br/></span>
                  {{orderTax.toFixed(2)}} USD </p>
               </div>
            </div>
            <div class="md:py-4">
              <div class="text-white">
                <p class=" mb-4"><span class="text-blue-300 font-bold">Non-Refundable Service Fee:</span><br/>{{serviceFee.toFixed(2)}} USD</p>
    
              </div>
            </div>
            </div>
          <div>
            <p class="text-blue-600 font-bold text-3xl mb-1 mt-6 md:mt-3">Base Order Total:</p>
            <p  class="text-2xl">{{(itemSubtotal+orderTax+Number(serviceFee)).toFixed(2)}} USD</p></div>
        </div>

        </div>
          <div class="md:w-2/3 mx-auto">
          <div class="container py-10 px-10 flex flex-col items-center grid md:grid-cols-2 gap-12 ">
            <button  class="mx-auto block w-full px-4 py-2.5 text-lg text-center text-white font-bold bg-red-500 hover:bg-red-600  rounded-full" @click="back()">Back To Intro</button>
            <button v-if="!allready" disabled class=" mx-auto  block w-full px-4 py-2.5 text-lg text-center text-white font-bold bg-slate-500  rounded-full">Min. Order is {{ globalJson.minLockerOrder }} USD</button>
            <button v-if="allready"  class=" mx-auto  block w-full px-4 py-2.5 text-lg text-center text-white font-bold bg-green-600  rounded-full" @click="next()">Continue To Locker Info</button>
          </div>
        </div>

</template>

<style scoped>
</style>