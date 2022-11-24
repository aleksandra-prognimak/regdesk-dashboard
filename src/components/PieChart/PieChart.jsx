import React, { useLayoutEffect } from 'react';
import * as am5 from '@amcharts/amcharts5';
import * as am5percent from '@amcharts/amcharts5/percent';
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated';

const getSum = (city, d) => {
  const findCity = d.find((item) => item.name === city);

  return findCity.kindergartens + findCity.schools + findCity.universities;
};

export const PieChart = ({ data }) => {
  const newData = [
    { name: 'Kyiv', value: getSum('Kyiv', data) },
    { name: 'Kharkiv', value: getSum('Kharkiv', data) },
    { name: 'Odessa', value: getSum('Odessa', data) },
  ];

  useLayoutEffect(() => {
    const root = am5.Root.new('piechart');

    root._logo.dispose();

    root.setThemes([am5themes_Animated.new(root)]);

    const chart = root.container.children.push(
      am5percent.PieChart.new(root, {
        layout: root.verticalLayout,
        radius: am5.percent(50),
        y: am5.percent(-15),
      }),
    );

    const series = chart.series.push(
      am5percent.PieSeries.new(root, {
        valueField: 'value',
        categoryField: 'name',
        legendLabelText: '[{fill}]{category}[/]',
        legendValueText: '[bold {fill}]{value}[/]',
      }),
    );

    series.data.setAll(newData);
    series.labels.template.set('forceHidden', true);
    series.ticks.template.set('forceHidden', true);
    series.set("colors", [
      am5.color(0x005594), // поки що не працює
      am5.color(0x3b8fb8),
      am5.color(0x76cadd)
    ]);

    const legend = chart.children.push(
      am5.Legend.new(root, {
        centerY: am5.percent(30),
        y: am5.percent(60),
        layout: root.verticalLayout,
      }),
    );

    legend.data.setAll(series.dataItems);
    series.appear(2000);

    return () => {
      root.dispose();
    };
  }, []);

  return <div id={'piechart'} style={{ width: '100%', height: '400px' }}></div>;
};
