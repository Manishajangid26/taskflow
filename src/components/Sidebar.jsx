import { NavLink, Link } from 'react-router-dom';
import {
  LayoutDashboard,
  FolderKanban,
  CheckSquare,
  CalendarDays,
  Users,
  BarChart3,
  Settings,
  LogOut,
  Sparkles,
  X
} from 'lucide-react';

function Sidebar({ isOpen, onClose }) {
  const menuItems = [
    { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { path: '/projects', label: 'My Projects', icon: FolderKanban },
    { path: '/tasks', label: 'Task Board', icon: CheckSquare },
    { path: '/calendar', label: 'Calendar', icon: CalendarDays },
    { path: '/team', label: 'Team Members', icon: Users },
    { path: '/reports', label: 'Reports & Analytics', icon: BarChart3 },
    { path: '/settings', label: 'Profile & Settings', icon: Settings },
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          className="position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-50 d-lg-none"
          style={{ zIndex: 1035 }}
          onClick={onClose}
        />
      )}

      <aside className={`tf-sidebar ${isOpen ? 'open' : ''}`}>
        <div className="d-flex align-items-center justify-content-between">
          <Link to="/" className="tf-sidebar-brand">
            <Sparkles size={22} className="text-info" />
            TaskFlow<span>.</span>
          </Link>
          <button
            className="btn text-white d-lg-none me-2"
            onClick={onClose}
          >
            <X size={22} />
          </button>
        </div>

        <div className="px-3 pt-3">
          <small className="text-uppercase fw-bold text-secondary" style={{ fontSize: '0.7rem', letterSpacing: '1px' }}>
            Workspace Menu
          </small>
        </div>

        <nav className="tf-nav-list">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={onClose}
                className={({ isActive }) => `tf-nav-item ${isActive ? 'active' : ''}`}
              >
                <Icon size={19} />
                <span>{item.label}</span>
              </NavLink>
            );
          })}
        </nav>

        <div className="p-3 border-top border-secondary border-opacity-25">
          <Link to="/" className="tf-nav-item text-danger">
            <LogOut size={19} />
            <span>Back to Home</span>
          </Link>
        </div>
      </aside>
    </>
  );
}

export default Sidebar;