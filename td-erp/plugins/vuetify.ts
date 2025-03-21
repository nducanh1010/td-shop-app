import "@mdi/font/css/materialdesignicons.css";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import { createVuetify } from "vuetify";
import { BLUE_THEME } from "@/assets/theme/LightTheme";
import "~/assets/scss/style.scss";

export default defineNuxtPlugin((app) => {
  const vuetify = createVuetify({
    components,
    directives,

    theme: {
      defaultTheme: "BLUE_THEME",
      themes: {
        BLUE_THEME,
      },
    },
    defaults: {
      VCard: {
        rounded: "xl",
      },
      VTextField: {
        variant: "outlined",
        density: "comfortable",
        color: "primary",
      },
      VTextarea: {
        variant: "outlined",
        density: "comfortable",
        color: "primary",
      },
      VSelect: {
        variant: "outlined",
        density: "comfortable",
        color: "primary",
      },
    },
  });
  app.vueApp.use(vuetify);
});
