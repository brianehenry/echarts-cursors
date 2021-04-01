import * as echarts from 'echarts';
import { CursorModel } from './cursor-model';
import { CursorView } from './cursor-view';

const install = function(registers) {
  // register cursor model and view with ECharts
  registers.registerComponentModel(CursorModel);
  registers.registerComponentView(CursorView);
}
echarts.use(install);