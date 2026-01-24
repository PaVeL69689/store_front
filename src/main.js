import "./assets/main.css";

import { createApp } from "vue";
import App from "./app/App.vue";
import { router } from "./routes/route";

createApp(App).use(router).mount("#app");
