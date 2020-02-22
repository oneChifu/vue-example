import Vue from "vue";
import Router from "vue-router";
import store from '@/store';
import i18n from '@/i18n.js';

Vue.use(Router);

const routes = [
  {
    path: "/",
    name: "home",
    meta: { layout: "main" },
    component: () => import("@/views/Home.vue")
  },
  {
    path: "/login",
    name: "login",
    meta: { 
      layout: "empty",
      requiresNoAuth: true
    },
    component: () => import("@/views/Login.vue")
  },
  {
    path: "/registration",
    name: "registration",
    meta: { 
      layout: "empty",
      requiresNoAuth: true
    },
    component: () => import("@/views/Registration.vue")
  },
  {
    path: "/users",
    name: "users",
    meta: { layout: "main" },
    component: () => import("@/views/Users.vue")
  },
  {
    path: "/plans",
    name: "plans",
    meta: { layout: "main" },
    component: () => import("@/views/Plans.vue")
  },
  {
    path: "/profile",
    name: "profile",
    meta: { 
      layout: "main",
      requiresAuth: true
    },
    component: () => import("@/views/Profile.vue")
  }
];

const router = new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  const requiresNoAuth = to.matched.some(record => record.meta.requiresNoAuth);

  if (requiresAuth && !store.state.auth.user.loggedIn){
    next('login');
  } else if (requiresNoAuth && store.state.auth.user.loggedIn){
    next('/');
  }else{
    next();
  }

  if (store.state.language.language && store.state.language.language !== i18n.locale) {
    i18n.locale = store.state.language.language;
    next();
  } else if (!store.state.language.language) {
    store.dispatch('language/setLanguage', navigator.languages)
      .then(() => {
        i18n.locale = store.state.language.language;
        next();
      });
  } else {
    next();
  }
});

export default router;
