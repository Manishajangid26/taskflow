import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Sparkles,
  User,
  Mail,
  Lock,
  Briefcase,
  ArrowRight,
  CheckCircle2
} from 'lucide-react';
import { useTask } from '../context/TaskContext';
import './Auth.css';

function Register() {
  const navigate = useNavigate();
  const { loginUser } = useTask();

  const [form, setForm] = useState({
    name: '',
    email: '',
    role: 'Project Manager',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');

  const handleRegister = (e) => {
    e.preventDefault();
    setError('');

    if (form.name.trim().length < 2) {
      setError('Please enter your full name.');
      return;
    }
    if (form.password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }
    if (form.password !== form.confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    loginUser({
      name: form.name,
      email: form.email,
      role: form.role
    });

    navigate('/dashboard');
  };

  return (
    <div className="auth-page-wrapper">
      {/* Left Branding Panel */}
      <div className="auth-brand-panel">
        <div>
          <Link to="/" className="auth-logo-link">
            <Sparkles size={26} className="text-info" />
            TaskFlow<span>.</span>
          </Link>
        </div>

        <div>
          <span className="badge bg-white bg-opacity-10 text-info px-3 py-2 rounded-pill mb-3">
            Start Free Forever
          </span>
          <h2 className="fw-bold display-6 mb-3">
            Organize your work in minutes, not days.
          </h2>
          <p className="text-white-50 mb-4">
            Create your free TaskFlow workspace and manage projects, deadlines, and team collaboration in one place.
          </p>

          <div className="d-flex flex-column gap-3">
            <div className="auth-feature-pill">
              <CheckCircle2 size={20} className="text-info" />
              <span className="small fw-medium">Unlimited Projects & Kanban Task Columns</span>
            </div>
            <div className="auth-feature-pill">
              <CheckCircle2 size={20} className="text-info" />
              <span className="small fw-medium">Instant LocalStorage Sync — No Setup Needed</span>
            </div>
          </div>
        </div>

        <small className="text-white-50">© 2026 TaskFlow Inc. All rights reserved.</small>
      </div>

      {/* Right Register Form Panel */}
      <div className="auth-form-panel">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="auth-card"
        >
          <div className="mb-4">
            <h3 className="fw-bold text-dark mb-1">Create Account</h3>
            <p className="text-muted small mb-0">
              Set up your personal TaskFlow workspace in seconds.
            </p>
          </div>

          {error && (
            <div className="alert alert-danger py-2 small rounded-3">{error}</div>
          )}

          <form onSubmit={handleRegister}>
            <div className="mb-3">
              <label className="form-label small fw-semibold">Full Name</label>
              <div className="auth-input-group">
                <User size={17} className="auth-input-icon" />
                <input
                  type="text"
                  className="auth-input"
                  placeholder="Manisha Jangir"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  required
                />
              </div>
            </div>

            <div className="mb-3">
              <label className="form-label small fw-semibold">Work Email</label>
              <div className="auth-input-group">
                <Mail size={17} className="auth-input-icon" />
                <input
                  type="email"
                  className="auth-input"
                  placeholder="manisha@taskflow.io"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  required
                />
              </div>
            </div>

            <div className="mb-3">
              <label className="form-label small fw-semibold">Your Role</label>
              <div className="auth-input-group">
                <Briefcase size={17} className="auth-input-icon" />
                <select
                  className="auth-input"
                  value={form.role}
                  onChange={(e) => setForm({ ...form, role: e.target.value })}
                >
                  <option value="Project Manager">Project Manager</option>
                  <option value="Full Stack Developer">Full Stack Developer</option>
                  <option value="UI/UX Designer">UI/UX Designer</option>
                  <option value="Team Lead">Team Lead</option>
                </select>
              </div>
            </div>

            <div className="row g-2 mb-4">
              <div className="col-6">
                <label className="form-label small fw-semibold">Password</label>
                <div className="auth-input-group">
                  <Lock size={16} className="auth-input-icon" />
                  <input
                    type="password"
                    className="auth-input"
                    placeholder="Min 6 chars"
                    value={form.password}
                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="col-6">
                <label className="form-label small fw-semibold">Confirm</label>
                <div className="auth-input-group">
                  <Lock size={16} className="auth-input-icon" />
                  <input
                    type="password"
                    className="auth-input"
                    placeholder="Repeat"
                    value={form.confirmPassword}
                    onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
                    required
                  />
                </div>
              </div>
            </div>

            <button type="submit" className="btn-tf-primary w-100 justify-content-center py-2 mb-3">
              Create Workspace <ArrowRight size={17} />
            </button>
          </form>

          <p className="text-center small text-muted mb-0">
            Already have an account?{' '}
            <Link to="/login" className="fw-bold text-primary text-decoration-none">
              Sign in here
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
}

export default Register;