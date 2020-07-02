import Vue, { AsyncComponent } from 'vue';
import { RouteConfig } from 'vue-router';
import Error from './pages/error.vue';
import Loading from './pages/loading.vue';

function lazy(component: () => Promise<{ default: typeof Vue }>, timeout?: number): AsyncComponent {
  return function () {
    return {
      component: component() as any, // TODO: Type declaration in Vue expect a function, which is not correct.
      loading: Loading,
      error: Error,
      timeout
    };
  }
}

export default new Array<RouteConfig>(
  { path: '/', component: lazy(() => import('./pages/home.vue')) },
  { path: '*', component: lazy(() => import('./pages/not-found.vue')) }
);
