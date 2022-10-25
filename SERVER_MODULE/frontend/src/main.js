import axios from "axios";
import { createApp } from "vue";
import App from "./App.vue";
import { API_URL } from "./constant";
import router from "./router";
import store from "./store";

const app = createApp(App).use(store).use(router);
app.mixin({
  methods: {
    logout() {
      axios.defaults.headers.common["Authorization"] =
        "Bearer " + localStorage.token;

      axios.post(API_URL + "/auth/logout").then((res) => {
        localStorage.clear();
        router.push({ name: "login" });
        alert(res.data.message);
      });
    },
  },
});
app.mount("#app");
