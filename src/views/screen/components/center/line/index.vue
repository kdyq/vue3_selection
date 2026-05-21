<template>
    <div class="line-box">
        <div class="top">
            <p class="title">未来30天游客量趋势图</p>
            <p class="bg"></p>
        </div>
        <div class="line" ref="line"></div>
    </div>
</template>

<script setup lang="ts" name="screen-line">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import * as echarts from 'echarts'

const line = ref<HTMLDivElement>()
let myChart: echarts.ECharts | null = null

onMounted(() => {
    if (!line.value) return

    myChart = echarts.init(line.value)

    const xData = [
        '05/05', '05/06', '05/07', '05/08', '05/09', '05/10',
        '05/11', '05/12', '05/13', '05/14', '05/15', '05/16',
        '05/17', '05/18', '05/19', '05/20', '05/21', '05/22',
        '05/23', '05/24', '05/25', '05/26', '05/27', '05/28',
        '05/29', '05/30', '05/31', '06/01', '06/02', '06/03'
    ]

    const yData = [
        7200, 3600, 12500, 16500, 15000, 8200,
        11500, 2600, 15500, 13800, 16300, 9800,
        17800, 3100, 10000, 3000, 800, 1200,
        15800, 12010, 14500, 5200, 4800, 2300,
        16800, 3600, 7800, 3200, 6500, 17800
    ]

    const option: echarts.EChartsOption = {
        grid: {
            left: 45,
            right: 18,
            top: 20,
            bottom: 25
        },

        tooltip: {
            trigger: 'axis',
            backgroundColor: 'rgba(19, 105, 178, 0.85)',
            borderColor: '#2ec7ff',
            borderWidth: 1,
            padding: [10, 14],
            textStyle: {
                color: '#fff',
                fontSize: 15
            },
            axisPointer: {
                type: 'line',
                lineStyle: {
                    color: '#6f8fdc',
                    width: 1,
                    type: 'dashed'
                }
            },
            formatter(params: any) {
                const item = params[0]
                return `${item.axisValue} | ${item.data} 人次访问`
            }
        },

        xAxis: {
            type: 'category',
            boundaryGap: false,
            data: xData,
            axisTick: {
                show: false
            },
            axisLine: {
                show: false
            },
            axisLabel: {
                color: '#b8d8ff',
                fontSize: 15,
                interval: 1
            },
            splitLine: {
                show: false
            }
        },

        yAxis: {
            type: 'value',
            min: 0,
            max: 21000,
            interval: 3000,
            name: '访问量',
            nameTextStyle: {
                color: '#b8d8ff',
                fontSize: 12,
                padding: [0, 0, 5, -20]
            },
            axisLine: {
                show: false
            },
            axisTick: {
                show: false
            },
            axisLabel: {
                color: '#b8d8ff',
                fontSize: 15,
                formatter(value: number | string) {
                    const num = Number(value)

                    if (num >= 10000) {
                        return `${(num / 10000).toFixed(1)}w`
                    }

                    return `${num}`
                }
            },
            splitLine: {
                show: false
            }
        },

        series: [
            {
                name: '游客量',
                type: 'line',
                data: yData,
                smooth: true,
                symbol: 'none',
                lineStyle: {
                    width: 1,
                    color: '#b8a45a'
                },
                areaStyle: {
                    opacity: 1,
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                        {
                            offset: 0,
                            color: 'rgba(224, 177, 82, 0.75)'
                        },
                        {
                            offset: 0.55,
                            color: 'rgba(124, 111, 93, 0.35)'
                        },
                        {
                            offset: 1,
                            color: 'rgba(26, 46, 91, 0.08)'
                        }
                    ])
                },
                emphasis: {
                    focus: 'series',
                    itemStyle: {
                        color: '#fff',
                        borderColor: '#ffd36b',
                        borderWidth: 2
                    }
                }
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
})
</script>

<style scoped lang="scss">
.line-box {
    width: 100%;
    height: 100%;
    background: url(../../../images/dataScreen-main-cb.png) no-repeat;
    background-size: 100% 100%;

    .top {
        margin-left: 20px;
        padding-top: 6px;

        .title {
            color: white;
            font-size: 20px;
            font-weight: 700;
            margin: 0;
        }

        .bg {
            width: 68px;
            height: 7px;
            background: url(../../../images/dataScreen-title.png) no-repeat;
            background-size: 100% 100%;
            margin-top: 4px;
        }
    }

    .line {
        width: 100%;
        height: calc(100% - 48px);
    }
}
</style>