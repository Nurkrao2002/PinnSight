import { Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import DashboardPage from './pages/DashboardPage';
import AdminDashboardPage from './pages/AdminDashboardPage';
import FinanceDashboardPage from './pages/FinanceDashboardPage';
import ProtectedRoute from './components/ProtectedRoute';
import './App.css';

const allRoles = [
  "Platform Super Admin", "Platform Manager", "Company Admin",
  "CEO/Executive", "Finance Team", "Sales & Marketing",
  "Operations Team", "Basic User"
];

const adminRoles = ["Platform Super Admin", "Platform Manager", "Company Admin"];
const financeRoles = ["Finance Team", "CEO/Executive"]; // CEO can also see finance

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/login" element={<LoginPage />} />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute allowedRoles={allRoles}>
            <DashboardPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin-dashboard"
        element={
          <ProtectedRoute allowedRoles={adminRoles}>
            <AdminDashboardPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/finance-dashboard"
        element={
          <ProtectedRoute allowedRoles={financeRoles}>
            <FinanceDashboardPage />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;
