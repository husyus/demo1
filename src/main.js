import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import { createPinia } from "pinia";
import { router } from "./router";
import "element-plus/dist/index.css";
// 可选：引入Element Plus的全局样式（如动画、过渡等）
import "element-plus/theme-chalk/display.css";

createApp(App).use(createPinia()).use(router).mount("#app");
