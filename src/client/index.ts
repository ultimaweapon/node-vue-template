import './index.scss';

async function load() {
  const { default: PortalVue } = await import('portal-vue');
  const { default: Vue } = await import('vue');
  const { default: VueRouter } = await import('vue-router');
  const { default: Vuex } = await import('vuex');
  const { default: App } = await import('./index.vue');
  const { default: routes }  = await import('./routing');
  const { default: scrollBehavior } = await import('./routing-scroll');
  const { createStore } = await import('./store');
  const messagePublisher = await import('./store-plugins/message-publisher');

  Vue.use(PortalVue);
  Vue.use(VueRouter);
  Vue.use(Vuex);

  const modules = {
  };

  const plugins = [
    messagePublisher.create
  ];

  const router = new VueRouter({
    mode: 'history',
    linkActiveClass: 'active',
    linkExactActiveClass: 'active',
    routes,
    scrollBehavior
  });

  new Vue({
    el: '#app',
    store: createStore(modules, plugins),
    render: h => h(App),
    router
  });
}

load();
