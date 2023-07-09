<script setup>
import { ref, computed } from 'vue'
/* import { Switch, SwitchGroup, SwitchLabel } from '@headlessui/vue' */
import { ExclamationCircleIcon } from '@heroicons/vue/20/solid'
import cartSVG from '@/assets/svg/cart.svg'
import box1 from '@/assets/svg/box1.svg'
import box2 from '@/assets/svg/box2.svg'
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
function getbox(index) {
  if(((index+1) % 2  == 0)) {
    return box1
  }
  return box2
}
const comments = [
  {
    id: 1,
    name: 'Leslie Alexander',
    imageUrl:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    content:
      'Explicabo nihil laborum. Saepe facilis consequuntur in eaque. Consequatur perspiciatis quam. Sed est illo quia. Culpa vitae placeat vitae. Repudiandae sunt exercitationem nihil nisi facilis placeat minima eveniet.',
    date: '1d ago',
    dateTime: '2023-03-04T15:54Z',
  },
  {
    id: 2,
    name: 'Michael Foster',
    imageUrl:
      'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    content:
      'Laudantium quidem non et saepe vel sequi accusamus consequatur et. Saepe inventore veniam incidunt cumque et laborum nemo blanditiis rerum. A unde et molestiae autem ad. Architecto dolor ex accusantium maxime cumque laudantium itaque aut perferendis.',
    date: '2d ago',
    dateTime: '2023-03-03T14:02Z',
  },
  {
    id: 3,
    name: 'Dries Vincent',
    imageUrl:
      'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    content:
      'Quia animi harum in quis quidem sint. Ipsum dolorem molestias veritatis quis eveniet commodi assumenda temporibus. Dicta ut modi alias nisi. Veniam quia velit et ut. Id quas ducimus reprehenderit veniam fugit amet fugiat ipsum eius. Voluptas nobis earum in in vel corporis nisi.',
    date: '2d ago',
    dateTime: '2023-03-03T13:23Z',
  },
  {
    id: 4,
    name: 'Lindsay Walton',
    imageUrl:
      'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    content:
      'Unde dolore exercitationem nobis reprehenderit rerum corporis accusamus. Nemo suscipit temporibus quidem dolorum. Nobis optio quae atque blanditiis aspernatur doloribus sit accusamus. Sunt reiciendis ut corrupti ab debitis dolorem dolorem nam sit. Ducimus nisi qui earum aliquam. Est nam doloribus culpa illum.',
    date: '3d ago',
    dateTime: '2023-03-02T21:13Z',
  },
]

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
            <div class="flex-initial justify-center" v-if="cart.length < 1">
              <h2 class="font-heading text-3xl text-white font-black tracking-tight px-4">Your Cart Is Empty</h2>
              <div class="w-1/3 p-4 flex flex-col justify-center mx-auto"><img class="mx-auto" :src="cartSVG" alt=""></div>
            </div>
            <div class="px-10 py-5 text-white" v-if="cart.length > 0">
              <h2 class="inline-block text-2xl text-blue-500 font-bold uppercase tracking-widest">Your Cart</h2>
              <ul role="list" class="divide-y divide-gray-100">
                <li v-for="(comment,index) in comments" :key="comment.id" class="flex gap-x-4 py-5">
                  <img class="h-12 w-12 flex-none" :src="getbox(index)" alt="" />
                  <div class="flex-auto">
                    <div class="flex items-baseline justify-between gap-x-4">
                      <p class="text-sm font-semibold leading-6 text-white">Item: {{ index + 1 }}</p>
                      <p class="flex-none text-xs text-white">
                        <time :datetime="comment.dateTime">{{ comment.date }}</time>
                      </p>
                    </div>
                    <p class="mt-1 line-clamp-2 text-sm leading-6 text-white">{{ comment.content }}</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
          <div class="w-full p-2 justify center">
          <div class="container py-10 px-10 mx-0 min-w-full flex flex-col items-center">
            <button v-if="!allready" disabled class=" md:w-1/4  block w-full px-4 py-2.5 text-lg text-center text-white font-bold bg-slate-500  rounded-full">Continue</button>
            <button v-if="allready"  class=" md:w-1/4  block w-full px-4 py-2.5 text-lg text-center text-white font-bold bg-blue-500 hover:bg-blue-600  rounded-full" @click="next()">Continue To Locker Info</button>
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