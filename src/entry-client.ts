/*
 * @Author: E-Dreamer
 * @Date: 2022-04-01 09:17:06
 * @LastEditTime: 2022-04-01 10:09:57
 * @LastEditors: E-Dreamer
 * @Description:
 */
import { createSSRApp } from "vue";
import App from './App.vue';
import { createRouter } from "./router";
import { createStore } from "./store";
const app = createSSRApp(App);
const router = createRouter(false);
const store = createStore();

app.use(router).use(store);

router.isReady().then(() => {
  app.mount('#app');
});
