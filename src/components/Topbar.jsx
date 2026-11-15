import { Menu, Search, Bell, Plus } from 'lucide-react';
import { Link } from 'react-router-dom';

function Topbar({ onMenuClick, pageTitle }) {
  return (
    <header className="tf-topbar">
      <div className="d-flex align-items-center gap-3">
        <button
          className="btn btn-light border d-lg-none p-2 rounded-3"
          onClick={onMenuClick}
        >
          <Menu size={20} />
        </button>
        <div>
          <h5 className="mb-0 fw-bold text-dark">{pageTitle}</h5>
          <small className="text-muted d-none d-sm-inline">Plan Better. Work Smarter. Achieve More.</small>
        </div>
      </div>

      <div className="d-flex align-items-center gap-3">
        <div className="tf-search-box d-none md-flex d-md-flex">
          <Search size={17} className="text-muted" />
          <input type="text" placeholder="Search tasks, projects..." />
        </div>

        <Link to="/projects" className="btn-tf-primary text-decoration-none d-none d-sm-inline-flex">
          <Plus size={18} /> New Project
        </Link>

        <button className="btn btn-light border rounded-circle p-2 position-relative">
          <Bell size={18} className="text-secondary" />
          <span
            className="position-absolute top-0 start-100 translate-middle p-1 bg-danger border border-light rounded-circle"
          />
        </button>

        <div className="d-flex align-items-center gap-2 ps-2 border-start">
          <div
            className="rounded-circle d-flex align-items-center justify-content-center fw-bold text-white"
            style={{
              width: '38px',
              height: '38px',
              background: 'linear-gradient(135deg, #4f46e5, #0ea5e9)'
            }}
          >
            M
          </div>
          <div className="d-none d-xl-block lh-1">
            <div className="fw-semibold" style={{ fontSize: '0.88rem' }}>Manisha</div>
            <small className="text-muted" style={{ fontSize: '0.75rem' }}>Admin Workspace</small>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Topbar;