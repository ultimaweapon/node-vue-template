import './index.scss';

async function load() {
  const { default: PortalVue } = await import('portal-vue');
  const { default: Vue } = await import('vue');
  const { default: Vuex } = await import('vuex');
  const { default: App } = await import('./app.vue');
  const { createStore } = await import('./store');
  const messagePublisher = await import('./store-plugins/message-publisher');

  Vue.use(PortalVue);
  Vue.use(Vuex);

  const modules = {
  };

  const plugins = [
    messagePublisher.create
  ];

  new Vue({
    el: '#app',
    store: createStore(modules, plugins),
    render: h => h(App)
  });
}

load();
