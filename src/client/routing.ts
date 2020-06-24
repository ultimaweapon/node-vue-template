import { RouteConfig } from 'vue-router';
import Home from './pages/home.vue';
import NotFound from './pages/not-found.vue';

export default new Array<RouteConfig>(
  { path: '/', component: Home },
  { path: '*', component: NotFound }
);
