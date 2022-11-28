import React, { useLayoutEffect, useRef } from 'react';
import * as am5 from '@amcharts/amcharts5';
import * as am5xy from '@amcharts/amcharts5/xy';
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated';

export const AreaChart = ({ data, item }) => {
  const seriesRef = useRef(null);
  const xAxisRef = useRef(null);

  const countries = [];
  const dataTrackingCountries = [];

  data.trackings.map((item) => countries.push(item.countryId));

  for (const i of countries) {
    if (!dataTrackingCountries.find((item) => item.country === i)) {
      dataTrackingCountries.push({
        id: dataTrackingCountries.length,
        country: i,
        trackings: 1,
      });
    } else {
      dataTrackingCountries.map((item) => item.country === i && item.trackings++);
    }
  }

  const dataTrackingFilter = dataTrackingCountries.filter(item => item.trackings > 3);

  const createdAt = data.trackings.map((item) => item.createdAt.slice(0, 4));
  const updatedAt = data.trackings.map((item) => item.updatedAt.slice(0, 4));
  const dataTrackingCreatedAt = [];
  const dataTrackingUpdatedAt = [];

  for (const i of createdAt) {
    if (!dataTrackingCreatedAt.find((item) => item.createdAt.slice(0, 4) === i)) {
      dataTrackingCreatedAt.push({
        id: dataTrackingCreatedAt.length,
        createdAt: i,
        trackings: 1,
      });
    } else {
      dataTrackingCreatedAt.map(
        (item) => item.createdAt.slice(0, 4) === i && item.trackings++,
      );
    }
  }

  for (const i of updatedAt) {
    if (!dataTrackingUpdatedAt.find((item) => item.updatedAt.slice(0, 4) === i)) {
      dataTrackingUpdatedAt.push({
        id: dataTrackingUpdatedAt.length,
        updatedAt: i,
        trackings: 1,
      });
    } else {
      dataTrackingUpdatedAt.map(
        (item) => item.updatedAt.slice(0, 4) === i && item.trackings++,
      );
    }
  }

  dataTrackingCreatedAt.sort((a, b) => a.createdAt - b.createdAt);
  dataTrackingUpdatedAt.sort((a, b) => a.updatedAt - b.updatedAt);

  let dataTracking = [];

  if (item.y === 'createdAt') {
    dataTracking = dataTrackingCreatedAt;
  } else if (item.y === 'updatedAt') {
    dataTracking = dataTrackingUpdatedAt;
  } else {
    dataTracking = dataTrackingFilter;
  }

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
    xAxisRef.current.data.setAll(dataTracking);
    seriesRef.current.data.setAll(dataTracking);
  }, [dataTracking]);

  return <div id="areachart" style={{ width: '100%', height: '85%' }}></div>;
};
