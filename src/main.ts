import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

import PrimeVue from 'primevue/config';
import 'primevue/resources/themes/aura-light-green/theme.css'
import 'primeicons/primeicons.css'

import Button from "primevue/button"

import Lara from './presets/lara';      //import preset        


const app = createApp(App);
app.use(PrimeVue, {
    unstyled: true,
    pt: Lara
});
app.component('Button', Button);

app.mount('#app')
