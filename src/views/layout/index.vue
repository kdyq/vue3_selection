<template>
    <div class="layout_container">
        <!-- 左侧菜单 -->
        <div class="layout_slider" :class="{ fold: layoutStore.fold ? true : false }">
            <logo></logo>
            <!-- 展示菜单 -->
            <el-scrollbar class="scrollbar">
                <el-menu :default-active="route.path" active-text-color="skyblue" background-color="#001529"
                    text-color="white" :collapse="layoutStore.fold ? true : false">
                    <!-- 动态生成导航菜单 -->
                    <Menu :menuList="userStore.menuRoute"></Menu>
                </el-menu>
            </el-scrollbar>
        </div>
        <!-- 顶部导航 -->
        <div class="layout_tabbar" :class="{ fold: layoutStore.fold ? true : false }">
            <Tabbar></Tabbar>
        </div>
        <!-- 右侧内容 -->
        <div class="layout_main" :class="{ fold: layoutStore.fold ? true : false }">
            <Main></Main>
        </div>
    </div>
</template>

<script setup lang="ts" name="layout">
import logo from '@/views/layout/logo/index.vue'
import Menu from '@/views/layout/menu/index.vue'
import { useUserStore } from '@/store/modules/user';
import Main from '@/views/layout/main/index.vue'
import { useRoute } from 'vue-router';
import Tabbar from '@/views/layout/tabbar/index.vue'
import { useLayoutStore } from '@/store/modules/layout';
const userStore = useUserStore();
const route = useRoute();
const layoutStore = useLayoutStore();
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
        transition: all 0.3s;

        .scrollbar {
            width: 100%;
            height: calc(100vh - $base-tubbar-height);
        }

        &.fold {
            width: $base-menu-min-width ;
        }
    }

    .layout_tabbar {
        position: fixed;
        top: 0px;
        left: $base-menu-width;
        width: calc(100% - $base-menu-width);
        height: $base-tubbar-height;
        transition: all 0.3s;

        &.fold {
            width: calc(100vw - $base-menu-min-width);
            left: $base-menu-min-width;
        }
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
        transition: all 0.3s;

        &.fold {
            width: calc(100vw - $base-menu-min-width);
            left: $base-menu-min-width;
        }
    }
}
</style>