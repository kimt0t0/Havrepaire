import './styles/theme.scss';

import FlagIcon from 'vue-flag-icon';

import { createApp } from 'vue';
import { createPinia } from 'pinia';

import App from './App.vue';
import router from './router';

import ButtonParticle from '@/particles/ButtonParticle.vue';
import LinkParticle from '@/particles/LinkParticle.vue';

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(FlagIcon);

app
    .component('ButtonParticle', ButtonParticle)
    .component('LinkParticle', LinkParticle);

app.mount('#app');
