<template>
    <div class="screen-counter">
        <div class="top">
            <p class="title">预约渠道统计</p>
            <p class="bg"></p>
        </div>
        <div class="counter-pie" ref="counterPie"></div>
    </div>
</template>

<script setup lang="ts" name="screen-counter">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import * as echarts from 'echarts'

const counterPie = ref<HTMLDivElement>()

let myChart: echarts.ECharts | null = null

onMounted(() => {
    if (!counterPie.value) return

    myChart = echarts.init(counterPie.value)
    const pieData = [
        { value: 40, name: '智慧农贸平台' },
        { value: 10, name: '晟盟' },
        { value: 20, name: '飞翔' },
        { value: 30, name: '其他渠道' }
    ]

    const pieCenter = ['68%', '52%']

    const option: echarts.EChartsOption = {
        backgroundColor: 'transparent',

        tooltip: {
            trigger: 'item',
            formatter: '{b}：{c}%'
        },

        color: ['#1E9BFF', '#FF914D', '#F173D3', '#FF5B6E'],

        legend: {
            orient: 'vertical',
            left: 25,
            top: '25%',
            icon: 'circle',
            itemWidth: 10,
            itemHeight: 10,
            itemGap: 17,
            textStyle: {
                color: '#fff',
                fontSize: 15
            },
            formatter: (name: string) => {
                const item = pieData.find(v => v.name === name)
                return `${name}  ---  ${item?.value ?? 0}%`
            }
        },

        series: [
            // 中间背景、虚线圆、中心图标
            {
                type: 'custom',
                coordinateSystem: 'none',
                silent: true,
                z: 1,
                renderItem: (_params: any, api: any) => {
                    const cx = api.getWidth() * 0.68
                    const cy = api.getHeight() * 0.52

                    // 控制里面图形大小和位置
                    const innerCircleR = 36
                    const iconR = 15
                    const iconOffsetX = 0
                    const iconOffsetY = 0

                    const iconCx = cx + iconOffsetX
                    const iconCy = cy + iconOffsetY

                    return {
                        type: 'group',
                        children: [
                            // 中间深色圆背景
                            {
                                type: 'circle',
                                shape: {
                                    cx,
                                    cy,
                                    r: innerCircleR
                                },
                                style: {
                                    fill: '#101C55'
                                }
                            },

                            // 中间蓝色虚线圈
                            {
                                type: 'circle',
                                shape: {
                                    cx,
                                    cy,
                                    r: innerCircleR
                                },
                                style: {
                                    fill: 'transparent',
                                    stroke: '#315BDA',
                                    lineWidth: 2,
                                    lineDash: [4, 6]
                                }
                            },

                            // 中心白色小圆
                            {
                                type: 'circle',
                                shape: {
                                    cx: iconCx,
                                    cy: iconCy,
                                    r: iconR
                                },
                                style: {
                                    fill: 'transparent',
                                    stroke: '#FFFFFF',
                                    lineWidth: 3
                                }
                            },

                            // 中心图标竖线
                            {
                                type: 'line',
                                shape: {
                                    x1: iconCx,
                                    y1: iconCy - iconR,
                                    x2: iconCx,
                                    y2: iconCy
                                },
                                style: {
                                    stroke: '#FFFFFF',
                                    lineWidth: 3,
                                    lineCap: 'round'
                                }
                            },

                            // 中心图标横线
                            {
                                type: 'line',
                                shape: {
                                    x1: iconCx,
                                    y1: iconCy,
                                    x2: iconCx + iconR,
                                    y2: iconCy
                                },
                                style: {
                                    stroke: '#FFFFFF',
                                    lineWidth: 3,
                                    lineCap: 'round'
                                }
                            }
                        ]
                    }
                },
                data: [0]
            },

            // 主环形图
            {
                name: '预约渠道',
                type: 'pie',
                center: pieCenter,
                radius: ['44%', '58%'],
                clockwise: true,
                startAngle: 90,
                avoidLabelOverlap: false,
                padAngle: 4,
                z: 2,
                label: {
                    show: false
                },
                labelLine: {
                    show: false
                },
                itemStyle: {
                    borderRadius: 8,
                    borderColor: '#08134A',
                    borderWidth: 5
                },
                data: pieData
            }
        ]
    }

    myChart.setOption(option)

    window.addEventListener('resize', resizeChart)
})

const resizeChart = () => {
    myChart?.resize()
}

onBeforeUnmount(() => {
    window.removeEventListener('resize', resizeChart)
    myChart?.dispose()
    myChart = null
})
</script>

<style scoped lang="scss">
.screen-counter {
    width: 100%;
    height: 298px;
    background: url(../../../images/dataScreen-main-rb.png) no-repeat;
    background-size: 100% 100%;

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
    }

    .counter-pie {
        width: 100%;
        height: 230px;
    }
}
</style>