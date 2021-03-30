import * as echarts from 'echarts';

echarts.registerAction({
  type: 'asdfTest',
  event: 'asdfTest',
  update: 'updateLayout'
}, function(payload, ecModel) {
  debugger;
});