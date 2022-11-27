import React, { useLayoutEffect, useRef } from 'react';
import * as am5 from '@amcharts/amcharts5';
import * as am5xy from '@amcharts/amcharts5/xy';
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated';

export const AreaChart = ({ data }) => {
  const seriesRef = useRef(null);
  const xAxisRef = useRef(null);

  const createdAt = data.trackings.map((item) => item.createdAt.slice(0, 4));
  const updatedAt = data.trackings.map((item) => item.updatedAt.slice(0, 4));
  const dataProductsCreated = [];
  const dataProductsUpdated = [];

  for (const i of createdAt) {
    if (!dataProductsCreated.find((item) => item.createdAt.slice(0, 4) === i)) {
      dataProductsCreated.push({
        id: dataProductsCreated.length,
        createdAt: i,
        trackings: 1,
      });
    } else {
      dataProductsCreated.map(
        (item) => item.createdAt.slice(0, 4) === i && item.trackings++,
      );
    }
  }

  for (const i of updatedAt) {
    if (!dataProductsUpdated.find((item) => item.updatedAt.slice(0, 4) === i)) {
      dataProductsUpdated.push({
        id: dataProductsUpdated.length,
        updatedAt: i,
        trackings: 1,
      });
    } else {
      dataProductsUpdated.map(
        (item) => item.updatedAt.slice(0, 4) === i && item.trackings++,
      );
    }
  }

  dataProductsCreated.sort((a, b) => a.createdAt - b.createdAt);
  dataProductsUpdated.sort((a, b) => a.updatedAt - b.updatedAt);

  useLayoutEffect(() => {
    const root = am5.Root.new('areachart');

    root._logo.dispose();

    root.setThemes([am5themes_Animated.new(root)]);

    const chart = root.container.children.push(
      am5xy.XYChart.new(root, {
        panY: false,
        layout: root.verticalLayout,
      }),
    );

    const yAxis = chart.yAxes.push(
      am5xy.ValueAxis.new(root, {
        renderer: am5xy.AxisRendererY.new(root, {}),
      }),
    );

    const xAxis = chart.xAxes.push(
      am5xy.CategoryAxis.new(root, {
        renderer: am5xy.AxisRendererX.new(root, { minGridDistance: 20 }),
        categoryField: 'updatedAt',
      }),
    );

    xAxis.data.setAll([
      {
        category: 'updatedAt',
      },
    ]);

    const series = chart.series.push(
      am5xy.LineSeries.new(root, {
        name: 'Trackings',
        xAxis,
        yAxis,
        valueYField: 'trackings',
        categoryXField: 'updatedAt',
        stroke: am5.color(0x76cadd),
        fill: am5.color(0x76cadd),
        tooltip: am5.Tooltip.new(root, {
          labelText: '{name}[/]\n{valueX} {valueY}',
        }),
      }),
    );

    series.fills.template.setAll({
      fillOpacity: 0.5,
      visible: true,
    });

    const legend = chart.children.push(am5.Legend.new(root, {}));

    legend.data.setAll(chart.series.values);

    chart.set('cursor', am5xy.XYCursor.new(root, {}));

    xAxisRef.current = xAxis;
    seriesRef.current = series;
    series.appear(2000);

    return () => {
      root.dispose();
    };
  }, []);

  useLayoutEffect(() => {
    xAxisRef.current.data.setAll(dataProductsUpdated);
    seriesRef.current.data.setAll(dataProductsUpdated);
  }, [dataProductsUpdated]);

  return <div id="areachart" style={{ width: '100%', height: '85%' }}></div>;
};
