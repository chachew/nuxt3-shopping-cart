import '@mdi/font/css/materialdesignicons.css';
import 'vuetify/styles';
import defaults from './defaults';
import { createVuetify } from 'vuetify';

export default defineNuxtPlugin((app) => {
  const vuetify = createVuetify({
    defaults
  });
  app.vueApp.use(vuetify);
});
