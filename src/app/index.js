import { createApp } from 'vue';
import App from './App.vue';
import { getGlobalComponents } from '@/shared/configs/global-vue-components.js';

// Images
import '@/shared/assets/cover.png';

// Styles
import 'normalize.css/normalize.css';
import '@/shared/styles/general/color-schemes.scss';
import '@/shared/styles/general/typography.scss';
import '@/shared/styles/general/presets.scss';
import '@/shared/styles/general/scaffolding.scss';

// Create app instance
const app_instance = createApp(App);

// Register global components
const global_components = getGlobalComponents();
Object.keys(global_components).map((name) => {
  app_instance.component(name, global_components[name]);
});

// Mount the instance to the document
app_instance.mount('#app');
