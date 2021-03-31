import * as echarts from 'echarts';
//import * as echarts from 'echarts/lib/echarts';
import '../src/cursors-plugin';

var chart = echarts.init(document.getElementById('main'));

chart.setOption({
  xAxis: {
      type: 'value'
  },
  yAxis: {
      type: 'value'
  },
  series: [{
      data: [[0, 150], [1, 230], [2, 224], [3, 218], [4, 135], [6, 147], [7, 260], [8, 120]],
      type: 'line'
  }]
});

chart.on('click', function (params) {
    console.log(params);
});