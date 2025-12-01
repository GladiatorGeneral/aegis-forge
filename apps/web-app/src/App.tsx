import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/Home';
import DashboardPage from './pages/Dashboard';
import ProblemSolverPage from './pages/ProblemSolver';

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/solve" element={<ProblemSolverPage />} />
      </Routes>
    </div>
  );
}

export default App;
