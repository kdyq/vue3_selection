<template>
    <div class="screen-rank">
        <div class="top">
            <p class="title">热门景区排行</p>
            <p class="bg"></p>
        </div>

        <div class="rank-content">
            <div class="rank-header">
                <span>排名</span>
                <span>景区</span>
                <span>预约数量</span>
            </div>

            <div class="rank-list">
                <div class="rank-item" v-for="item in rankList" :key="item.rank">
                    <div class="rank-no" :class="`rank-no-${item.rank}`">
                        NO.{{ item.rank }}
                    </div>

                    <div class="rank-name">
                        {{ item.name }}
                    </div>

                    <div class="rank-progress">
                        <div class="progress-bg">
                            <div class="progress-inner" :class="`progress-${item.rank}`"
                                :style="{ width: item.percent + '%' }">
                                <span>{{ item.percent }}%</span>
                            </div>
                        </div>
                    </div>

                    <div class="rank-value">
                        {{ item.value }}
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
const rankList = [
    {
        rank: 1,
        name: '峨眉山',
        percent: 80,
        value: '8.00w'
    },
    {
        rank: 2,
        name: '稻城亚丁',
        percent: 60,
        value: '6.00w'
    },
    {
        rank: 3,
        name: '九寨沟',
        percent: 50,
        value: '5.00w'
    },
    {
        rank: 4,
        name: '万里长城',
        percent: 40,
        value: '4.00w'
    },
    {
        rank: 5,
        name: '北京故宫',
        percent: 30,
        value: '3.00w'
    }
]
</script>

<style scoped lang="scss">
.screen-rank {
    width: 100%;
    height: 400px;
    background: url(../../../images/dataScreen-main-lb.png) no-repeat;
    background-size: 100% 100%;
    margin-top: 10px;
    padding-top: 8px;
    box-sizing: border-box;

    .top {
        margin-left: 20px;

        .title {
            color: #fff;
            font-size: 20px;
            font-weight: 700;
            margin: 0;
        }

        .bg {
            width: 68px;
            height: 7px;
            background: url(../../../images/dataScreen-title.png) no-repeat;
            background-size: 100% 100%;
            margin-top: 8px;
        }
    }

    .rank-content {
        width: calc(100% - 44px);
        margin: 60px auto 0;
    }

    .rank-header {
        height: 40px;
        line-height: 40px;
        background: url(../../../images/dataScreen-header-right-bg.png) no-repeat;
        background-size: 100% 100%;
        display: grid;
        grid-template-columns: 70px 90px 1fr;
        align-items: center;
        padding: 0 18px;
        box-sizing: border-box;

        span {
            color: #ffd36b;
            font-size: 15px;
            font-weight: 700;
        }
    }

    .rank-list {
        padding: 12px 10px 0;
        box-sizing: border-box;
    }

    .rank-item {
        height: 40px;
        display: grid;
        grid-template-columns: 70px 90px 1fr 58px;
        align-items: center;
        column-gap: 8px;
    }

    .rank-no {
        width: 50px;
        height: 22px;
        line-height: 22px;
        text-align: center;
        color: #fff;
        font-size: 13px;
        font-weight: 700;
        transform: skewX(-18deg);
        box-shadow: 0 0 8px rgba(0, 170, 255, 0.45);

        &::before {
            content: '';
        }
    }

    .rank-no-1 {
        background: linear-gradient(90deg, #cf4235, #ff875d);
    }

    .rank-no-2 {
        background: linear-gradient(90deg, #d79b28, #f4c45d);
    }

    .rank-no-3,
    .rank-no-4,
    .rank-no-5 {
        background: linear-gradient(90deg, #087bc4, #43b6ff);
    }

    .rank-name {
        color: #fff;
        font-size: 14px;
        font-weight: 700;
        white-space: nowrap;
    }

    .rank-progress {
        width: 100%;
    }

    .progress-bg {
        width: 100%;
        height: 15px;
        border: 1px solid #008ee8;
        border-radius: 10px;
        background: rgba(5, 18, 68, 0.9);
        box-shadow: inset 0 0 8px rgba(0, 170, 255, 0.45);
        overflow: hidden;
    }

    .progress-inner {
        height: 100%;
        border-radius: 10px;
        position: relative;
        transition: width 0.3s;

        span {
            position: absolute;
            left: 8px;
            top: 50%;
            transform: translateY(-50%);
            color: #fff;
            font-size: 12px;
            font-weight: 700;
        }
    }

    .progress-1 {
        background: linear-gradient(90deg, #0077ff, #00d8ff);
    }

    .progress-2 {
        background: linear-gradient(90deg, #ff5f6d, #ff9671);
    }

    .progress-3 {
        background: linear-gradient(90deg, #28d4ff, #7de7ff);
    }

    .progress-4 {
        background: linear-gradient(90deg, #ff9d1e, #ffd05b);
    }

    .progress-5 {
        background: linear-gradient(90deg, #605cff, #a378ff);
    }

    .rank-value {
        color: #fff;
        font-size: 15px;
        font-weight: 700;
        text-align: right;
        white-space: nowrap;
    }
}
</style>