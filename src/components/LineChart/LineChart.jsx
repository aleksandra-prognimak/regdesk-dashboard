import React, { useLayoutEffect, useRef } from 'react';
import * as am5 from '@amcharts/amcharts5';
import * as am5xy from '@amcharts/amcharts5/xy';
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated';

export const LineChart = ({ data }) => {
  const seriesRef = useRef(null);
  const xAxisRef = useRef(null);

  const countries = [];
  const dataApCountries = [];

  data.applications.map((item) => countries.push(item.country));

  for (const i of countries) {
    if (!dataApCountries.find((item) => item.country === i)) {
      dataApCountries.push({
        id: dataApCountries.length,
        country: i,
        applications: 1,
      });
    } else {
      dataApCountries.map((item) => item.country === i && item.applications++);
    }
  }

  const dataApFilter = dataApCountries.filter(item => item.applications > 3);

  useLayoutEffect(() => {
    const root = am5.Root.new('linechart');

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
        categoryField: 'country',
      }),
    );

    xAxis.data.setAll([
      {
        category: 'country',
      },
    ]);

    const series = chart.series.push(
      am5xy.LineSeries.new(root, {
        name: 'Applications',
        xAxis,
        yAxis,
        valueYField: 'applications',
        categoryXField: 'country',
        stroke: am5.color(0xf16f12),
        tooltip: am5.Tooltip.new(root, {
          labelText: '{name}:[/]\n{valueX} {valueY}',
        }),
      }),
    );

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
    xAxisRef.current.data.setAll(dataApFilter);
    seriesRef.current.data.setAll(dataApFilter);
  }, [dataApFilter]);

  return <div id="linechart" style={{ width: '100%', height: '85%' }}></div>;
};
