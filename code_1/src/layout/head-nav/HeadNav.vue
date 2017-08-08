<template>
    <div>

        <header class="head-nav" :style="{marginLeft:$store.state.leftmenu.width}">
            <div class="topLeft leftFloat">
            <h1 class="leftFloat"><img src="../../assets/logo.png" alt="http://www.newb-it.com/" /></h1>
            <p>设置跟随</p>
            </div>
            <div class="topRight rightFloat">admin | <a href="#">退出</a></div>
        </header>

    </div>
</template>

<script>
	import HeadNavJs from './HeadNav.js';
	export default HeadNavJs;
</script>

<style scoped lang='less'>
    .logo-container {
        height: 60px;
    }

    .logo {
        height: 50px;
        width: auto;
        margin-top: 5px;
    }

    .fa-user {
        position: relative;
        top: -2px;
        margin-right: 4px;
    }

    .head-nav {
        width: 1200px;
        height: 100px;
        color: #bbbbbe;
        position: fixed;
        top: 0px;
        left: 0px;
        z-index: 99;
    }
    .topLeft{width:400px;margin-top:27px; }
.topLeft h1{width:164px;height:46px;border-right:1px solid #474856;padding-right:24px;margin-right:20px;}
.topLeft p{font-size:20px;margin-top:10px;}
.topRight{margin-top:40px;}
.topRight a{ color:#bbbbbe; }
.topRight a:hover{ color:#4a78d0;}
</style>
