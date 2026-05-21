<template>
    <div class="screen-tourist">
        <div class="top">
            <p class="title">实时游客统计</p>
            <p class="bg"></p>
            <p class="num">可预约总量<span> 999999 </span>人</p>
        </div>
        <div class="people">
            <span v-for="(item, index) in people" :key="index">{{ item }}</span>
        </div>
        <div class="water_box">
            <div class="water_ball" ref="water_ball"></div>
        </div>
    </div>
</template>

<script setup lang="ts" name="screen-tourist">
import { ref, onMounted } from 'vue'
import * as echarts from 'echarts'
import 'echarts-liquidfill'
const people = ref('216908人')
//获取节点实例
const water_ball = ref()
onMounted(() => {
    //创建图表实例
    const myChart = echarts.init(water_ball.value)

    myChart.setOption({
        series: [
            {
                type: 'liquidFill',
                data: [0.5, 0.4, 0.35],
                radius: '90%',
                center: ['50%', '50%'],

                // 水波颜色
                color: [
                    {
                        type: 'linear',
                        x: 0,
                        y: 0,
                        x2: 0,
                        y2: 1,
                        colorStops: [
                            { offset: 0, color: '#28f8ff' },
                            { offset: 1, color: '#0fb5c8' }
                        ]
                    },
                    '#21d8d8',
                    '#13a6b7'
                ],

                // 波浪效果
                amplitude: 8,
                waveLength: '80%',
                phase: 0,
                period: 4000,
                direction: 'right',
                waveAnimation: true,

                // 球内部背景
                backgroundStyle: {
                    color: {
                        type: 'radial',
                        x: 0.5,
                        y: 0.5,
                        r: 0.8,
                        colorStops: [
                            { offset: 0, color: '#12375a' },
                            { offset: 1, color: '#071d3f' }
                        ]
                    },
                    borderColor: '#29fcff',
                    borderWidth: 3,
                    shadowColor: '#29fcff',
                    shadowBlur: 18
                },

                // 外圈
                outline: {
                    show: true,
                    borderDistance: 6,
                    itemStyle: {
                        borderWidth: 4,
                        borderColor: '#3efcff',
                        shadowBlur: 16,
                        shadowColor: '#3efcff'
                    }
                },

                // 每一层水波的边框/阴影
                itemStyle: {
                    opacity: 0.85,
                    shadowBlur: 10,
                    shadowColor: '#00ffff'
                },

                // 中间文字
                label: {
                    position: ['50%', '42%'],
                    formatter: () => {
                        return '{name|预约量}'
                    },
                    rich: {
                        name: {
                            fontSize: 20,
                            color: '#ffffff',
                            lineHeight: 22
                        },
                        value: {
                            fontSize: 18,
                            color: '#ffffff',
                            fontWeight: 'bold',
                            lineHeight: 24
                        }
                    }
                }
            }
        ]
    })

    window.addEventListener('resize', () => {
        myChart.resize()
    })
})
</script>

<style lang="scss" scoped>
.screen-tourist {
    background: url(../../../images/dataScreen-main-lt.png) no-repeat;
    background-size: 100% 100%;
    margin-top: 10px;

    .top {
        margin-left: 20px;
        

        .title {
            color: white;
            font-size: 20px;
        }

        .bg {
            width: 68px;
            height: 7px;
            background: url(../../../images/dataScreen-title.png) no-repeat;
            background-size: 100% 100%;
            margin-top: 10px;
        }

        .num {
            color: white;
            font-size: 15px;
            float: right;

            span {
                color: #FFD700;
            }
        }
    }

    .people {
        margin-top: 10px;
        display: flex;
        justify-content: center; // 整体居中
        align-items: center;
        gap: 3px;
        padding: 0;
        width: 100%;
        padding-top: 18px;

        span {
            // flex: 0 0 60px; // 固定宽度
            width: 60px;
            height: 60px;
            line-height: 60px;

            background: url('../../../images/total.png') no-repeat center;
            background-size: 100% 100%;

            text-align: center;
            color: #29fcff;
            font-size: 30px;
            font-weight: 500;
            text-shadow: 0 0 6px rgba(41, 252, 255, 0.9);
            box-sizing: border-box;
        }
    }

    .water_ball {
        width: 100%;
        height: 250px;
        margin-top: 15px;
    }
}
</style>