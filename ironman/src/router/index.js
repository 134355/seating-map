import VueRouter from 'vue-router';
import Vue from 'vue';
import iView from 'iview';

import storage from '../libs/storage';
import Util from '../libs/util';
import Routers from './routers';
import store from '../vuex';
// import {getUserInfo} from '../api';

Vue.use(VueRouter);

const RouterConfig = {
    mode: 'history',
    routes: Routers
};
const router = new VueRouter(RouterConfig);

// 顶部进度条及title
router.beforeEach((to, from, next) => {
    iView.LoadingBar.start();
    Util.title(to.meta.title);
    //若无token，全部转到login页
    if (to.name !== 'login') {
        if (!storage.get('token')) {
            // router.push('./login');
            iView.Message.info('请先登录！');
            // next({
            //     path: '/login', // 跳转到登录页面
            //     query: {
            //         redirect: to.fullPath
            //     }, // 将跳转的路由path作为参数，用于登录成功后回到登录前页面
            // });
            next();
        }

        //若store里无userInfo,则重新获取
        if (!store.state.userInfo) {
            store.dispatch('updateUserInfo');
        }
    }
    next();
});

//退出登录
router.beforeEach((to, from, next) => {
    if (to.name === 'login') {
        storage.remove('token');
    }
    next();
});

router.afterEach(() => {
    iView.LoadingBar.finish();
    window.scrollTo(0, 0);
});

export default router;