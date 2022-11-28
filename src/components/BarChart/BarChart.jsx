import React, { useLayoutEffect, useRef } from 'react';
import * as am5 from '@amcharts/amcharts5';
import * as am5xy from '@amcharts/amcharts5/xy';
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated';

export const BarChart = ({ data, item }) => {
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

  const createdAt = data.products.map((item) => item.createdAt.slice(0, 4));
  const updatedAt = data.products.map((item) => item.updatedAt.slice(0, 4));
  const dataProductsCreatedAt = [];
  const dataProductsUpdatedAt = [];

  for (const i of createdAt) {
    if (!dataProductsCreatedAt.find((item) => item.createdAt.slice(0, 4) === i)) {
      dataProductsCreatedAt.push({
        id: dataProductsCreatedAt.length,
        createdAt: i,
        products: 1,
      });
    } else {
      dataProductsCreatedAt.map(
        (item) => item.createdAt.slice(0, 4) === i && item.products++,
      );
    }
  }

  for (const i of updatedAt) {
    if (!dataProductsUpdatedAt.find((item) => item.updatedAt.slice(0, 4) === i)) {
      dataProductsUpdatedAt.push({
        id: dataProductsUpdatedAt.length,
        updatedAt: i,
        products: 1,
      });
    } else {
      dataProductsUpdatedAt.map(
        (item) => item.updatedAt.slice(0, 4) === i && item.products++,
      );
    }
  }

  dataProductsCreatedAt.sort((a, b) => a.createdAt - b.createdAt);
  dataProductsUpdatedAt.sort((a, b) => a.updatedAt - b.updatedAt);
  let newDataProducts = [];

  if (item.y === 'createdAt') {
    newDataProducts = dataProductsCreatedAt;
  } else if (item.y === 'updatedAt') {
    newDataProducts = dataProductsUpdatedAt;
  } else {
    newDataProducts = dataFilterProducts;
  }

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
        categoryField: item.y,
      }),
    );

    xAxis.data.setAll([
      {
        category: item.y,
      },
    ]);

    const series = chart.series.push(
      am5xy.ColumnSeries.new(root, {
        name: item.name,
        xAxis,
        yAxis,
        valueYField: item.x,
        categoryXField: item.y,
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
    xAxisRef.current.data.setAll(newDataProducts);
    seriesRef.current.data.setAll(newDataProducts);
  }, [newDataProducts]);

  return <div id="barchart" style={{ width: '100%', height: '85%' }}></div>;
};
