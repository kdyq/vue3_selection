<template>
    <div class="layout_container">
        <!-- 左侧菜单 -->
        <div class="layout_slider">
            <logo></logo>
            <!-- 展示菜单 -->
            <el-scrollbar class="scrollbar">
                <el-menu background-color="#001529" text-color="white">
                    <el-menu-item index="1">首页</el-menu-item>
                    <el-menu-item index="2">数据大屏</el-menu-item>
                    <el-sub-menu index="3">
                        <template #title>权限管理</template>
                        <el-menu-item index="3-1">用户管理</el-menu-item>
                        <el-menu-item index="3-2">角色管理</el-menu-item>
                        <el-menu-item index="3-3">菜单管理</el-menu-item>
                    </el-sub-menu>
                </el-menu>
            </el-scrollbar>
        </div>
        <!-- 顶部导航 -->
        <div class="layout_tabbar">234</div>
        <!-- 右侧内容 -->
        <div class="layout_main">
            <p style="height: 5000px; background-color: red;">我是p标签</p>
        </div>
    </div>
</template>

<script setup lang="ts">
import logo from '@/views/layout/logo/index.vue'
</script>

<style scoped lang="scss">
.layout_container {
    width: 100%;
    height: 100vh;
    color: white;

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
        background-color: skyblue;
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