<template>
    <div id="app">
        <transition name="test" mode="out-in">
            <router-view></router-view>
        </transition>
    </div>
</template>
<script>
    export default {
        data() {
            return {

            };
        },
        mounted() {
            
        },
        beforeDestroy() {

        },
        methods: {

        }
    };
</script>