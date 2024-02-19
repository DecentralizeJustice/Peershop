import { createRouter, createWebHistory } from "vue-router"
import HomeView from "../views/landingpage.vue"
import placeOrder from "../views/placeOrder.vue"
import pickupOrder from "../views/pickupOrder.vue"
import Login from "../views/login.vue"
import faq from "../views/faq.vue"
import guides from "../views/guides.vue"
import orderbook from "../views/orderbook.vue"
import messageMe from "../views/messageMe.vue"
import admin from "../views/admin.vue"
/* const User = {
  template: `
    <div class="user">
      <h2>User {{ $route.params.id }}</h2>
      <router-view></router-view>
    </div>
  `
} */
const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/:catchAll(.*)", component: HomeView },
    {
      path: "/",
      name: "home",
      component: HomeView
    },
    {
      path: "/placeOrder",
      name: "placeOrder",
      component: placeOrder
    },
    {
      path: "/messageMe",
      name: "messageMe",
      component: messageMe
    },
    {
      path: "/login",
      name: "login",
      component: Login
    },
    {
      path: "/faq",
      name: "faq",
      component: faq
    },
    {
      path: "/guides",
      name: "guides",
      component: guides
    },
    {
      path: "/orderbook",
      name: "orderbook",
      component: orderbook
    },
    {
      path: "/admin",
      name: "admin",
      component: admin
    },
    {
      path: "/pickuporder",
      name: "pickuporder",
      component: pickupOrder
    }         
  ],
})

export default router