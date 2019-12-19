<style scoped lang="scss">
    .layout {
        height: 100%;
        border: 1px solid #d7dde4;
        background: #f5f7f9;
        position: relative;
        border-radius: 4px;
        overflow: hidden;
        &>div {
            height: 100%;
            flex-wrap: nowrap;
            &>div {
                height: 100%;
            }
            &>div.nav {
                width: 200px;
                flex-shrink: 0;
            }
            &>div.main {
                flex: 1;
                width: 100%;
                display: flex;
                flex-direction: column;
                overflow: auto;
                &>.layout-content {
                    overflow: auto;
                }
            }
        }
    }
    .nav .ivu-menu-submenu .ivu-icon {
        font-size: 24px;
        margin-right: 8px;
    }
    .nav .ivu-menu-submenu .ivu-icon-ios-arrow-down {
        margin-right: 0;
    }
    .layout-breadcrumb {
        padding: 10px 15px 0;
    }
    .layout-content {
        position: relative;
        flex: 1;
        min-height: 200px;
        min-width: 800px;
        overflow: hidden;
        background: #fff;
    }
    .layout-content-main {
        padding: 10px;
    }
    .layout-copy {
        text-align: center;
        padding: 10px 0 20px;
        color: #9ea7b4;
    }
    .layout-menu-left {
        background: #464c5b;
    }
    .layout-header {
        background: #fff;
        border-bottom: 1px solid #464c5b;
    }
    .avatar {
        display: flex;
        flex-direction: column;
        align-items: center;
        align-content: center;
        padding: 10px;
        .img {
            width: 60px;
            height: 60px;
            background-image: url('../image/haligo.png');
            background-size: cover;
            background-position: center;
        }
        h3 {
            color: #fff;
        }
    }
    .layout-ceiling-main a {
        color: #9ba7b5;
    }
    .layout-text {
        vertical-align: text-bottom;
    }
    .layout-hide-text .layout-text {
        display: none;
    }
    .ivu-col {
        transition: width .2s ease-in-out;
    }
</style>

<template>
    <div class="layout" :class="{'layout-hide-text': isHideNavFont}">
        <Row type="flex">
            <i-col class="layout-menu-left  nav" :style="{width:isHideNavFont?'89px':'180px'}">
                <Menu  :active-name="$router.history.current.name"  :open-names="[$router.history.current.matched[0].name]"
                    theme="dark" width="auto">
                    <div class="layout-logo-left  avatar">
                        <div class='img' :style='{backgroundImage:"url("+ userInfo.avatar +")",width:isHideNavFont?"40px":"60px",height:isHideNavFont?"40px":"60px"}'></div>
                        <h3 v-if="!isHideNavFont" class="name">{{userInfo.username}}</h3>
                        <h3 v-if="!isHideNavFont" class="role">
                            <span  v-for="(role,index) in userInfo.roles"  :key="index">
                                {{role.display_name}} <i v-if="index<(userInfo.roles.length-1)"> , </i>
                            </span>
                        </h3>
                        <Button type="error" size="small" @click="modal_logout = true">退出</Button>
                    </div>
                    <div v-for="item in $router.options.routes" :key="item.name">
                        <!--单级-->
                        <Menu-item  :name="item.children[0].name"   @click.native="pushRoute(item)"   v-if="item.isNav&&!item.hasSub">
                            <Icon  :type="item.iconClass"  :size="iconSize"></Icon>
                            <span  class="layout-text">{{item.children[0].name}}</span>
                        </Menu-item>
                        <!--多级-->
                        <Submenu  :name="item.name" v-if="item.isNav&&item.hasSub">
                            <template slot="title">
                                    <Icon type="ios-paper"  :size="iconSize"></Icon>
                                    <span class="layout-text">{{item.name}}</span>
                            </template>
                            <Menu-item :name="sub.name"  v-for="(sub,subIndex) in item.children"  :key="sub.name"
                                    @click.native='pushRoute(sub)'  
                            >
                                <Icon type="ios-paper"  :size="iconSize"></Icon>
                                <span class="layout-text">{{sub.name}}</span>
                            </Menu-item>
                            
                        </Submenu>
                    </div>
                    
                </Menu>
            </i-col>
            <i-col  class="main">
                <div class="layout-header">
                    <i-button type="text" @click="toggleLayout">
                        <Icon type="navicon" size="32"></Icon>
                    </i-button>
                </div>
                <div class="layout-content">
                    <keep-alive>
                        <router-view></router-view>
                    </keep-alive>
                </div>
            </i-col>
        </Row>
        <Modal
            v-model="modal_logout"
            title="提示！"
            @on-ok="logout"
            @on-cancel="">
            <p>确定要退出？</p>
        </Modal>
    </div>
</template>

<script>
    import storage from '../libs/storage.js';
    import {
        formatTime,
        isEmpty
    } from '../libs/format.js';
    import {
        logout
    } from '../api'
    export default {
        data() {
            return {
                isHideNavFont: 0,
                modal_logout: false
            }
        },
        created() {
            console.log(this.$router);
            console.log(this.$router.history.current.matched[0].name);
        },
        computed: {
            userInfo() {
                return this.$store.state.userInfo;
            },
            iconSize() {
                return this.isHideNavFont ? 18 : 24;
            }
        },
        methods: {
            toggleLayout() {
                this.isHideNavFont = this.isHideNavFont ? 0 : 1;
            },
            logout() {
                logout().then(({
                    data
                }) => {
                    if (data.code === 0) {
                        return this.$Message.info('登出成功！');
                    }
                });
                storage.remove('token');
                this.$router.push("/login");
            },
            pushRoute(item) {
                let name = '';
                if (item.children) {
                    name = item.children[0].name;
                } else {
                    name = item.name;
                }
                this.$router.push({
                    name: name
                })
            }
        }
    }
</script>
