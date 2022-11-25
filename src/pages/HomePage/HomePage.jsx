import React, { useState } from 'react';
import { Responsive, WidthProvider } from 'react-grid-layout';
import { data } from '../../data/data';
import { AreaChart } from '../../components/AreaChart';
import { Link } from 'react-router-dom';
import { BarChart } from '../../components/BarChart';
import { PieChart } from '../../components/PieChart';
import './HomePage.scss';
import { LineChart } from '../../components/LineChart';
import { StackedBarChart } from '../../components/StackedBarChart/StackedBarChart';

const ResponsiveReactGridLayout = WidthProvider(Responsive);

const getFromLS = (key) => {
  let ls = {};

  if (window.localStorage) {
    try {
      ls = JSON.parse(window.localStorage.getItem('rgl-8')) || {};
    } catch (e) {
      /*Ignore*/
    }
  }

  return ls[key];
};

const saveToLS = (key, value) => {
  if (window.localStorage) {
    window.localStorage.setItem(
      'rgl-8',
      JSON.stringify({
        [key]: value,
      }),
    );
  }
};

const originalLayouts = getFromLS('layouts') || {};

export const HomePage = () => {
  const [layouts, setLayouts] = useState(
    JSON.parse(JSON.stringify(originalLayouts)),
  );

  const arr = [
    { id: 5, name: 'Trackings', Component: StackedBarChart },
    { id: 4, name: 'Products', Component: PieChart },
    { id: 2, name: 'Products', Component: BarChart },
    { id: 1, name: 'Checklists', Component: AreaChart },
    { id: 3, name: 'Applications', Component: LineChart },
  ];

  const onLayoutChange = (_layout, layouts) => {
    saveToLS('layouts', layouts);
    setLayouts(layouts);
  };

  const reset = () => setLayouts({});

  return (
    <>
      <div className="info">
        <div className="info__name">Dashboard</div>
        <Link to="add" className="info__link">
          <div className="info__link-button">Add Widget</div>
        </Link>
      </div>
      <button onClick={reset}>reset</button>
      <ResponsiveReactGridLayout
        className="layout"
        rowHeight={30}
        layouts={layouts}
        onLayoutChange={(layout, layouts) => onLayoutChange(layout, layouts)}
      >
        {arr.map((item, index) => {
          return (
            <div
              key={item.id}
              data-grid={{
                w: 4,
                h: 8,
                x: (index % 3) * 4,
                y: Math.floor(index / 3),
                minW: 4,
                minH: 8,
              }}
            >
              <div className="chart">
                <div className="chart__name">{item.name}</div>
                <Link to="add" className="chart-link">
                  <div className="chart__button"></div>
                </Link>
              </div>
              <item.Component data={data} />
            </div>
          );
        })}
      </ResponsiveReactGridLayout>
    </>
  );
};
