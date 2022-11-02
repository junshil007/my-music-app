import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";

import ElementPlus from "element-plus";
import "element-plus/dist/index.css";

import "./assets/main.css";

const app = createApp(App);

app.use(createPinia());
app.use(ElementPlus);
app.use(router);

app.mount("#app");
