import { ComponentModel } from 'echarts';
import { ComponentOption } from 'echarts/types/src/util/types';

export interface CursorOption extends ComponentOption {
  mainType?: 'cursor';
  
  xAxisIndex?: number;
  xPosition?: number;
}

export class CursorModel extends ComponentModel<CursorOption> {
  static type: string = 'cursor';

  cursor: any;
}

export default CursorModel;