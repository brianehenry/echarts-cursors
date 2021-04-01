import * as echarts from 'echarts';
import * as zrender from 'zrender';
import { ComponentView } from 'echarts';
import { CursorModel } from './cursor-model';
import { getECData } from 'echarts/lib/util/innerStore';
import { ElementEvent } from 'zrender/lib/Element';
import CartesianAxisModel from 'echarts/types/src/coord/cartesian/AxisModel';

export class CursorView extends ComponentView {
  static type = 'cursor' as const;
  type = CursorView.type;

  private echartsInstance: any;
  private line: zrender.Line;
  private initialCursorPixelXPosition: number;
  private currentCursorPixelXPosition: number;
  private componentIndex: number;
  private converterFinder: { xAxisIndex?: number, yAxisIndex?: number }

  init(ecModel, api) {
    this.echartsInstance = echarts.getInstanceById(api.getId());
  }

  render(cursorModel: CursorModel, ecModel, api) {
    const cursorXPos = cursorModel.option.xPosition;
    const xAxisIndex = cursorModel.option.xAxisIndex;
    this.componentIndex = cursorModel.componentIndex;
    this.converterFinder = { xAxisIndex: xAxisIndex, yAxisIndex: 0 };

    const yAxes = ecModel.findComponents({ mainType: 'yAxis'}) as CartesianAxisModel[];
    const yAxis0Extent = yAxes[0].axis.scale.getExtent();
    
    const lineStart = this.echartsInstance.convertToPixel(this.converterFinder, [cursorXPos, yAxis0Extent[0]]);
    const lineEnd = this.echartsInstance.convertToPixel(this.converterFinder, [cursorXPos, yAxis0Extent[1]]);
    const zr = api.getZr() as any as zrender.ZRenderType;

    this.line = new zrender.Line({
      shape: {
        x1: lineStart[0],
        y1: lineStart[1],
        x2: lineEnd[0],
        y2: lineEnd[1]
      }
    });
    this.line.on('mousedown', this.onLineMouseDown);

    // Add metadata to line to get click events with "chart.on('click', ..."
    var ecData = getECData(this.line);
    ecData.eventData = {
      componentType: 'cursor',
      componentIndex: cursorModel.componentIndex
    };

    zr.add(this.line);
  }

  private onLineMouseDown = (event: ElementEvent) => {
    this.initialCursorPixelXPosition = this.currentCursorPixelXPosition = event.offsetX;
    this.echartsInstance.trigger('cursordragstart', this.getEventMetadata());

    const mousemoveListener = (event) => {
      this.echartsInstance.trigger('cursordragmove', this.getEventMetadata());

      this.currentCursorPixelXPosition = event.offsetX;
      this.line.attr('shape', {
        x1: this.currentCursorPixelXPosition,
        x2: this.currentCursorPixelXPosition
      });
    };

    const mouseupListener = () => {
      this.initialCursorPixelXPosition = this.currentCursorPixelXPosition;
      this.echartsInstance.trigger('cursordragend', this.getEventMetadata());

      document.removeEventListener('mousemove', mousemoveListener);
      document.removeEventListener('mouseup', mouseupListener);
    };

    document.addEventListener('mousemove', mousemoveListener);
    document.addEventListener('mouseup', mouseupListener);
  }

  private getEventMetadata = () => {
    const coordinateLocation = this.echartsInstance.convertFromPixel(this.converterFinder, [this.currentCursorPixelXPosition, null]);
    return {
      componentType: 'cursor',
      componentIndex: this.componentIndex,
      xLocation: this.currentCursorPixelXPosition,
      xValue: coordinateLocation[0]
    }
  }
}