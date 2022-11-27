import ReactDOM from 'react-dom/client';
import {
  Routes,
  Route,
  Navigate,
  HashRouter as Router,
} from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import { AddPage } from './pages/AddPage';
import { PageNotFound } from './pages/PageNotFound';
import { App } from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <Router>
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<HomePage />} />
        <Route path="home" element={<Navigate to="/" replace />} />
        <Route path="add" element={<AddPage />} />
        <Route path="*" element={<PageNotFound />} />
      </Route>
    </Routes>
  </Router>,
);
