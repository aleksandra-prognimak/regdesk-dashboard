import { Link } from 'react-router-dom';
import { Chart } from '../../components/Chart';
import { data } from '../../data/data';
import './AddPage.scss';

export const AddPage = ({ charts }) => {
  return (
    <>
      <div className="info">
        <div className="info__name">Set your Dashboard</div>
        <Link to="/" className="info__link">
          <div className="info__link-button">Add Widget</div>
        </Link>
      </div>

      <div className="buttons">
        <div className="button">
          <div className="button__name">MEASURES</div>
          <div className="button__add">
            <div className="button__add-name">Measures</div>
            <div className="button__add-icon"></div>
          </div>
        </div>
        <div className="button">
          <div className="button__name">DIMENSIONS</div>
          <div className="button__add">
            <div className="button__add-name">Dimensions</div>
            <div className="button__add-icon"></div>
          </div>
        </div>
        <div className="button">
          <div className="button__name">SEGMENTS</div>
          <div className="button__add">
            <div className="button__add-name">Segments</div>
            <div className="button__add-icon"></div>
          </div>
        </div>
        <div className="button">
          <div className="button__name">TIME</div>
          <div className="button__add">
            <div className="button__add-name">Time</div>
            <div className="button__add-icon"></div>
          </div>
        </div>
      </div>

      {charts.map((item) => (
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
    </>
  );
};
