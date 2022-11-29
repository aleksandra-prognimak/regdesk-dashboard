import React, { useLayoutEffect } from 'react';
import * as am5 from '@amcharts/amcharts5';
import * as am5percent from '@amcharts/amcharts5/percent';
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated';
import { v4 as uuidv4 } from 'uuid';

export const PieChart = ({ data, item }) => {
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

  const dataFilterProducts = dataProducts.filter((item) => item.products > 6);

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

  const id = uuidv4();

  useLayoutEffect(() => {
    const root = am5.Root.new(id);

    root._logo.dispose();

    root.setThemes([am5themes_Animated.new(root)]);

    const chart = root.container.children.push(
      am5percent.PieChart.new(root, {
        layout: root.verticalLayout,
        radius: am5.percent(160),
        x: am5.percent(10),
        y: am5.percent(25),
      }),
    );

    const series = chart.series.push(
      am5percent.PieSeries.new(root, {
        valueField: item.x,
        categoryField: item.y,
        legendValueText: '',
      }),
    );

    series
      .get('colors')
      .set('colors', [
        am5.color(0x005594),
        am5.color(0x3b8fb8),
        am5.color(0x76cadd),
        am5.color(0xacdfea),
        am5.color(0xc8e9f1),
        am5.color(0xffdc60),
        am5.color(0xf8c33a),
        am5.color(0xf49926),
        am5.color(0xf16f12),
        am5.color(0xec4719),
        am5.color(0xe71e20),
      ]);

    series.data.setAll(newDataProducts);
    series.labels.template.set('forceHidden', true);
    series.ticks.template.set('forceHidden', true);

    const legend = chart.children.push(
      am5.Legend.new(root, {
        centerY: am5.percent(30),
        y: am5.percent(10),
        layout: root.verticalLayout,
      }),
    );

    legend.data.setAll(series.dataItems);
    series.appear(2000);

    return () => {
      root.dispose();
    };
  }, []);

  return <div id={id} style={{ width: '100%', height: '80%' }}></div>;
};
