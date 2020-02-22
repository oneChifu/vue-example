import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import { BootstrapVue, IconsPlugin } from "bootstrap-vue";
import firebase from "firebase";
import i18n from "./i18n";

Vue.config.productionTip = false;

Vue.use(BootstrapVue);
Vue.use(IconsPlugin);

let app;

firebase.initializeApp({
  apiKey: "AIzaSyCHJ0QhJxnN_nbG3X2ceJJozxMSVlQuylM",
  authDomain: "tikal-center.firebaseapp.com",
  databaseURL: "https://tikal-center.firebaseio.com",
  projectId: "tikal-center",
  storageBucket: "tikal-center.appspot.com",
  messagingSenderId: "903023771432",
  appId: "1:903023771432:web:2b92f4661d797018501a1d"
})

firebase.auth().onAuthStateChanged(user => {
  if (user) {
    store.dispatch("fetchUser", user)

    firebase.database().ref(`/users/${user.uid}`).once('value', data => {
      store.dispatch("updateUser", data.val().info)
    })
    // .then(() => {
      
    // })
  }

  if (!app) {
    app = new Vue({
      router,
      store,
      i18n,
      render: h => h(App)
    }).$mount("#app");
  }
  // if (!app) {
  //   app = new Vue({
  //     router,
  //     store,
  //     i18n,
  //     render: h => h(App)
  //   }).$mount("#app");
  // }
})
