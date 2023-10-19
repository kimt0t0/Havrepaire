import './styles/theme.scss';

import FlagIcon from 'vue-flag-icon';

import { createApp } from 'vue';
import { createPinia } from 'pinia';

import App from './App.vue';
import router from './router';

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(FlagIcon);

app.mount('#app');
