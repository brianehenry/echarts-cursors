import * as echarts from 'echarts';
import * as zrender from 'zrender';
import { getECData } from 'echarts/lib/util/innerStore';
import { CursorModel } from './cursor-model';

echarts.registerPostInit((chart) => {
  const clickHandler = 
  chart.getDom().addEventListener('click', (event: MouseEvent) => {

  });
});


echarts.registerPostUpdate(function(ecModel, api) {

  debugger;

  const cursorXPos = 3;

  const instance = echarts.getInstanceById(api.getId());
  const xAxes = ecModel.findComponents({ mainType: 'xAxis'}) as any[];
  const xAxis0Extent = xAxes[0].axis.scale.getExtent();
  const yAxes = ecModel.findComponents({ mainType: 'yAxis'}) as any[];
  const yAxis0Extent = yAxes[0].axis.scale.getExtent();
  
  const lineStart = instance.convertToPixel({ xAxisIndex: 0, yAxisIndex: 0 }, [cursorXPos, yAxis0Extent[0]]);
  const lineEnd = instance.convertToPixel({ xAxisIndex: 0, yAxisIndex: 0 }, [cursorXPos, yAxis0Extent[1]]);
  const zr = api.getZr() as any as zrender.ZRenderType;
  // const width = zr.getWidth();
  // const height = zr.getHeight();
  const model = new CursorModel({
    xAxisIndex: 0,
    yAxisIndex: 0,
    xPosition: cursorXPos
  }, ecModel, ecModel);

  const line = new zrender.Line({
    shape: {
      x1: lineStart[0],
      y1: lineStart[1],
      x2: lineEnd[0],
      y2: lineEnd[1]
    }
  });
  addEventHandlers(line, lineStart[0]);

  var ecData = getECData(line);
  ecData.eventData = {
    test: 'test'
  }

  zr.add(line);

});

const addEventHandlers = (line: zrender.Line, initialLineXPosition: number) => {
  let initialDragXPosition: number; // I think this is relative to the document?
  let currentLineXPosition = initialLineXPosition;

  line.on('mousedown', (event) => {
    initialDragXPosition = event.offsetX;
    console.log('drag start');

    const mousemoveListener = (event) => {
      const dragOffset = event.offsetX - initialDragXPosition
      console.log('current offset: ' + dragOffset);

      currentLineXPosition = initialLineXPosition + dragOffset;
      line.attr('shape', {
        x1: currentLineXPosition,
        x2: currentLineXPosition
      });
    };

    const mouseupListener = () => {
      initialLineXPosition = currentLineXPosition;
      console.log('drag end');
      document.removeEventListener('mousemove', mousemoveListener);
      document.removeEventListener('mouseup', mouseupListener);
    };

    document.addEventListener('mousemove', mousemoveListener);
    document.addEventListener('mouseup', mouseupListener);
  });

}