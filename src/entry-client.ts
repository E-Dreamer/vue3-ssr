/*
 * @Author: E-Dreamer
 * @Date: 2022-04-01 09:17:06
 * @LastEditTime: 2022-07-26 09:44:25
 * @LastEditors: E-Dreamer
 * @Description:
 */
import { createApp } from "vue";
import App from './App.vue';
import { createRouter } from "./router";
import { createStore } from "./store";
const app = createApp(App);
const router = createRouter(false);
const store = createStore();

app.use(router).use(store);

router.isReady().then(() => {
  app.mount('#app');
});
