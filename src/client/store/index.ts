import { ModuleTree, Plugin, Store } from 'vuex';
import { isProduction } from '@/app-config';
import Actions from './actions';
import Getters from './getters';
import Mutations from './mutations';
import { State } from './state';

export * from './actions';
export * from './getters';
export * from './modules';
export * from './mutations';
export * from './payload';
export * from './state';
export * from './util';

export function createStore(modules: ModuleTree<State>, plugins: Plugin<State>[]): Store<State> {
  return new Store({
    state: function () {
      return {
        alerts: [],
        message: 'Loading...'
      };
    },
    getters: Getters,
    mutations: Mutations,
    actions: Actions,
    modules: modules,
    plugins: plugins,
    strict: !isProduction()
  });
}
