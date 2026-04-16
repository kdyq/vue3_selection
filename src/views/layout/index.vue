<template>
    <div class="layout_container">
        <!-- 左侧菜单 -->
        <div class="layout_slider">
            <logo></logo>
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

    .layout_slider {
        width: $base-menu-width;
        height: 100%;
        background-color: $base-menu-color;
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