import * as echarts from 'echarts';
import '../';

var chart = echarts.init(document.getElementById('main'));

chart.setOption({
  xAxis: {
      type: 'value'
  },
  yAxis: {
      type: 'value'
  },
  cursor: [
      {
          xAxisIndex: 0,
          xPosition: 3
      },
      {
          xAxisIndex: 0,
          xPosition: 4
      }
  ],
  series: [{
      data: [[0, 150], [1, 230], [2, 224], [3, 218], [4, 135], [6, 147], [7, 260], [8, 120]],
      type: 'line'
  }]
});

chart.on('click', function (params) {
    console.log(params);
});

chart.on('cursorDragStart', function (params) {
    console.log(params);
});

chart.on('cursorDragMove', function (params) {
    console.log(params);
});

chart.on('cursorDragEnd', function (params) {
    console.log(params);
});