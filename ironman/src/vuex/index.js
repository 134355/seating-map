import Vuex from 'vuex';
import Vue from 'vue';
import getters from './getters';
import actions from './actions';
import mutations from './mutations';

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production';//在严格模式下，无论何时发生了状态变更且不是由 mutation 函数引起的，将会抛出错误。这能保证所有的状态变更都能被调试工具跟踪到。

const store = new Vuex.Store({
    state: {
        userInfo: ''
    },
    getters: getters,
    mutations: mutations,
    actions: actions,
    modules: {},
    strict: debug
});

export default store;