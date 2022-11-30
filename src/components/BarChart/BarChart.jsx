import React, { useLayoutEffect, useRef } from 'react';
import * as am5 from '@amcharts/amcharts5';
import * as am5xy from '@amcharts/amcharts5/xy';
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated';
import { v4 as uuidv4 } from 'uuid';
import { getFlag } from '../../utils/getFlag';

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
        icon: getFlag(i),
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

  const id = uuidv4();

  useLayoutEffect(() => {
    const root = am5.Root.new(id);

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
      am5xy.CategoryAxis.new(root, item.y === 'country' ? {
        renderer: am5xy.AxisRendererX.new(root, { minGridDistance: 20 }),
        categoryField: item.y,
        bullet: function (root, axis, dataItem) {
          return am5xy.AxisBullet.new(root, {
            location: 0.5,
            sprite: am5.Picture.new(root, {
              width: 20,
              height: 20,
              centerY: am5.p50,
              centerX: am5.p50,
              src: dataItem.dataContext.icon
            })
          });
        }
      } : {
        renderer: am5xy.AxisRendererX.new(root, { minGridDistance: 20 }),
        categoryField: item.y,
      }),
    );

    xAxis.get("renderer").labels.template.setAll({
      paddingTop: 14
    });

    xAxis.data.setAll([
      {
        category: item.y,
      },
    ]);

    const series = chart.series.push(
      am5xy.ColumnSeries.new(root, {
        name: item.x,
        xAxis,
        yAxis,
        valueYField: item.x,
        categoryXField: item.y,
        fill: am5.color(0xf8c33a),
        tooltip: am5.Tooltip.new(root, {
          labelText: '{categoryX}: {valueY}',
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

  return <div id={id} style={{ width: '100%', height: '85%' }}></div>;
};
