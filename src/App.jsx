import { HomePage } from './pages/HomePage';
import { AddPage } from './pages/AddPage';
import { PageNotFound } from './pages/PageNotFound';
import './App.scss';
import { Header } from './components/Header';
import { PieChart } from './components/PieChart';
import { BarChart } from './components/BarChart';
import { AreaChart } from './components/AreaChart';
import { LineChart } from './components/LineChart';
import { Navigate, Route, Routes } from 'react-router-dom';
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

export const App = () => {
  const [charts, setCharts] = useState([
    { id: uuidv4(), name: 'Products', Component: PieChart, x: 'products', y: 'createdAt' },
    { id: uuidv4(), name: 'Checklists', Component: BarChart, x: 'checklists', y: 'country' },
    { id: uuidv4(), name: 'Trackings', Component: AreaChart, x: 'trackings', y: 'createdAt' },
    { id: uuidv4(), name: 'Applications', Component: LineChart, x: 'applications', y: 'country' },
  ]);
  const [updatedChart, setUpdatedChart] = useState(null);
  const [selectedId, setSelectedId] = useState(0);

  const updateChart = (id) =>
    setUpdatedChart(charts.find((item) => item.id === id));

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
          <Route path="add" element={<AddPage updatedChart={updatedChart} charts={charts} setCharts={setCharts} />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </div>
    </div>
  );
};
