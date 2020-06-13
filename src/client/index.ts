import './index.scss';

async function load() {
  const imports = await Promise.all([
    import('portal-vue'),
    import('vue'),
    import('./app.vue')
  ]);

  const { default: PortalVue } = imports[0];
  const { default: Vue } = imports[1];
  const { default: App } = imports[2];

  Vue.use(PortalVue);

  new Vue({
    el: '#app',
    render: h => h(App)
  });
}

load();
