import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import router from "../src/router/index";
import "./assets/style/style.css";
router.beforeEach((to, from) => {
  const token = localStorage.getItem("h5_token");
  //非登录页面
  if (!token && to.path != "/login") {
    return "/login";
  } else if (token && to.path === "/login") {
    return "/";
  } else {
    return true;
  }
});

const app = createApp(App);

// app.config.globalProperties.$api = api;
app.use(router);
app.mount("#app");
