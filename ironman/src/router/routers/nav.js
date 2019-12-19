const tableC = (resolve) => require([ '../../views/table.vue'], resolve);
const table2C = (resolve) => require([ '../../views/table2.vue'], resolve);
const chart = (resolve) => require([ '../../views/chart.vue'], resolve);
const indexC = (resolve) => require(['../../views/index.vue'], resolve);
const seat = (resolve) => require(['../../views/seat.vue'], resolve);
var navs = [
    {
        path: '/',
        meta: {
            title: ''
        },
        name:'',
        iconClass: 'ios-navigate',
        // component: (resolve) => require(['../../views/index.vue'], resolve),
        children:[
            {
                path: '',
                name: '仪表盘',
                component: chart
            }
        ]
    },
    {
        path: '/',
        meta: {
            title: ''
        },
        name:'尼玛管理',
        hasSub:true,
        iconClass: "ios-navigate",
        // component: (resolve) => require(['../../views/index.vue'], resolve),
        children:[
            {
                path: '/wenzhang',
                name: '蚊帐管理',
                component: table2C
            },
            {
                path: '/pinglun',
                name: '评论管理',
                component: tableC
            },
        ]
    },
    {
        path: '/',
        name:'',
        iconClass: 'ios-keypad',
        children:[
            {
                path: '/a2',
                name: '台坐标获取',
                component: seat
            }
        ]
    }];

navs.forEach(function(item,index,arr) {
    item.isNav = true;
    item.component = indexC;
});

export default navs; 