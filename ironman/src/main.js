import Vue from 'vue';
import iView from 'iview';
import App from './app.vue';
import 'iview/dist/styles/iview.css';

import store from './vuex';
import router from './router';
import './css/app.css';

Vue.use(iView);


export default new Vue({
    el: '#app',
    router: router,
    store: store,
    render: h => h(App)
});