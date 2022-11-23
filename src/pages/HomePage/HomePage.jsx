import React from 'react';
import { useState } from 'react';
import { WidthProvider, Responsive } from 'react-grid-layout';
import './HomePage.scss';

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
    { id: 1, text: 1 },
    { id: 2, text: 2 },
    { id: 3, text: 3 },
    { id: 4, text: 4 },
    { id: 5, text: 5 },
  ];

  const onLayoutChange = (_layout, layouts) => {
    saveToLS('layouts', layouts);
    setLayouts(layouts);
  };

  return (
    <div>
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
                minW: 2,
                minH: 8,
              }}
            >
              <span>{item.text}</span>
            </div>
          );
        })}
      </ResponsiveReactGridLayout>
    </div>
  );
};
