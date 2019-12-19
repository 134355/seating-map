import navs from './routers/nav';

var routers = [
    {
        name:'login',
        path:'/login',
        meta: {
            title: '登录'
        },
        component: (resolve) => require(['../views/login.vue'], resolve),
    },
    {
        name:'404',
        path: '*',
        redirect: { path: '/404' }
    }
];

routers = routers.concat(navs);

export default routers;