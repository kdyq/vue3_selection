<template>
    <div class="layout_container">
        <!-- 左侧菜单 -->
        <div class="layout_slider">
            <logo></logo>
            <!-- 展示菜单 -->
            <el-scrollbar class="scrollbar">
                <el-menu :default-active="route.path" active-text-color="skyblue" background-color="#001529"
                    text-color="white">
                    <!-- 动态生成导航菜单 -->
                    <Menu :menuList="userStore.menuRoute"></Menu>
                </el-menu>
            </el-scrollbar>
        </div>
        <!-- 顶部导航 -->
        <div class="layout_tabbar">
            <Tabbar></Tabbar>
        </div>
        <!-- 右侧内容 -->
        <div class="layout_main">
            <Main></Main>
        </div>
    </div>
</template>

<script setup lang="ts">
import logo from '@/views/layout/logo/index.vue'
import Menu from '@/views/layout/menu/index.vue'
import { useUserStore } from '@/store/modules/user';
import Main from '@/views/layout/main/index.vue'
import { useRoute } from 'vue-router';
import Tabbar from '@/views/layout/tabbar/index.vue'
const userStore = useUserStore();
const route = useRoute();
</script>

<style scoped lang="scss">
.layout_container {
    width: 100%;
    height: 100vh;
    // color: white;

    .layout_slider {
        width: $base-menu-width;
        height: 100%;
        background-color: $base-menu-color;

        .scrollbar {
            width: 100%;
            height: calc(100vh - $base-tubbar-height);
        }
    }

    .layout_tabbar {
        position: fixed;
        top: 0px;
        left: $base-menu-width;
        width: calc(100% - $base-menu-width);
        height: $base-tubbar-height;
        // background-color: skyblue;
    }

    .layout_main {
        position: absolute;
        top: $base-tubbar-height;
        left: $base-menu-width;
        width: calc(100% - $base-menu-width);
        height: calc(100vh - $base-tubbar-height);
        background-color: pink;
        padding: 20px;
        overflow: auto;
    }
}
</style>