import * as echarts from 'echarts';
//import * as echarts from 'echarts/lib/echarts';
var chart = echarts.init(document.getElementById('main'));
chart.setOption({
    xAxis: {
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    yAxis: {
        type: 'value'
    },
    series: [{
            data: [150, 230, 224, 218, 135, 147, 260, 120],
            type: 'line'
        }]
});
