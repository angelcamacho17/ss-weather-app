import React from 'react';
import { Group } from '@vx/group';
import { Bar } from '@vx/shape';
import { scaleLinear, scaleBand } from '@vx/scale';
import { AxisLeft, AxisBottom } from '@vx/axis';
import { Text } from '@vx/text';
import PropTypes from 'prop-types';

// Finally we'll embed it all in an SVG
function BarGraph(props) {
  const { percentage, width, height } = props;
  const data_raw = JSON.parse(JSON.stringify(props.data));

  // Need to do some counting if percentage graphs are requested
  let data = [];
  let percentSymbol = percentage ? '%' : '';
  data = data_raw;

  // Define the graph dimensions and margins
  const margin = { top: 20, bottom: 20, left: 40, right: 40 };

  // Then we'll create some bounds
  const xMax = width - margin.left - margin.right;
  const yMax = height - margin.top - margin.bottom;

  // We'll make some helpers to get at the data we want
  const x = d => d.dt_txt.split(" ")[1];
  const y = d => d.main.temp;

  // Given the max on the y-bar, figure out how much "top margin" we should add
  const yMargin = max => {
    return Math.sqrt(max);
  };

  // And then scale the graph by our data
  const xScale = scaleBand({
    rangeRound: [0, xMax],
    domain: data.map(x),
    padding: 0.4
  });

  const yDomainMax = Math.max(...data.map(y));

  const yScale = scaleLinear({
    rangeRound: [yMax, 0],
    domain: [0, yDomainMax + yMargin(yDomainMax)]
  });

  // Compose together the scale and accessor functions to get point functions
  const compose = (scale, accessor) => data => scale(accessor(data));
  const xPoint = compose(
    xScale,
    x
  );
  const yPoint = compose(
    yScale,
    y
  );

  return (
    <svg width={width} height={height}>
      {data.map((d, i) => {
        const barHeight = yMax - yPoint(d);
        return (
          <Group key={`bar-${i}`}>
            <Bar
              x={xPoint(d) + 60}
              y={yMax - barHeight}
              height={barHeight}
              width={xScale.bandwidth()}
              fill="#3399F3"
            />
            <AxisLeft
              scale={yScale}
              top={0}
              left={60}
              hideZero
              label={'Temperature'}
              stroke={'#1b1a1e'}
              tickTextFill={'#1b1a1e'}
              numTicks={5}
              axisClassName="leftAxis"
            />
            <AxisBottom
              scale={xScale}
              top={yMax}
              left={60}
              hideZero
              label={'Hours'}
              stroke={'#1b1a1e'}
              tickTextFill={'#1b1a1e'}
              axisClassName="rightAxis"
            />
            <Text
              x={xPoint(d) + 60 + xScale.bandwidth() / 2 - 5}
              y={yMax - barHeight - 5}
            >{`${d.main.temp} °C`}</Text>
          </Group>
        );
      })}
    </svg>
  );
}

BarGraph.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      dt_txt: PropTypes.string,
      main:{
        temp: PropTypes.number
      } 
    })
  ).isRequired,
  percentage: PropTypes.bool,
  width: PropTypes.number,
  height: PropTypes.number
};

BarGraph.defaultProps = {
  percentage: false,
  width: 600,
  height: 300
};

export default BarGraph;
