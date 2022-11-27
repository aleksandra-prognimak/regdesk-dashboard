import React, { useLayoutEffect, useRef } from 'react';
import * as am5 from '@amcharts/amcharts5';
import * as am5xy from '@amcharts/amcharts5/xy';
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated';

export const BarChart = ({ data }) => {
  const seriesRef = useRef(null);
  const xAxisRef = useRef(null);

  const dataFilter = data.products.filter(
    (item) =>
      item.sku
      && item.sku.length > 0
      && item.sku[0].countries
      && item.sku[0].countries.length > 0,
  );

  const countries = [];
  const dataProducts = [];

  for (const i of dataFilter) {
    for (const j of i.sku[0].countries) {
      countries.push(j);
    }
  }

  for (const i of countries) {
    if (!dataProducts.find((item) => item.country === i)) {
      dataProducts.push({
        id: dataProducts.length,
        country: i,
        products: 1,
      });
    } else {
      dataProducts.map((item) => item.country === i && item.products++);
    }
  }

  const dataFilterProducts = dataProducts.filter((item) => item.products > 4);

  useLayoutEffect(() => {
    const root = am5.Root.new('barchart');

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
      am5xy.ColumnSeries.new(root, {
        name: 'Products',
        xAxis,
        yAxis,
        valueYField: 'products',
        categoryXField: 'country',
        fill: am5.color(0xf8c33a),
        tooltip: am5.Tooltip.new(root, {
          labelText: '{name}[/]\n{valueX} {valueY}',
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
    xAxisRef.current.data.setAll(dataFilterProducts);
    seriesRef.current.data.setAll(dataFilterProducts);
  }, [dataFilterProducts]);

  return <div id="barchart" style={{ width: '100%', height: '85%' }}></div>;
};
