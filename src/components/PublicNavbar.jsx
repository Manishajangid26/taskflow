import { Link, useLocation } from 'react-router-dom';
import { ArrowRight, Menu } from 'lucide-react';

function PublicNavbar() {
  const location = useLocation();
  const isActive = (path) => (location.pathname === path ? 'active text-primary fw-bold' : '');

  return (
    <nav className="navbar navbar-expand-lg bg-white py-3 fixed-top custom-navbar">
      <div className="container">
        <Link className="navbar-brand fw-bold fs-3 text-primary" to="/">
          TaskFlow<span className="brand-dot">.</span>
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarMenu"
        >
          <Menu />
        </button>

        <div className="collapse navbar-collapse" id="navbarMenu">
          <div className="navbar-nav mx-auto gap-lg-4">
            <Link className={`nav-link ${isActive('/')}`} to="/">
              Home
            </Link>
            <Link className={`nav-link ${isActive('/features')}`} to="/features">
              Features
            </Link>
            <Link className={`nav-link ${isActive('/about')}`} to="/about">
              About
            </Link>
            <Link className={`nav-link ${isActive('/contact')}`} to="/contact">
              Contact
            </Link>
          </div>

          <div className="d-flex gap-2">
            <Link to="/login" className="btn login-btn">
              Login
            </Link>
            <Link to="/register" className="btn btn-primary start-btn">
              Get Started <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default PublicNavbar;