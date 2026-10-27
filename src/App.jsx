import { Navigate, NavLink, Route, Routes, useLocation } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import CamerasPage from './pages/CamerasPage';
import AnalyticsPage from './pages/AnalyticsPage';
import PlaybackPage from './pages/PlaybackPage';
import AlarmsPage from './pages/AlarmsPage';
import AdminPage from './pages/AdminPage';

const navItems = [
  { to: '/dashboard', label: 'Dashboard' },
  { to: '/cameras', label: 'Cameras' },
  { to: '/analytics', label: 'Analytics' },
  { to: '/playback', label: 'Playback' },
  { to: '/alarms', label: 'Alarms' },
  { to: '/admin', label: 'Admin' }
];

function getUser() {
  try {
    return JSON.parse(localStorage.getItem('mcardle-user') || 'null');
  } catch {
    return null;
  }
}

function ProtectedRoute({ children, role = null }) {
  const user = getUser();
  const location = useLocation();

  if (!user) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  if (role && user.role !== role && user.role !== 'admin') {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
}

function Shell() {
  const user = getUser();
  const location = useLocation();

  if (!user && location.pathname !== '/login') {
    return <Navigate to="/login" replace />;
  }

  if (user && location.pathname === '/login') {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <>
      <header className="topbar">
        <div className="brand-wrap">
          <div className="brand-dot" />
          <span>McArdle AI VMS</span>
        </div>

        <nav className="nav">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="account-wrap">
          <span>{user?.name || 'Operator'}</span>
          <button
            className="ghost-btn"
            onClick={() => {
              localStorage.removeItem('mcardle-user');
              window.location.href = '/login';
            }}
          >
            Logout
          </button>
        </div>
      </header>

      <main className="page-shell">
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/dashboard" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
          <Route path="/cameras" element={<ProtectedRoute><CamerasPage /></ProtectedRoute>} />
          <Route path="/analytics" element={<ProtectedRoute><AnalyticsPage /></ProtectedRoute>} />
          <Route path="/playback" element={<ProtectedRoute><PlaybackPage /></ProtectedRoute>} />
          <Route path="/alarms" element={<ProtectedRoute><AlarmsPage /></ProtectedRoute>} />
          <Route path="/admin" element={<ProtectedRoute role="admin"><AdminPage /></ProtectedRoute>} />
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </main>
    </>
  );
}

export default function App() {
  return <Shell />;
}
