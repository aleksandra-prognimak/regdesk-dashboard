import React, { useLayoutEffect } from 'react';
import * as am5 from '@amcharts/amcharts5';
import * as am5percent from '@amcharts/amcharts5/percent';
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated';
import { v4 as uuidv4 } from 'uuid';
import { getData } from '../../utils/getData';

export const PieChart = ({ item }) => {
  const data = getData(item);

  const id = uuidv4();

  useLayoutEffect(() => {
    const root = am5.Root.new(id);

    root._logo.dispose();

    root.setThemes([am5themes_Animated.new(root)]);

    const chart = root.container.children.push(
      am5percent.PieChart.new(root, {
        radius: 90,
        x: 40,
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

    series.data.setAll(data);
    series.labels.template.set('forceHidden', true);
    series.ticks.template.set('forceHidden', true);

    const legend = chart.children.push(
      am5.Legend.new(root, {
        centerY: am5.percent(50),
        y: am5.percent(50),
        x: -10,
        layout: root.verticalLayout,
        height: am5.percent(70),
        width: 100,
        verticalScrollbar: am5.Scrollbar.new(root, {
          orientation: 'vertical',
          width: 1,
        }),
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
