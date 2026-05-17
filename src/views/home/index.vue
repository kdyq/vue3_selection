<template>
    <div>
        <el-card>
            <div class="box">
                <img :src="userStore.avatar ? userStore.avatar : '../../../public/touxiang.png'" class="avatar">
                <div>
                    <h3 class="title">{{ userStore.username }} {{ getTime() }}好!</h3>
                    <p class="sub-title">硅谷甄选运营平台</p>
                </div>
            </div>
        </el-card>
        <div class="bottom">
            <svg-icon name="welcome" width="450px" height="450px"></svg-icon>
        </div>
    </div>
</template>

<script setup lang="ts" name="home">
import { ref } from 'vue'
import { useUserStore } from '@/store/modules/user';
import { getTime } from '@/utils/time';
const userStore = useUserStore();
</script>

<style scoped lang="scss">
.box {
    display: flex;

    .avatar {
        width: 130px;
        height: 130px;
        margin: 0 10px;
        border-radius: 50%;
    }

    .title {
        font-size: 30px;
        font-weight: 600;
        margin-top: 20px;
        margin-bottom: 30px;
    }

    .sub-title {
        font-size: 16px;
        color: #999;
        font-style: italic;
    }
}
.bottom {
    display: flex;
    justify-content: center;
}
</style>