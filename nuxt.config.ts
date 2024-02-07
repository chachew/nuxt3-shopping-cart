import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify';
import vuetifySass from '@paro-paro/vite-plugin-vuetify-sass'; //https://www.npmjs.com/package/@paro-paro/vite-plugin-vuetify-sass  https://github.com/vuetifyjs/vuetify-loader/issues/290#issuecomment-1839784090

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: true,
  devtools: { enabled: true },
  build: {
    transpile: ['vuetify']
  },
  experimental: {
    inlineSSRStyles: false // for production build
  },
  css: ['@/assets/css/nuxt.css'],
  plugins: ['~/plugins/vuetify/index.ts'],
  modules: [
    '@nuxtjs/supabase'
  ],
  hooks: {
    'vite:extendConfig': (config) => {
      config.plugins!.push(
        vuetify({ autoImport: true }), // do not pass the 'styles' option
        vuetifySass({
          configFile: 'plugins/vuetify/settings.scss'
        })
      );
    }
  },
  vite: {
    vue: {
      template: {
        transformAssetUrls
      }
    }
  },
  supabase: {
    redirect: false
  },
  runtimeConfig: {
    public: {
      // baseUrl: 'http://localhost:3000/',
      // baseImageUrl: `${process.env.SUPABASE_URL}/storage/v1/object/public/product-images/`
    }
  }
});
