//import { Outlet } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import { AddPage } from './pages/AddPage';
import { PageNotFound } from './pages/PageNotFound';
import './App.scss';
import { Header } from './components/Header';
//import { StackedBarChart } from './components/StackedBarChart';
import { PieChart } from './components/PieChart';
import { BarChart } from './components/BarChart';
import { AreaChart } from './components/AreaChart';
import { LineChart } from './components/LineChart';
import { Navigate, Route, Routes } from 'react-router-dom';
import { useState } from 'react';

export const App = () => {
  const [charts, setCharts] = useState([
    //{ id: 5, name: 'Checklists', Component: StackedBarChart },
    { id: 4, name: 'Products', Component: PieChart },
    { id: 2, name: 'Products', Component: BarChart },
    { id: 1, name: 'Trackings', Component: AreaChart },
    { id: 3, name: 'Applications', Component: LineChart },
  ]);
  const [updatedChart, setUpdatedChart] = useState([]);
  const [selectedId, setSelectedId] = useState(0);

  const updateChart = (id) =>
    setUpdatedChart(charts.filter((item) => item.id === id));

  const deleteChart = (id) =>
    setCharts(charts.filter((item) => item.id !== id));

  return (
    <div className="App">
      <Header />
      <div className="container">
        <Routes>
          <Route
            path="/"
            element={
              <HomePage
                charts={charts}
                updateChart={updateChart}
                selectedId={selectedId}
                setSelectedId={setSelectedId}
                deleteChart={deleteChart}
              />
            }
          />
          <Route path="home" element={<Navigate to="/" replace />} />
          <Route path="add" element={<AddPage charts={updatedChart} setCharts={setCharts} />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </div>
    </div>
  );
};
