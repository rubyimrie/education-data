import { createWebHistory, createRouter } from "vue-router"

import Home from "@/views/Home.vue"
import UserGuide from "@/views/UserGuide.vue"
import Feedback from "@/views/Feedback.vue"

const routes = [
  {
    path: "/education-data",
    name: "Home",
    component: Home,
  },
  {
    path: "/education-data/userguide",
    name: "UserGuide",
    component: UserGuide,
  },
  {
    path: "/education-data/feedback",
    name: "Feedback",
    component: Feedback,
  },
]

const router = createRouter({
    history: createWebHistory(),
    routes
  })

export default router