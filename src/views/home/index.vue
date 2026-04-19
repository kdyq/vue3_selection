<template>
    <div>
        <h2>我是一级路由登录后的数据页{{ userStore.username }}</h2>
        <h2>{{ userStore.avatar }}</h2>
    </div>
</template>

<script setup lang="ts" name="home">
import { onMounted } from 'vue';
import { useUserStore } from '@/store/modules/user';
const userStore = useUserStore();
onMounted(() => { 
    userStore.userInfo()
})
</script>

<style scoped></style>