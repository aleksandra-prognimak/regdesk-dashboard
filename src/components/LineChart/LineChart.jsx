import React, { useLayoutEffect, useRef } from 'react';
import * as am5 from '@amcharts/amcharts5';
import * as am5xy from '@amcharts/amcharts5/xy';
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated';

export const LineChart = ({ data, item }) => {
  const seriesRef = useRef(null);
  const xAxisRef = useRef(null);

  const countries = [];
  const dataApplicationsCountries = [];

  data.applications.map((item) => countries.push(item.country));

  for (const i of countries) {
    if (!dataApplicationsCountries.find((item) => item.country === i)) {
      dataApplicationsCountries.push({
        id: dataApplicationsCountries.length,
        country: i,
        applications: 1,
      });
    } else {
      dataApplicationsCountries.map((item) => item.country === i && item.applications++);
    }
  }

  const dataApplicationsFilter = dataApplicationsCountries.filter(item => item.applications > 3);

  const createdAt = data.applications.map((item) => item.createdAt.slice(0, 4));
  const updatedAt = data.applications.map((item) => item.updatedAt.slice(0, 4));
  const dataApplicationsCreatedAt = [];
  const dataApplicationsUpdatedAt = [];

  for (const i of createdAt) {
    if (!dataApplicationsCreatedAt.find((item) => item.createdAt.slice(0, 4) === i)) {
      dataApplicationsCreatedAt.push({
        id: dataApplicationsCreatedAt.length,
        createdAt: i,
        applications: 1,
      });
    } else {
      dataApplicationsCreatedAt.map(
        (item) => item.createdAt.slice(0, 4) === i && item.applications++,
      );
    }
  }

  for (const i of updatedAt) {
    if (!dataApplicationsUpdatedAt.find((item) => item.updatedAt.slice(0, 4) === i)) {
      dataApplicationsUpdatedAt.push({
        id: dataApplicationsUpdatedAt.length,
        updatedAt: i,
        applications: 1,
      });
    } else {
      dataApplicationsUpdatedAt.map(
        (item) => item.updatedAt.slice(0, 4) === i && item.applications++,
      );
    }
  }

  dataApplicationsCreatedAt.sort((a, b) => a.createdAt - b.createdAt);
  dataApplicationsUpdatedAt.sort((a, b) => a.updatedAt - b.updatedAt);

  let dataApplications = [];

  if (item.y === 'createdAt') {
    dataApplications = dataApplicationsCreatedAt;
  } else if (item.y === 'updatedAt') {
    dataApplications = dataApplicationsUpdatedAt;
  } else {
    dataApplications = dataApplicationsFilter;
  }

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
        categoryField: item.y,
      }),
    );

    xAxis.data.setAll([
      {
        category: item.y,
      },
    ]);

    const series = chart.series.push(
      am5xy.LineSeries.new(root, {
        name: item.name,
        xAxis,
        yAxis,
        valueYField: item.x,
        categoryXField: item.y,
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
    xAxisRef.current.data.setAll(dataApplications);
    seriesRef.current.data.setAll(dataApplications);
  }, [dataApplications]);

  return <div id="linechart" style={{ width: '100%', height: '85%' }}></div>;
};
