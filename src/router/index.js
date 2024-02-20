import { createRouter, createWebHistory } from "vue-router"
import HomeView from "../views/landingpage.vue"
import placeOrder from "../views/placeOrder.vue"
import pickupOrder from "../views/pickupOrder.vue"
import Login from "../views/login.vue"
import guides from "../views/guides.vue"
import orderbook from "../views/orderbook.vue"
import messageMe from "../views/messageMe.vue"
import admin from "../views/admin.vue"
import markdown from "../components/markdown.vue"

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
    },
    {
      path: "/guides/:option",
      component: markdown,
      props: { default: true }
    }         
  ],
})

export default router