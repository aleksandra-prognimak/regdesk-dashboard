import React, { useLayoutEffect, useRef } from 'react';
import * as am5 from '@amcharts/amcharts5';
import * as am5xy from '@amcharts/amcharts5/xy';
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated';

export const StackedBarChart = ({ data }) => {
  const series1Ref = useRef(null);
  const series2Ref = useRef(null);
  const xAxisRef = useRef(null);

  const dataCLCountries = [];

  for (const i of data.checklists) {
    if (!dataCLCountries.find((item) => item.country === i.countryId)) {
      dataCLCountries.push({
        id: dataCLCountries.length,
        country: i.countryId,
        preparing: i.status === 'Preparing' ? 1 : 0,
        inProgress: i.status === 'inProgress' ? 1 : 0,
        approved: i.status === 'Approved' ? 1 : 0,
      });
    } else {
      dataCLCountries.map((item) => {
        if (i.countryId === item.country) {
          if (i.status === 'Preparing') {
            item.preparing++;
          }

          if (i.status === 'inProgress') {
            item.inProgress++;
          }

          if (i.status === 'Approved') {
            item.approved++;
          }
        }
      });
    }
  }

  const dataChecklists = dataCLCountries.filter(
    (item) => item.preparing > 4 || item.inProgress > 4 || item.approved > 4,
  );

  useLayoutEffect(() => {
    const root = am5.Root.new('stackedbarchart');

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
        renderer: am5xy.AxisRendererX.new(root, {}),
        categoryField: 'country',
      }),
    );

    xAxis.data.setAll([
      {
        category: 'country',
      },
    ]);

    const series1 = chart.series.push(
      am5xy.ColumnSeries.new(root, {
        name: 'In progress',
        xAxis,
        yAxis,
        valueYField: 'inProgress',
        categoryXField: 'country',
        fill: am5.color(0x76cadd),
        tooltip: am5.Tooltip.new(root, {
          labelText: '{name}[/]\n{valueX} {valueY}',
        }),
      }),
    );

    const series2 = chart.series.push(
      am5xy.ColumnSeries.new(root, {
        name: 'Approved',
        xAxis,
        yAxis,
        valueYField: 'approved',
        categoryXField: 'country',
        fill: am5.color(0x3b8fb8),
        tooltip: am5.Tooltip.new(root, {
          labelText: '{name}[/]\n{valueX} {valueY}',
        }),
      }),
    );

    const legend = chart.children.push(am5.Legend.new(root, {}));

    legend.data.setAll(chart.series.values);

    chart.set('cursor', am5xy.XYCursor.new(root, {}));

    xAxisRef.current = xAxis;
    series1Ref.current = series1;
    series2Ref.current = series2;
    series1.appear(2000);
    series2.appear(2000);

    return () => {
      root.dispose();
    };
  }, []);

  useLayoutEffect(() => {
    xAxisRef.current.data.setAll(dataChecklists);
    series1Ref.current.data.setAll(dataChecklists);
    series2Ref.current.data.setAll(dataChecklists);
  }, [dataChecklists]);

  return (
    <div id="stackedbarchart" style={{ width: '100%', height: '85%' }}></div>
  );
};
