import PerfectScrollbar from "vue3-perfect-scrollbar";
import VueApexCharts from "vue3-apexcharts";
import VueTablerIcons from "vue-tabler-icons";
import Maska from "maska";
import Vue3Toastify, { type ToastContainerOptions } from "vue3-toastify";
import 'vue3-toastify/dist/index.css';
export default defineNuxtPlugin((nuxtApp) => {
  const app = nuxtApp.vueApp;
  app.use(VueApexCharts);
  app.use(PerfectScrollbar);
  app.use(VueTablerIcons);
  app.use(Maska);
  app.use(Vue3Toastify, {
    autoClose: 3000,
    pauseOnHover:true,
    position:"top-right"
  } as ToastContainerOptions);
});
