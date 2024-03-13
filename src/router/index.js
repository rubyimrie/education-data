import { createWebHistory, createRouter } from "vue-router"
import Home from "@/pages/App.vue"
import UserGuide from "@/pages/user-guide.vue"

const routes = [
  {
    path: "/education-data/",
    name: "Home",
    component: Home,
  },
  {
    path: "/education-data/user-guide", // Define the route for the user guide page
    name: "UserGuide",
    component: UserGuide,
  },
]

const router = createRouter({
    history: createWebHistory(),
    routes
  })

export default router