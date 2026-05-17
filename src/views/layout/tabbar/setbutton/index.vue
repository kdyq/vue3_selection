<template>
    <!-- 右侧按钮和头像 -->
    <el-tooltip content="刷新" placement="bottom">
        <el-button size="default" icon="Refresh" circle @click="changeRefresh"></el-button>
    </el-tooltip>
    <el-tooltip content="全屏" placement="bottom">
        <el-button size="default" icon="FullScreen" circle @click="fullScreen"></el-button>
    </el-tooltip>
    <el-popover placement="bottom" title="主题设置" :width="300" trigger="click">
        <!-- 表单元素 -->
        <el-form label-width="80px">
            <el-form-item label="主题颜色">
                <el-color-picker @change="setColor" v-model="color" size="small" show-alpha :predefine="predefineColors"
                    :teleported="false" />
            </el-form-item>
            <el-form-item label="暗黑模式">
                <el-switch @change="changeDark" v-model="dark" size="default" active-icon="MoonNight"
                    inactive-icon="Sunny" inline-prompt />
            </el-form-item>
        </el-form>

        <template #reference>
            <el-button size="default" icon="Setting" circle title="设置"></el-button>
        </template>
    </el-popover>
    <img :src="userStore.avatar ? userStore.avatar : '../../../../../public/touxiang.png'"
        style="width: 32px; height: 32px; margin: 0 10px; border-radius: 50%;">
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
import { ref } from 'vue'
const router = useRouter();
const userStore = useUserStore();
const layoutStore = useLayoutStore();
//颜色数据
const color = ref('rgba(255, 69, 0, 0.68)')
const predefineColors = ref([
    '#ff4500',
    '#ff8c00',
    '#ffd700',
    '#90ee90',
    '#00ced1',
    '#1e90ff',
    '#c71585',
    'rgba(255, 69, 0, 0.68)',
    'rgb(255, 120, 0)',
    'hsv(51, 100, 98)',
    'hsva(120, 40, 94, 0.5)',
    'hsl(181, 100%, 37%)',
    'hsla(209, 100%, 56%, 0.73)',
    '#c7158577',
])
// 主题设置
const dark = ref(false)
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
//暗黑模式
const changeDark = () => {
    //获取html根节点
    const html = document.documentElement
    //根据dark添加类名
    dark.value ? html.className = 'dark' : html.className = ''
}
//主题颜色设置
const setColor = () => {
    //获取html根节点
    const html = document.documentElement
    //设置主题颜色
    html.style.setProperty('--el-color-primary', color.value)
}
</script>

<style lang="scss" scoped></style>