<template>
    <!-- 左侧图标 -->
    <el-icon style="margin-right: 10px;" @click="changeIcon">
        <component :is="layoutStore.fold ? 'Fold' : 'Expand'"></component>
    </el-icon>
    <!-- 左侧面包屑 -->
    <el-breadcrumb separator-icon="ArrowRight">
        <el-breadcrumb-item v-for="item in route.matched" :key="item.path" v-show="item.meta.title" :to="item.path">
            <!-- 图标 -->
            <el-icon style="margin: 0 5px;">
                <component :is="item.meta.icon"></component>
            </el-icon> <!-- 面包屑标题 -->
            <span>{{ item.meta.title }}</span>
        </el-breadcrumb-item>
    </el-breadcrumb>
</template>

<script setup lang="ts" name="breadcrumb">
import { useLayoutStore } from '@/store/modules/layout';
import { useRoute } from 'vue-router';
//控制图标切换标识
const layoutStore = useLayoutStore();
const route = useRoute();
const changeIcon = () => {
    layoutStore.fold = !layoutStore.fold
};
</script>

<style scoped></style>