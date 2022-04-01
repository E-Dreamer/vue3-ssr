/*
 * @Author: E-Dreamer
 * @Date: 2022-04-01 09:22:23
 * @LastEditTime: 2022-04-01 09:37:20
 * @LastEditors: E-Dreamer
 * @Description:
 */
import { RouteRecordRaw } from 'vue-router';
const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        name: 'Home',
        component: () =>
            import(/* webpackChunkName: "about" */ '../views/Home.vue')
    },
    {
        path: '/about',
        name: 'About',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
            import(/* webpackChunkName: "about" */ '../views/About.vue')
    }
];

export default routes;
