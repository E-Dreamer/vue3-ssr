/*
 * @Author: E-Dreamer
 * @Date: 2022-04-01 09:17:14
 * @LastEditTime: 2022-04-01 10:11:51
 * @LastEditors: E-Dreamer
 * @Description:
 */
import { createSSRApp } from 'vue';
import App from './App.vue';
import { createRouter } from './router';
import { createStore } from './store';

export default function () {
  const app = createSSRApp(App);
  const router = createRouter(true);
  const store = createStore();

  app.use(router).use(store);
  return {
    app,
    router,
    store,
  };
}
