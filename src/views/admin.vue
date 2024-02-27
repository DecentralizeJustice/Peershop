<script setup>
import { onMounted, ref } from "vue"
import axios from 'axios';
const orders = ref({})
onMounted(async () => {
  const results = await axios.post('/.netlify/functions/adminGetAllOrders', {})
  orders.value = results.data
  console.log(orders.value.length)
})
</script>

<template>
<section class="py-10 bg-gray-800 overflow-hidden">
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
