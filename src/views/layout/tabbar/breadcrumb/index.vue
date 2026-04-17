<template>
    <!-- 左侧图标 -->
    <el-icon style="margin-right: 10px;" @click="changeIcon">
        <component :is="layoutStore.fold ? 'Fold' : 'Expand'"></component>
    </el-icon>
    <!-- 左侧面包屑 -->
    <el-breadcrumb separator-icon="ArrowRight">
        <el-breadcrumb-item>权限管理</el-breadcrumb-item>
        <el-breadcrumb-item>用户管理</el-breadcrumb-item>
    </el-breadcrumb>
</template>

<script setup lang="ts" name="breadcrumb">
import { useLayoutStore } from '@/store/modules/layout';
//控制图标切换标识
const layoutStore = useLayoutStore();
const changeIcon = () => {
    layoutStore.fold = !layoutStore.fold
};
</script>

<style scoped></style>