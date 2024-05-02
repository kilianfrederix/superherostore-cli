import { createWebHistory, createRouter } from "vue-router";
import HomeRoute from "@/views/HomeRoute.vue";
import WinkelwagenRoute from "@/views/WinkelwagenRoute.vue";
import NotFound from "@/views/NotFound.vue";

const routes = [
    {
        path: "/", 
        name: "HomeRoute",
        component: HomeRoute,
    },
    {
        path: "/winkelwagen",
        name : "WinkelwagenRoute",
        component: WinkelwagenRoute,
    },
    {
        path: "/:catchAll(.*)",
        component: NotFound,
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});
export default router;
