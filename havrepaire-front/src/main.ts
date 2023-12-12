import './styles/theme.scss';

import FlagIcon from 'vue-flag-icon';

import { createApp } from 'vue';
import { createPinia } from 'pinia';

import App from './App.vue';
import router from './router';

import ButtonParticle from '@/particles/ButtonParticle.vue';
import CardParticle from '@/particles/CardParticle.vue';
import FormAlertParticle from '@/particles/FormAlertParticle.vue';
import FormFieldAlertParticle from '@/particles/FormFieldAlertParticle.vue';
import HeroTitleParticle from '@/particles/HeroTitleParticle.vue';
import InputGroupParticle from '@/particles/InputGroupParticle.vue';
import LinkParticle from '@/particles/LinkParticle.vue';

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(FlagIcon);

app
    .component('ButtonParticle', ButtonParticle)
    .component('CardParticle', CardParticle)
    .component('FormAlertParticle', FormAlertParticle)
    .component('FormFieldAlertParticle', FormFieldAlertParticle)
    .component('HeroTitleParticle', HeroTitleParticle)
    .component('InputGroupParticle', InputGroupParticle)
    .component('LinkParticle', LinkParticle);

app.mount('#app');
