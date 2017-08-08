<template>
    <div class="left" :style="{'height':win_size.height,'width':$store.state.leftmenu.width}" id='admin-left'>
        <div id='left-menu'>
            <el-row class='tac'>
                <el-col :span="24">
                    <div class="logo">
                            
                    </div>
                    <el-menu
                            class="el-menu-vertical-demo"
                            theme="dark"
                            :default-active="$route.path"
                            unique-opened
                            router>
                        <!-- v-if="!item.hidden && (($store.state.user.userinfo.access_status===1 && $store.state.user.userinfo.web_routers[route.path+'/'+item.path]) || $store.state.user.userinfo.access_status!==1)" -->
                        <template
                                v-for="(item,index) in $router.options.routes"
                                v-if="!item.hidden" >
                            <el-submenu
                                    :index="item.path"
                                    v-if="!item.leaf">
                                <template
                                        slot="title">
                                    <el-tooltip
                                            class="item"
                                            effect="dark"
                                            placement="right"
                                            :disabled="$store.state.leftmenu.menu_flag"
                                            :content="item.name">
                                        <i :class="'fa fa-'+item.icon"></i>
                                    </el-tooltip>
                                    <span

                                            class='menu-name'
                                            v-if="$store.state.leftmenu.menu_flag">{{item.name}}
                                        <!-- {{route.path+'/'+item.path}} --></span>
                                </template>

                                <el-menu-item
                                        v-for='(child,cindex) in item.children'
                                        :key='child.path'
                                        v-if="!child.hidden"
                                        :style="{'padding-left':$store.state.leftmenu.menu_flag? '40px' : '23px'}"
                                        :index='$store.state.router.headerCurRouter+"/"+item.path+"/"+child.path'>
                                    <el-tooltip
                                            class="item"
                                            effect="dark"
                                            placement="right"
                                            :disabled="$store.state.leftmenu.menu_flag"
                                            :content="child.name">
                                        <i :class="'fa fa-'+child.icon"></i>
                                    </el-tooltip>
                                    <span
                                            class='menu-name'
                                            v-if="$store.state.leftmenu.menu_flag">{{child.name}}
                                        <!-- {{route.path+'/'+item.path+'/'+child.path}} --></span>
                                </el-menu-item>
                            </el-submenu>
                             <el-menu-item v-if="item.leaf&&item.children.length>0" :index="item.path+'/'+item.children[0].path">
                                        <!-- <el-tooltip
                                            class="item"
                                            effect="dark"
                                            placement="right"
                                            :disabled="$store.state.leftmenu.menu_flag"
                                            :content="item.name">
                                           <i :class="'fa fa-'+item.icon"></i>
                                        </el-tooltip> -->

                                        <span
                                            class='menu-name'
                                            v-if="$store.state.leftmenu.menu_flag" v-html='item.children[0].name'><!-- {{route.path+'/'+item.path}} --></span> </el-menu-item>
                        </template>
                    </el-menu>
                </el-col>
            </el-row>
            <!-- <div class="toggle-menu"
                 @click='toggleMenu'
                 :style='{left:$store.state.leftmenu.width}'>
                <i :class='[{"el-icon-arrow-left":$store.state.leftmenu.menu_flag},{"el-icon-arrow-right":!$store.state.leftmenu.menu_flag}]'></i>
            </div> -->
        </div>
    </div>
</template>

<script>
    import LeftMenu from './LeftMenu.js';
    export default LeftMenu;
</script>

<style scoped lang='less'>
    @import url(./LeftMenu.less);
</style>
