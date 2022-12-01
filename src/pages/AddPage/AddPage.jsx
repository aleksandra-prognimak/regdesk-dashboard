import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { AreaChart } from '../../components/AreaChart';
import { BarChart } from '../../components/BarChart';
import { Chart } from '../../components/Chart';
import { LineChart } from '../../components/LineChart';
import { PieChart } from '../../components/PieChart';
import { data } from '../../data/data';
import './AddPage.scss';

export const AddPage = ({ updatedChart, charts, setCharts }) => {
  const [selectedChart, setSelectedChart] = useState(null);
  const [isOpenChart, setIsOpenChart] = useState(false);
  const [isOpenValueY, setIsOpenValueY] = useState(false);
  const [isOpenValueX, setIsOpenValueX] = useState(false);
  const valuesY = ['country', 'createdAt', 'updatedAt'];
  const valuesX = ['products', 'checklists', 'trackings', 'applications'];
  const [valueY, setValueY] = useState('');
  const [valueX, setValueX] = useState('');
  const [chartName, setChartName] = useState('');
  const newNameField = useRef(null);
  const [click, setClick] = useState(false);
  const [newName, setNewName] = useState('');

  const add = () => {
    selectedChart
      && selectedChart.y.length !== 0
      && selectedChart.x.length !== 0
      && setCharts([...charts, selectedChart]);
  };

  useEffect(() => {
    if (newNameField.current) {
      newNameField.current.focus();
    }
  }, [click]);

  const handleTitleChange = (event) => {
    event.preventDefault();
    setClick(false);

    setSelectedChart(Object.assign(selectedChart, { name: newName }));
  };

  return (
    <>
      <div className="info">
        <div className="info__name">Set your Dashboard</div>
        {selectedChart
        && selectedChart.y.length !== 0
        && selectedChart.x.length !== 0
        && selectedChart.name.trim().length !== 0 ? (
            <Link to="/" className="info__link" onClick={add}>
              <div className="info__link-button">Add Widget</div>
            </Link>
          ) : (
            <div className="info__link-disabled" onClick={add}>
              <div className="info__link-button">Add Widget</div>
            </div>
          )}
      </div>

      <div className="buttons">
        <div className="button">
          <div className="button__name">CHART</div>
          <div
            className="button__add"
            onClick={() => setIsOpenChart(!isOpenChart)}
          >
            <div className="button__add-name">
              {chartName.length !== 0 ? chartName : 'Chart'}
            </div>
            <div className="button__add-icon"></div>
          </div>

          {isOpenChart && (
            <ul className="select__charts">
              <li className="select__chart">
                <div className="line-icon"></div>
                <div
                  className="chart-name"
                  onClick={() => {
                    setSelectedChart({
                      id: uuidv4(),
                      name: newName,
                      Component: LineChart,
                      x: ' ',
                      y: '',
                    });
                    setIsOpenChart(!isOpenChart);
                    setChartName('Line');
                  }}
                >
                  Line
                </div>
              </li>
              <li className="select__chart">
                <div className="area-icon"></div>
                <div
                  className="chart-name"
                  onClick={() => {
                    setSelectedChart({
                      id: uuidv4(),
                      name: newName,
                      Component: AreaChart,
                      x: ' ',
                      y: '',
                    });
                    setIsOpenChart(!isOpenChart);
                    setChartName('Area');
                  }}
                >
                  Area
                </div>
              </li>
              <li className="select__chart">
                <div className="bar-icon"></div>
                <div
                  className="chart-name"
                  onClick={() => {
                    setSelectedChart({
                      id: uuidv4(),
                      name: newName,
                      Component: BarChart,
                      x: ' ',
                      y: '',
                    });
                    setIsOpenChart(!isOpenChart);
                    setChartName('Bar');
                  }}
                >
                  Bar
                </div>
              </li>
              <li className="select__chart">
                <div className="pie-icon"></div>
                <div
                  className="chart-name"
                  onClick={() => {
                    setSelectedChart({
                      id: uuidv4(),
                      name: newName,
                      Component: PieChart,
                      x: ' ',
                      y: '',
                    });
                    setIsOpenChart(!isOpenChart);
                    setChartName('Pie');
                  }}
                >
                  Pie
                </div>
              </li>
            </ul>
          )}
        </div>

        {selectedChart && (
          <>
            <div className="button">
              <div className="button__name">VALUE</div>
              <div
                className="button__add"
                onClick={() => setIsOpenValueX(!isOpenValueX)}
              >
                <div className="button__add-name">
                  {valueX.length === 0 ? 'Value' : valueX}
                </div>
                <div className="button__add-icon"></div>
              </div>

              {isOpenValueX && (
                <ul className="select__values">
                  {valuesX.map((v) => (
                    <li
                      key={v}
                      onClick={() => {
                        setValueX(v);
                        setIsOpenValueX(!isOpenValueX);
                        setSelectedChart(
                          Object.assign(selectedChart, { x: v }),
                        );
                      }}
                      className="select__value"
                    >
                      {v}
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <div className="button">
              <div className="button__name">VALUE</div>
              <div
                className="button__add"
                onClick={() => setIsOpenValueY(!isOpenValueY)}
              >
                <div className="button__add-name">
                  {valueY.length === 0 ? 'Value' : valueY}
                </div>
                <div className="button__add-icon"></div>
              </div>

              {isOpenValueY && (
                <ul className="select__values">
                  {valuesY.map((v) => (
                    <li
                      key={v}
                      onClick={() => {
                        setValueY(v);
                        setIsOpenValueY(!isOpenValueY);
                        setSelectedChart(
                          Object.assign(selectedChart, { y: v }),
                        );
                      }}
                      className="select__value"
                    >
                      {v}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </>
        )}

        {selectedChart && (
          <div className="button">
            <div className="button__name">NAME</div>
            <div className="button__name-input">
              {click ? (
                <form onSubmit={handleTitleChange}>
                  <input
                    value={newName}
                    type="text"
                    ref={newNameField}
                    placeholder="Please enter a name"
                    className="input__name"
                    onChange={(event) => setNewName(event.target.value)}
                    onBlur={handleTitleChange}
                    onKeyDown={(event) => {
                      if (event.key === 'Escape') {
                        setClick(false);
                      }
                    }}
                  />
                </form>
              ) : (
                <>
                  <div
                    className="input__title"
                    onClick={() => {
                      setClick(true);
                      setNewName('');
                    }}
                    onBlur={() => setClick(false)}
                  >
                    {'Click to add name '}
                  </div>
                </>
              )}
            </div>
          </div>
        )}
      </div>

      {!selectedChart && (
        <div className="add__getStart">
          <div className="add__getStart-title">Build Your Widgets</div>
          <div className="add__getStart-subtitle">
            Choose a chart to get started
          </div>
        </div>
      )}

      {updatedChart.length !== 0
        && updatedChart.map((item) => (
          <div key={item.id} className="add__chart">
            <div className="chart">
              <div className="chart__name">{item.name}</div>
              <div className="chart-link">
                <div className="chart__button"></div>
              </div>
            </div>
            <Chart data={data} item={item} />
          </div>
        ))}

      {selectedChart && (
        <div className="add__chart">
          <div className="chart">
            <div className="chart__name">{selectedChart.name}</div>
            <div className="chart-link">
              <div className="chart__button"></div>
            </div>
          </div>
          {selectedChart.y === '' && selectedChart.x === '' && <Chart data={data} item={selectedChart} />}
          {selectedChart.y === '' && selectedChart.x === '' && (
            <Chart data={data} item={selectedChart} />
          )}
          {selectedChart.y === '' && selectedChart.x === 'products' && (
            <Chart data={data} item={selectedChart} />
          )}
          {selectedChart.y === '' && selectedChart.x === 'checklists' && (
            <Chart data={data} item={selectedChart} />
          )}
          {selectedChart.y === '' && selectedChart.x === 'trackings' && (
            <Chart data={data} item={selectedChart} />
          )}
          {selectedChart.y === '' && selectedChart.x === 'applications' && (
            <Chart data={data} item={selectedChart} />
          )}
          {selectedChart.y === 'country' && selectedChart.x === '' && (
            <Chart data={data} item={selectedChart} />
          )}
          {selectedChart.y === 'country' && selectedChart.x === 'products' && (
            <Chart data={data} item={selectedChart} />
          )}
          {selectedChart.y === 'country' && selectedChart.x === 'checklists' && (
            <Chart data={data} item={selectedChart} />
          )}
          {selectedChart.y === 'country' && selectedChart.x === 'trackings' && (
            <Chart data={data} item={selectedChart} />
          )}
          {selectedChart.y === 'country' && selectedChart.x === 'applications' && (
            <Chart data={data} item={selectedChart} />
          )}
          {selectedChart.y === 'createdAt' && selectedChart.x === '' && (
            <Chart data={data} item={selectedChart} />
          )}
          {selectedChart.y === 'createdAt' && selectedChart.x === 'products' && (
            <Chart data={data} item={selectedChart} />
          )}
          {selectedChart.y === 'createdAt' && selectedChart.x === 'checklists' && (
            <Chart data={data} item={selectedChart} />
          )}
          {selectedChart.y === 'createdAt' && selectedChart.x === 'trackings' && (
            <Chart data={data} item={selectedChart} />
          )}
          {selectedChart.y === 'createdAt' && selectedChart.x === 'applications' && (
            <Chart data={data} item={selectedChart} />
          )}
          {selectedChart.y === 'updatedAt' && selectedChart.x === '' && (
            <Chart data={data} item={selectedChart} />
          )}
          {selectedChart.y === 'updatedAt' && selectedChart.x === 'products' && (
            <Chart data={data} item={selectedChart} />
          )}
          {selectedChart.y === 'updatedAt' && selectedChart.x === 'checklists' && (
            <Chart data={data} item={selectedChart} />
          )}
          {selectedChart.y === 'updatedAt' && selectedChart.x === 'trackings' && (
            <Chart data={data} item={selectedChart} />
          )}
          {selectedChart.y === 'updatedAt' && selectedChart.x === 'applications' && (
            <Chart data={data} item={selectedChart} />
          )}
        </div>
      )}
    </>
  );
};