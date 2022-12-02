import React, { useState } from 'react';
import { Responsive, WidthProvider } from 'react-grid-layout';
import { Link } from 'react-router-dom';
import './HomePage.scss';
import { Chart } from '../../components/Chart';

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

export const HomePage = ({ charts, updateChart, selectedId, setSelectedId, deleteChart }) => {
  const [layouts, setLayouts] = useState(
    JSON.parse(JSON.stringify(originalLayouts)),
  );

  const onLayoutChange = (_layout, layouts) => {
    saveToLS('layouts', layouts);
    setLayouts(layouts);
  };

  const [dropdownState, setDropdownState] = useState(false);

  const handleDropdownClick = (id) => {
    setSelectedId(id);
    setDropdownState(!dropdownState);
  };

  return (
    <>
      <div className="info">
        <div className="info__name">Dashboard</div>
        <Link to="add" className="info__link" onClick={() => updateChart(null)}>
          <div className="info__link-button">Add Widget</div>
        </Link>
      </div>
      <ResponsiveReactGridLayout
        className="layout"
        rowHeight={30}
        layouts={layouts}
        onLayoutChange={(layout, layouts) => onLayoutChange(layout, layouts)}
      >
        {charts.map((item, index) => {
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

                <div className="chart-link">
                  <div
                    onClick={() => handleDropdownClick(item.id)}
                    className="chart__button" 
                  ></div>
                  <div
                    className={`dropdown-items ${
                      dropdownState && selectedId === item.id
                        ? 'isVisible'
                        : 'isHidden'
                    }`}
                  >
                    <div className="dropdown-item">
                      <Link
                        to="add"
                        className="dropdown__link"
                        onClick={() => updateChart(item.id)}
                      >
                        Update
                      </Link>
                    </div>
                    <div className="dropdown-item">
                      <div
                        className="dropdown__link"
                        onClick={() => deleteChart(item.id)}
                      >
                        Delete
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <Chart item={item} updateChart={updateChart} />
            </div>
          );
        })}
      </ResponsiveReactGridLayout>
    </>
  );
};
