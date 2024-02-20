<script setup>
import { useRoute } from 'vue-router'
import markdownit from 'markdown-it'
import genMD from '@/assets/markdown/general.md?raw'
import earnerMD from '@/assets/markdown/earner.md?raw'
import shopperMD from '@/assets/markdown/shopper.md?raw'
import litepaperMD from '@/assets/markdown/litepaper.md?raw'

const route = useRoute()
let option = route.params.option

const props = defineProps(['litepaper'])

if(props.litepaper){
  option = 'litepaper'
}

const md = markdownit({
  html: true,
  linkify: true,
  typographer: true
})
let rawHtml = ''
switch (option) {
  case 'general':
    rawHtml = md.render(genMD)
    break;
  case 'earner':
    rawHtml = md.render(earnerMD)
    break;
  case 'shopper':
    rawHtml = md.render(shopperMD)
    break;
  case 'litepaper':
    rawHtml = md.render(litepaperMD)
    break;
  default:
    rawHtml = md.render(genMD)
}
</script>

<template>
<section class="py-10 bg-gray-800 overflow-hidden content-center">
  <div class="container px-4 mx-auto">
    <div class="relative py-16 mx-auto px-8 bg-gray-900 overflow-hidden rounded-3xl  w-full md:w-2/3">
      <span v-html="rawHtml" class="prose prose-lg prose-headings:text-white text-white prose-a:text-blue-600"></span>
    </div>
  </div>
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
