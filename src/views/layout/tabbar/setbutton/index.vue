<template>
    <!-- 右侧按钮和头像 -->
    <el-tooltip content="刷新" placement="bottom">
        <el-button size="default" icon="Refresh" circle @click="changeRefresh"></el-button>
    </el-tooltip>
    <el-tooltip content="全屏" placement="bottom">
        <el-button size="default" icon="FullScreen" circle></el-button>
    </el-tooltip>
    <el-tooltip content="设置" placement="bottom">
        <el-button size="default" icon="Setting" circle></el-button>
    </el-tooltip>
    <img src="/logo.png" style="width: 32px; height: 32px; margin: 0 10px;">
    <!-- 下拉菜单 -->
    <el-dropdown>
        <span class="el-dropdown-link">
            admin
            <el-icon class="el-icon--right">
                <arrow-down />
            </el-icon>
        </span>
        <template #dropdown>
            <el-dropdown-menu>
                <el-dropdown-item>退出登录</el-dropdown-item>
            </el-dropdown-menu>
        </template>
    </el-dropdown>
</template>

<script setup lang="ts" name="setbutton">
import { useLayoutStore } from '@/store/modules/layout';
const layoutStore = useLayoutStore();
const changeRefresh = () => {
    layoutStore.refresh = !layoutStore.refresh;
};
</script>

<style lang="scss" scoped></style>