import { createApp } from "vue";
import App from "./App.vue";
import "@/assets/css/tailwind.css";
import router from "./router";

// 1. Assign app to a variable
let app = createApp(App)

// 2. Assign the global variable before mounting
// app.config.globalProperties.apiLink = "http://127.0.0.1:8000";
app.config.globalProperties.apiLink = "https://8sdgtp.deta.dev/";

// 3. Use router and mount app
app.use(router).mount('#app');




