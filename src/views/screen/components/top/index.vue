<template>
    <div class="top">
        <div class="left">
            <button class="lbtn" @click="goHome">首页</button>
        </div>
        <div class="center">
            <div class="title">智慧旅游可视化大屏</div>
        </div>
        <div class="right">
            <span class="rbtn">统计报告</span>
            <span class="time">当前时间：{{ time }}</span>
        </div>
    </div>
</template>

<script setup lang="ts" name="screen-top">
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import moment from 'moment';
const router = useRouter()
//存储当前时间
const time = ref(moment().format('YYYY年MM月DD日 HH:mm:ss'))
const timer = ref(0)
const goHome = () => {
    router.push('/')
}
//更新时间
onMounted(() => {
    setInterval(() => {
        time.value = moment().format('YYYY年MM月DD日 HH:mm:ss')
    }, 1000)
})
//销毁定时器
onUnmounted(() => {
    clearInterval(timer.value)
})
</script>

<style lang="scss" scoped>
.top {
    width: 100%;
    height: 100%;
    display: flex;

    .left {
        flex: 1.3;
        background: url(../../images/dataScreen-header-left-bg.png) no-repeat;
        background-size: cover;

        .lbtn {
            width: 150px;
            height: 40px;
            float: right;
            text-align: center;
            line-height: 40px;
            color: #29fcff;
            background: url(../../images/dataScreen-header-btn-bg-l.png) no-repeat;
            background-size: 100% 100%;
            font-size: 20px;
        }
    }

    .center {
        flex: 2;

        .title {
            width: 100%;
            height: 74px;
            background: url(../../images/dataScreen-header-center-bg.png) no-repeat;
            background-size: 100% 100%;
            text-align: center;
            line-height: 74px;
            color: #29fcff;
            font-size: 45px;
        }
    }

    .right {
        flex: 1.3;
        background: url(../../images/dataScreen-header-right-bg.png) no-repeat;
        background-size: cover;
        display: flex;
        justify-content: space-between;
        align-items: center;

        .rbtn {
            width: 150px;
            height: 40px;
            // float: left;
            text-align: center;
            line-height: 40px;
            color: #29fcff;
            background: url(../../images/dataScreen-header-btn-bg-r.png) no-repeat;
            background-size: 100% 100%;
            font-size: 20px;
        }

        .time {
            color: #29fcff;
            font-size: 20px;
        }
    }
}
</style>