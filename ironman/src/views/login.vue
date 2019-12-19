<style lang="scss" scoped>
    .login_wrap {
        position: absolute;
        left: 0;
        top: 0;
        height: 100%;
        width: 100%;
        background-size: cover;
        background-position: center;
    }
    .wrap {
        position: relative;
        top: 10%;
        width: 300px;
        margin: 10px auto 50px;
    }
    .logo {
        display: block;
        width: 70%;
        margin: auto;
        left: 10px;
    }
    .title {
        font-size: 35px;
        text-align: center;
        line-height: 3;
        font-weight: 700;
    }
    .username,
    .password {
        margin-bottom: 15px;
    }
</style>

<template>
    <transition name="test" mode="out-in">
        <div class="login_wrap">
            <div class="wrap">
                <img src="../image/haligo.png" alt="" class="logo">
                <p class="title">夜乐商家后台</p>
                <Input v-model.trim="username" size="large" placeholder="请输入账号" class="username" type="text">
                <Icon type="ios-person" slot="prepend" size='20'></Icon>
                </Input>
                <Input v-model.trim="password" size="large" placeholder="请输入密码" class="password" type="password">
                <Icon type="ios-locked" slot="prepend" size='20'></Icon>
                </Input>
                <Button type="success" size="large" long :loading="isLogining" @click="login">登陆</Button>
            </div>
        </div>
    </transition>
</template>

<script>
    import {
        isEmpty
    } from '../libs/format';
    import {
        login
    } from '../api';
    import {
        throttle
    } from '../libs/tool.js';
    import _ from '../libs/util';
    import storage from '../libs/storage.js';
    import d3 from 'd3';
    import Trianglify from 'trianglify';
    export default {
        data() {
            return {
                username: '',
                password: '',
                isLogining: false
            };
        },
        created: function() {
            
        },
        methods: {
            login() {
                //验证格式
                if (isEmpty(this.username)) {
                    return this.$Message.warning('请输入用户名');
                }
                if (isEmpty(this.password)) {
                    return this.$Message.warning('请输入密码');
                }
                this.isLogining = true;
                login({
                    'username': this.username,
                    'password': this.password
                }).then(({
                    data
                }) => {
                    if (data.code === 0) {
                        console.log(data);
                        storage.set('token', data.data.token);
                        this.isLogining = false;
                        this.$Message.info('登录成功！');
                        //获取用户信息
                        this.$store.dispatch('updateUserInfo');
                        setTimeout(() => {
                            if(this.$route.query.redirect){
                                // 返回之前的页面（如果可以）
                                this.$router.push(this.$route.query.redirect);
                            }else{
                                //前往主页
                                this.$router.push('/');
                            }
                            
                        }, 1000);
                    }
                }).catch((err) => {
                    this.isLogining = false;
                    console.log(err);
                });
            },
            drawBg() {
                var t = new Trianglify({
                    width: window.innerWidth,
                    height: window.innerHeight,
                    cell_size: window.innerWidth / 20 < 50 ? 50 : window.innerWidth / 20
                });
                this.$el.style.backgroundImage = 'url(' + t.png() + ')';
            }
        },
        mounted() {
            //回车登录
            this.$el.addEventListener('keyup', (e) => {
                if (e.keyCode === 13) {
                    this.login();
                }
            });
            //背景图片
            this.$nextTick(function() {
                this.drawBg();
                var _this = this;
                window.onresize = throttle(function() {
                    _this.drawBg();
                }, 100, 800);
            });
        }
    };
</script>
