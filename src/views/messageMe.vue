<script setup>
import axios from 'axios';
import { ref } from 'vue'
const text = ref('')
const messageSent = ref(false)
async function sendMessage() {
  if (text.value.length < 1) {
    return
  }
/*   buttonDisabled.value = true
  await sleep(3000)
  buttonDisabled.value = false */
  const results = await axios.post('/.netlify/functions/sendMeMessage', { message: text.value })
  console.log(results)
  text.value = ''
  messageSent.value = true
}
const faq = [
  {
    q: `Do I need to have an Amazon account to use this service?`,
    a:`Yes. If you do not want to make an account, our other service would be a better fit for you: anonshop.app`
  }
]
function getQuestionNumber(number) {
  return faq.length - number
}
const selectedQuestion = ref(-1)
function selectQuestion(chosen) {
  if (selectedQuestion.value === chosen) {
    selectedQuestion.value = -1
    return
  }
  selectedQuestion.value = chosen
}
</script>

<template>
<section class="py-10 bg-gray-800 overflow-hidden">
  <div class="container mx-auto px-4">
    <div class="relative py-16 px-8 bg-gray-900 overflow-hidden rounded-3xl">
      <div class="max-w-7xl mx-auto"><!-- <img class="absolute bottom-0 left-1/2 transform -translate-x-1/2" src="https://res.cloudinary.com/dylevfpbl/image/upload/v1685928443/landingpage/pattern-dark.png" alt=""> -->
        <div class="relative flex flex-wrap -m-4">
          <div class="w-full md:w-1/2 p-4">
            <div class="flex flex-col justify-between h-full">
              <div class="mb-10 md:max-w-md">
<!--                 <span class="inline-block mb-4 text-sm text-blue-500 font-bold uppercase tracking-widest">Message Me</span> -->
                <h2 class="font-heading text-blue-500 mb-6 text-4xl md:text-5xl lg:text-6xl  font-black tracking-tight">Ask Question</h2>
                <p class="text-gray-200 font-bold text-xl">
                  Shoot me a message about anything anonymously. I welcome all questions you might have!
                  I will respond on at the bottom of this page.
                </p>
              </div>
<!--               <div class="flex flex-wrap -m-5  md:block hidden">
                <div class="w-full md:w-auto p-4"><img class="mx-auto" src="https://res.cloudinary.com/dylevfpbl/image/upload/v1686615396/landingpage/pexels-luis-gomes-546819.jpg" alt=""></div>

              </div> -->
            </div>
          </div>
          <div class="w-full md:w-1/2 p-4">
            <div class="p-10 bg-gray-800 rounded-3xl">
              <div class="flex flex-wrap -m-3 mb-3">
              </div>
              <div class="flex flex-wrap -m-3.5" v-if="!messageSent">
                <div class="w-full p-3.5">
                  <label class="block mb-2 text-sm text-gray-500 font-bold">Message</label>
                  <textarea v-model="text" class="appearance-none px-6 py-5 w-full text-lg text-gray-500 font-bold bg-gray-900 placeholder-gray-500 outline-none focus:ring-4 focus:ring-blue-200 rounded-3xl" id="contactDarkReversePatternInput4-5" type="text" rows="8" placeholder="Enter your message"></textarea>
                </div>
                <div class="w-full p-3.5">
                  <div class="flex flex-wrap items-center -m-3">
                    <div class="w-full p-3">
                      <div class="flex flex-wrap md:justify-end -m-2">
                        <div class="w-full p-2"><button class="block w-full px-8 py-3.5 text-lg text-center text-white font-bold bg-blue-500 hover:bg-blue-600 rounded-full" @click="sendMessage">Send Message</button></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="flex flex-wrap -m-3.5" v-if="messageSent">
                <div class="w-full p-3.5">
                  <p class="text-gray-200 font-bold text-xl">
                 Your message has been sent! I always try to respond to messages within 24 hours so check back here soon! Thanks again.
                </p></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
<section class="py-10 bg-gray-800 overflow-hidden">
  <div class="container mx-auto px-4">
    <div class="relative py-16 px-8 bg-gray-900 overflow-hidden border border-gray-800 rounded-3xl">
      <div class="absolute top-1/2 left-1/2 min-w-max transform -translate-x-1/2 -translate-y-1/2">
        <div class="absolute bg-gradient-radial-dark w-full h-full"></div><img src="https://res.cloudinary.com/dylevfpbl/image/upload/v1685928443/landingpage/pattern-dark.png" alt="">
      </div>
      <div class="relative mb-10 md:max-w-xl mx-auto text-center">
        <!-- <span class="inline-block mb-5 text-sm text-blue-500 font-bold uppercase tracking-widest">Frequently asked questions</span> -->
        <h2 class="font-heading mb-6 text-4xl md:text-5xl lg:text-6xl  font-black tracking-tight text-blue-500">Past Questions</h2>
<!--         <p class="text-gray-400 font-bold">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Malesuada tellus vestibulum, commodo pulvinar.</p> -->
      </div>
      <div class="relative max-w-3xl mx-auto">
        <div class="flex flex-wrap -m-5" v-for="(question, index) in faq" :key="index">
          <div class="w-full p-3 my-3" v-if="index === selectedQuestion">
            <a class="block p-10 bg-gray-800 rounded-3xl text-left" @click="selectQuestion(index)">
            <div class="flex flex-wrap -m-2">
              <div class="flex-1 p-2">
                <h3 class="mb-4 text-xl text-white">Question {{  getQuestionNumber(index) }}. <br/>{{ question.q}}</h3>
                <p class="text-gray-400  text-md">{{ question.a }}</p>
              </div>
              <div class="w-auto p-2">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M6.07928 15.8198L12.3093 15.8198L17.9193 15.8198C18.8793 15.8198 19.3593 14.6598 18.6793 13.9798L13.4993 8.79983C12.6693 7.96983 11.3193 7.96983 10.4893 8.79983L8.51928 10.7698L5.30927 13.9798C4.63927 14.6598 5.11928 15.8198 6.07928 15.8198Z" fill="#374151"></path>
                </svg>
              </div>
            </div>
          </a>
        </div>
          <div class="w-full p-3 my-3" v-if="index !== selectedQuestion">
            <a class="block p-10 bg-gray-800 rounded-3xl text-left" @click="selectQuestion(index)" >
            <div class="flex flex-wrap -m-2">
              <div class="flex-1 p-2">
                <h3 class="text-xl text-white"> Question {{  getQuestionNumber(index) }}. <br/>{{ question.q }}</h3>
              </div>
              <div class="w-auto p-2">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M17.9207 8.18018H11.6907H6.08072C5.12072 8.18018 4.64073 9.34018 5.32073 10.0202L10.5007 15.2002C11.3307 16.0302 12.6807 16.0302 13.5107 15.2002L15.4807 13.2302L18.6907 10.0202C19.3607 9.34018 18.8807 8.18018 17.9207 8.18018Z" fill="#374151"></path>
                </svg>
              </div>
            </div>
          </a>
        </div>
        </div>
      </div>
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
