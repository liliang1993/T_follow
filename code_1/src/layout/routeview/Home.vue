<template v-loading.fullscreen.lock="$store.state.global.ajax_loading">
    <div class="home">
        <div class='left-fixed'>
             <left-menu></left-menu>
        </div>
        <div class="right-auto" :style="{marginLeft:$store.state.leftmenu.width}">
              <head-nav></head-nav>
                <div class="content">
                    <bread></bread>
                    <router-view></router-view>
                </div>
        </div>
    </div>
</template>
<script>
    import HeadNav from '../head-nav/HeadNav.vue';
	import LeftMenu from '../left-menu/LeftMenu.vue';
	import Bread from '../bread/Bread.vue';

    export default {
        name: 'home',
        components:{
            HeadNav,LeftMenu,Bread
        }
    }
</script>
<style scoped lang='less'>
    .content{
        margin-top: 100px;
        /*background: #f1f2f7;*/
        background: #FFF;
        padding: 16px;
    }
    .right-content{
        margin-bottom: 60px;
    }
    .right-auto{
        position:relative;
    }
</style>
