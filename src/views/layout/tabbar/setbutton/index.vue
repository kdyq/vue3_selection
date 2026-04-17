<template>
    <!-- 右侧按钮和头像 -->
    <el-button size="default" icon="Refresh" circle></el-button>
    <el-button size="default" icon="FullScreen" circle></el-button>
    <el-button size="default" icon="Setting" circle></el-button>
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

</script>

<style lang="scss" scoped></style>