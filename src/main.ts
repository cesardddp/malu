import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import Home from "./Home.vue";

import PrimeVue from "primevue/config";
import "primevue/resources/themes/aura-light-green/theme.css";
import "primeicons/primeicons.css";

import Button from "primevue/button";

import Lara from "./presets/lara"; //import preset
import { createRouter,createWebHashHistory } from "vue-router";
import Detalhes from "./components/detalhes.vue";
import Listagem from "./Listagem.vue";

const routes = [
	{ path: "/", component: Home },
	{ name:'detalhes', path: "/detalhes/:nome?", component: Detalhes, props: true }, // o "?" faz nome ser opcional, por algum motivo, o componente não é renderizado sem ele
	{ name:'list', path: "/list", component: Listagem, props: true },
];

const router = createRouter({
	history: createWebHashHistory(),
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
