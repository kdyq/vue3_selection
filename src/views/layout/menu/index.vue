<!-- 根据路由动态生成导航菜单 -->
<template>
    <template v-for="item in menuList" :key="item.path">
        <!-- 没有子路由 -->
        <el-menu-item v-if="!item.children && !item.meta.hidden" :index="item.path">
            <template #title>
                <el-icon>
                    <component :is="item.meta.icon"></component>
                </el-icon>
                <span>{{ item.meta.title }}</span>
            </template>
        </el-menu-item>
        <!-- 有但只有一个 -->
        <el-menu-item v-if="item.children && item.children.length == 1 && !item.children[0].meta.hidden"
            :index="item.children[0].path">
            <template #title>
                <el-icon>
                    <component :is="item.children[0].meta.icon"></component>
                </el-icon>
                <span>{{ item.children[0].meta.title }}</span>
            </template>
        </el-menu-item>
        <!-- 有且有多个 -->
        <el-sub-menu :index="item.path" v-if="item.children && item.children.length > 1">

            <template #title>
                <el-icon>
                    <component :is="item.meta.icon"></component>
                </el-icon>
                <span>{{ item.meta.title }}</span>
            </template>
            <Menu :menuList="item.children"></Menu>
        </el-sub-menu>
    </template>
</template>

<script setup lang="ts">
defineProps(['menuList'])
</script>
<script lang="ts">
export default {
    name: 'Menu'
}
</script>

<style scoped></style>