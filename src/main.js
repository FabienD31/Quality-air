import Vue from 'vue'
import App from './App.vue'
import VueRouter from "vue-router"

import {auth} from "./services/Firebase"
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import './assets/app.scss'

import Home from "./components/pages/Home";
import Admin from "./components/pages/Admin";
import Login from "./components/pages/Login";
import CreateAccount from "./components/pages/CreateAccount";

Vue.use(VueRouter)
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)

Vue.config.productionTip = false

const routes = [
  {path:"/",component:Home},
  {path:"/admin",component:Admin, meta: {needAuth: true}}, //ajout la meta pour donner une condition 
  {path:"/login",component:Login},
  {path:"/create-account",component:CreateAccount},
];

const router = new VueRouter({
  mode:"history",
  routes
});

router.beforeEach((to, from, next) => {
  const isAuthenticated = auth.currentUser;
  const isProtected = to.matched.some(route => route.meta.needAuth); //permet de dire voir si sur la route la meta needAuth est présente

  if(!isAuthenticated && isProtected) {
    next("/login");
  } else { 
    next();
  }
});

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
