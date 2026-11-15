import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Sparkles,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  CheckCircle2,
  Zap
} from 'lucide-react';
import { useTask } from '../context/TaskContext';
import './Auth.css';

function Login() {
  const navigate = useNavigate();
  const { loginUser } = useTask();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(true);
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState('');
  const [forgotMsg, setForgotMsg] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!email.includes('@') || password.length < 4) {
      setError('Please enter a valid email and password (min 4 characters).');
      return;
    }

    const nameFromEmail = email.split('@')[0];
    const formattedName = nameFromEmail.charAt(0).toUpperCase() + nameFromEmail.slice(1);

    loginUser({
      name: formattedName,
      email,
      role: 'Workspace Member',
      rememberMe
    });

    navigate('/dashboard');
  };

  const handleDemoLogin = () => {
    loginUser({
      name: 'Manisha',
      email: 'manisha@taskflow.io',
      role: 'Project Lead & Full Stack Dev'
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
            Plan Better. Work Smarter. Achieve More.
          </span>
          <h2 className="fw-bold display-6 mb-3">
            Welcome back to your command center.
          </h2>
          <p className="text-white-50 mb-4">
            Track sprints, collaborate with your team in real time, and hit every project milestone without stress.
          </p>

          <div className="d-flex flex-column gap-3">
            <div className="auth-feature-pill">
              <CheckCircle2 size={20} className="text-info" />
              <span className="small fw-medium">Interactive Kanban Boards & Live Analytics</span>
            </div>
            <div className="auth-feature-pill">
              <CheckCircle2 size={20} className="text-info" />
              <span className="small fw-medium">Smart Deadline Calendar & Team Workload Sync</span>
            </div>
          </div>
        </div>

        <small className="text-white-50">© 2026 TaskFlow Inc. All rights reserved.</small>
      </div>

      {/* Right Login Form Panel */}
      <div className="auth-form-panel">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="auth-card"
        >
          <div className="mb-4">
            <h3 className="fw-bold text-dark mb-1">Sign In</h3>
            <p className="text-muted small mb-0">
              Enter your credentials to access your TaskFlow workspace.
            </p>
          </div>

          {error && (
            <div className="alert alert-danger py-2 small rounded-3">{error}</div>
          )}

          {forgotMsg && (
            <div className="alert alert-info py-2 small rounded-3">{forgotMsg}</div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label small fw-semibold">Email Address</label>
              <div className="auth-input-group">
                <Mail size={17} className="auth-input-icon" />
                <input
                  type="email"
                  className="auth-input"
                  placeholder="manisha@taskflow.io"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="mb-3">
              <div className="d-flex justify-content-between align-items-center mb-1">
                <label className="form-label small fw-semibold mb-0">Password</label>
                <button
                  type="button"
                  onClick={() => setForgotMsg('Password reset link sent to your email! (Demo)')}
                  className="btn btn-link p-0 small text-decoration-none fw-semibold"
                >
                  Forgot password?
                </button>
              </div>
              <div className="auth-input-group">
                <Lock size={17} className="auth-input-icon" />
                <input
                  type={showPass ? 'text' : 'password'}
                  className="auth-input"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  className="auth-eye-btn"
                  onClick={() => setShowPass(!showPass)}
                >
                  {showPass ? <EyeOff size={17} /> : <Eye size={17} />}
                </button>
              </div>
            </div>

            <div className="form-check mb-4">
              <input
                className="form-check-input"
                type="checkbox"
                id="rememberCheck"
                checked={rememberMe}
                onChange={() => setRememberMe(!rememberMe)}
              />
              <label className="form-check-label small text-muted" htmlFor="rememberCheck">
                Remember me on this device
              </label>
            </div>

            <button type="submit" className="btn-tf-primary w-100 justify-content-center py-2 mb-3">
              Sign In to Workspace <ArrowRight size={17} />
            </button>
          </form>

          <div className="text-center text-muted small my-2">OR</div>

          <button type="button" onClick={handleDemoLogin} className="auth-demo-btn mb-4">
            <Zap size={16} className="me-1" /> Instant Demo Login (1-Click)
          </button>

          <p className="text-center small text-muted mb-0">
            Don't have an account?{' '}
            <Link to="/register" className="fw-bold text-primary text-decoration-none">
              Create free account
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
}

export default Login;