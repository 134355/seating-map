<style scoped lang="scss">

</style>
<template>
    <div class="echarts">
        <div id="main" style="width: 600px;height:400px;"></div>
    </div>
</template>
<script>
    import echarts from 'echarts';
    export default {
        data() {
            return {
            }
        },
        mounted() {
            initCharts();
        },
        activated() {
            freshEcharts();
        }
    }
    var myChart
    function initCharts() {
        // 基于准备好的dom，初始化echarts实例
        myChart = echarts.init(document.getElementById('main'));
    }
    function freshEcharts(params) {
        myChart.clear()
        // 指定图表的配置项和数据
        var option = {
            title: {
                text: 'ECharts 入门示例'
            },
            tooltip: {},
            legend: {
                data: ['销量']
            },
            xAxis: {
                data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"]
            },
            yAxis: {},
            series: [{
                name: '销量',
                type: 'bar',
                data: [5, 20, 36, 10, 10, 20]
            }]
        };
        // 使用刚指定的配置项和数据显示图表。
        setTimeout(function() {
            myChart.setOption(option);
        }, 1000);

    }
</script>