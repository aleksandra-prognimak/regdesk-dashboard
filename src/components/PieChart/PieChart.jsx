import React, { useLayoutEffect } from 'react';
import * as am5 from '@amcharts/amcharts5';
import * as am5percent from '@amcharts/amcharts5/percent';
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated';

export const PieChart = ({ data }) => {
  const createdAt = data.products.map((item) => item.createdAt.slice(0, 4));
  const dataProducts = [];

  for (const i of createdAt) {
    if (!dataProducts.find((item) => item.createdAt.slice(0, 4) === i)) {
      dataProducts.push({
        id: dataProducts.length,
        createdAt: i,
        products: 1,
      });
    } else {
      dataProducts.map(
        (item) => item.createdAt.slice(0, 4) === i && item.products++,
      );
    }
  }

  dataProducts.sort((a, b) => a.createdAt - b.createdAt);

  useLayoutEffect(() => {
    const root = am5.Root.new('piechart');

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
        valueField: 'products',
        categoryField: 'createdAt',
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
    series.data.setAll(dataProducts);
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

  return <div id={'piechart'} style={{ width: '100%', height: '85%' }}></div>;
};
