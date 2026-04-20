<template>
    <!-- 右侧按钮和头像 -->
    <el-tooltip content="刷新" placement="bottom">
        <el-button size="default" icon="Refresh" circle @click="changeRefresh"></el-button>
    </el-tooltip>
    <el-tooltip content="全屏" placement="bottom">
        <el-button size="default" icon="FullScreen" circle @click="fullScreen"></el-button>
    </el-tooltip>
    <el-tooltip content="设置" placement="bottom">
        <el-button size="default" icon="Setting" circle></el-button>
    </el-tooltip>
    <img :src="userStore.avatar" style="width: 32px; height: 32px; margin: 0 10px; border-radius: 50%;">
    <!-- 下拉菜单 -->
    <el-dropdown>
        <span class="el-dropdown-link">
            {{ userStore.username }}
            <el-icon class="el-icon--right">
                <arrow-down />
            </el-icon>
        </span>
        <template #dropdown>
            <el-dropdown-menu>
                <el-dropdown-item @click="logut">退出登录</el-dropdown-item>
            </el-dropdown-menu>
        </template>
    </el-dropdown>
</template>

<script setup lang="ts" name="setbutton">
import { useLayoutStore } from '@/store/modules/layout';
import { useUserStore } from '@/store/modules/user';
import { useRouter } from 'vue-router';
const router = useRouter();
const userStore = useUserStore();
const layoutStore = useLayoutStore();
// 刷新
const changeRefresh = () => {
    layoutStore.refresh = !layoutStore.refresh;
};
//全屏实现
const fullScreen = () => {
    //document的一个属性，可以判断当前是否是全屏
    const full = document.fullscreenElement;
    //切换为全屏
    if (!full) {
        document.documentElement.requestFullscreen();
    } else {
        //取消全屏
        document.exitFullscreen();
    }
}
//退出登录
const logut = async () => {
    await userStore.userLogout()
    //跳转到登录页
    router.replace('/login')
};

</script>

<style lang="scss" scoped></style>