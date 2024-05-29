import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";

import PrimeVue from "primevue/config";
import "primevue/resources/themes/aura-light-green/theme.css";
import "primeicons/primeicons.css";

import Button from "primevue/button";

import Lara from "./presets/lara"; //import preset
import {  createRouter, createWebHistory } from "vue-router";

const routes = [
  { path: '/:pathMatch(.*)*', component: { template: "" } },
  // { path: '/about', component: AboutView },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});
const app = createApp(App);
app.use(PrimeVue, {
  unstyled: true,
  pt: Lara,
});
app.component("Button", Button);
app.use(router);

app.mount("#app");
