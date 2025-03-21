import vuetify, { transformAssetUrls } from "vite-plugin-vuetify";
// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  ssr: false,
  app: {
    head: {
      // rel="stylesheet"
      // href="https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap" />}
      link: [
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap",
        },
      ],
    },
  },
  components: [
    "~/components",
    { path: "~/components/dashboard", pathPrefix: false },
    { path: "~/components/auth", pathPrefix: false },
    { path: "~/components/shared", pathPrefix: false },
    { path: "~/components/style-components", pathPrefix: false },
  ],
  //...
  modules: [
    "@pinia/nuxt",
    "pinia-plugin-persistedstate/nuxt",
    (_options, nuxt) => {
      nuxt.hooks.hook("vite:extendConfig", (config) => {
        // @ts-expect-error
        config.plugins.push(
          vuetify({
            autoImport: true,
            styles: { configFile: "/assets/scss/variables.scss" },
          })
        );
      });
    },
    //...
  ],
  vite: {
    vue: {
      template: {
        transformAssetUrls,
      },
    },
  },
});
