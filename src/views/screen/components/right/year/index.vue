<template>
    <div class="screen-year">
        <div class="top">
            <p class="title">年度客流量对比</p>
            <p class="bg"></p>
        </div>
        <div class="year-line" ref="year_line"></div>
    </div>
</template>

<script setup lang="ts" name="screen-year">
import { ref, onMounted } from 'vue';
import * as echarts from 'echarts';
import { shouldShowAllLabels } from 'echarts/types/src/coord/axisHelper.js';
const year_line = ref();
onMounted(() => {
    const myChart = echarts.init(year_line.value);

    const option = {
        backgroundColor: 'transparent',

        tooltip: {
            trigger: 'axis',
            backgroundColor: 'rgba(6, 18, 55, 0.85)',
            borderColor: '#2f78ff',
            textStyle: {
                color: '#fff'
            },
            axisPointer: {
                type: 'line',
                lineStyle: {
                    color: '#4b8cff'
                }
            }
        },

        legend: {
            right: 28,
            top: 8,
            itemWidth: 18,
            itemHeight: 10,
            textStyle: {
                color: '#fff',
                fontSize: 15
            },
            data: ['2021年', '2022年', '2023年']
        },

        grid: {
            left: 48,
            right: 24,
            top: 48,
            bottom: 32
        },

        xAxis: {
            type: 'category',
            boundaryGap: false,
            data: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
            axisLine: {
                shou:false
            },
            axisTick: {
                show: false
            },
            axisLabel: {
                color: '#b8c7ff',
                fontSize: 14
            },
            splitLine: {
                show: false
            }
        },

        yAxis: {
            type: 'value',
            name: '(人数)',
            min: 0,
            max: 600,
            interval: 100,
            nameTextStyle: {
                color: '#fff',
                fontSize: 14,
                padding: [0, 0, 0, -26]
            },
            axisLine: {
                show: false
            },
            axisTick: {
                show: false
            },
            axisLabel: {
                color: '#b8c7ff',
                fontSize: 15
            },
            splitLine: {
                show:false
            }
        },

        series: [
            {
                name: '2021年',
                type: 'line',
                smooth: true,
                showSymbol: false,
                lineStyle: {
                    width: 2,
                    color: '#f6a21a'
                },
                areaStyle: {
                    opacity: 0.55,
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                        { offset: 0, color: 'rgba(246, 162, 26, 0.85)' },
                        { offset: 1, color: 'rgba(246, 162, 26, 0.08)' }
                    ])
                },
                data: [180, 90, 115, 22, 35, 65, 90, 45, 35, 500, 360, 180]
            },
            {
                name: '2022年',
                type: 'line',
                smooth: true,
                showSymbol: false,
                lineStyle: {
                    width: 2,
                    color: '#1588ff'
                },
                areaStyle: {
                    opacity: 0.6,
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                        { offset: 0, color: 'rgba(21, 136, 255, 0.9)' },
                        { offset: 1, color: 'rgba(21, 136, 255, 0.08)' }
                    ])
                },
                data: [300, 500, 360, 160, 365, 85, 315, 150, 270, 45, 470, 245]
            },
            {
                name: '2023年',
                type: 'line',
                smooth: true,
                showSymbol: false,
                lineStyle: {
                    width: 2,
                    color: '#ff5ca8'
                },
                areaStyle: {
                    opacity: 0.55,
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                        { offset: 0, color: 'rgba(255, 92, 168, 0.85)' },
                        { offset: 1, color: 'rgba(255, 92, 168, 0.08)' }
                    ])
                },
                data: [420, 180, 115, 105, 80, 500, 35, 25, 28, 420, 300, 180]
            }
        ]
    };

    myChart.setOption(option);

    window.addEventListener('resize', () => {
        myChart.resize();
    });
});
</script>

<style scoped lang="scss">
.screen-year {
    width: 100%;
    height: 298px;
    background: url(../../../images/dataScreen-main-lc.png) no-repeat;
    background-size: 100% 100%;
    margin: 25px 0;

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

    .year-line {
        width: 100%;
        height: 260px;
        margin: 0 auto;
    }
}
</style>