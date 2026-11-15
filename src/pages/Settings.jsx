import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  User,
  Mail,
  Briefcase,
  Bell,
  ShieldCheck,
  Save,
  RotateCcw,
  LogOut,
  CheckCircle2,
  Sun,
  Moon,
  Palette
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Topbar from '../components/Topbar';
import { useTask } from '../context/TaskContext';
import './Settings.css';

function Settings() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user, loginUser, logoutUser, projects, tasks, theme, toggleTheme } = useTask();
  const navigate = useNavigate();

  const [profile, setProfile] = useState({
    name: user?.name || 'Manisha',
    email: user?.email || 'manisha@taskflow.io',
    role: user?.role || 'Project Lead & Full Stack Dev',
    bio: user?.bio || 'Building modern web applications and leading agile product sprints at TaskFlow.'
  });

  const [prefs, setPrefs] = useState({
    emailAlerts: true,
    deadlineReminders: true,
    weeklyDigest: false,
  });

  const [savedToast, setSavedToast] = useState(false);

  const handleSaveProfile = (e) => {
    e.preventDefault();
    loginUser(profile);
    setSavedToast(true);
    setTimeout(() => setSavedToast(false), 3000);
  };

  const handleResetDemoData = () => {
    localStorage.removeItem('tf_projects');
    localStorage.removeItem('tf_tasks');
    localStorage.removeItem('tf_team');
    window.location.reload();
  };

  const handleLogout = () => {
    logoutUser();
    navigate('/');
  };

  return (
    <div className="dashboard-layout">
      <div className="dashboard-main-wrapper">
        <Topbar pageTitle="Profile & Settings" onMenuClick={() => setSidebarOpen(true)} />

        <main className="container-fluid p-4">
          {/* Header */}
          <div className="d-flex flex-wrap justify-content-between align-items-center gap-3 mb-4">
            <div>
              <h4 className="fw-bold mb-1">Account & Workspace Settings</h4>
              <p className="text-muted mb-0 small">
                Customize your theme, personal profile, notification alerts, and workspace data.
              </p>
            </div>

            {savedToast && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="badge bg-success bg-opacity-10 text-success border border-success px-3 py-2 rounded-pill d-flex align-items-center gap-2"
              >
                <CheckCircle2 size={16} /> Changes saved to workspace!
              </motion.div>
            )}
          </div>

          <div className="row g-4">
            {/* Left 4 Cols: Profile Card + Stacked Theme Option Below It */}
            <motion.div
              className="col-lg-4 d-flex flex-column gap-4"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35 }}
            >
              {/* Profile Summary Card */}
              <div className="set-profile-card">
                <div className="set-cover-banner" />

                <div className="px-4 pb-4">
                  <div className="set-avatar-wrapper">
                    {profile.name.charAt(0).toUpperCase()}
                  </div>

                  <h5 className="fw-bold text-dark mt-3 mb-1">{profile.name}</h5>
                  <span className="badge bg-primary bg-opacity-10 text-primary mb-2">
                    {profile.role}
                  </span>
                  <p className="text-muted small mb-4">{profile.bio}</p>

                  <div className="row g-2 text-center border-top pt-3 mb-4">
                    <div className="col-6 border-end">
                      <div className="fw-bold fs-5 text-dark">{projects.length}</div>
                      <small className="text-muted">Projects</small>
                    </div>
                    <div className="col-6">
                      <div className="fw-bold fs-5 text-dark">{tasks.length}</div>
                      <small className="text-muted">Total Tasks</small>
                    </div>
                  </div>

                  <button
                    onClick={handleLogout}
                    className="btn btn-outline-danger w-100 rounded-3 fw-semibold d-flex align-items-center justify-content-center gap-2"
                  >
                    <LogOut size={17} /> Sign Out of Workspace
                  </button>
                </div>
              </div>

              {/* THEME OPTION CARD (Directly Below Profile, Stacked Buttons) */}
              <div className="set-panel-card flex-grow-1 d-flex flex-column justify-content-between">
                <div>
                  <div className="d-flex justify-content-between align-items-center mb-1">
                    <h6 className="fw-bold mb-0 d-flex align-items-center gap-2">
                      <Palette size={18} className="text-primary" /> Workspace Theme
                    </h6>
                    <span className="badge bg-primary bg-opacity-10 text-primary text-uppercase">
                      {theme}
                    </span>
                  </div>
                  <small className="text-muted d-block mb-3">
                    Switch between Light and Dark appearance.
                  </small>

                  <div className="d-flex flex-column gap-3">
                    {/* Light Theme Option */}
                    <div
                      onClick={() => toggleTheme('light')}
                      className={`theme-option-box ${theme === 'light' ? 'active-theme' : ''}`}
                    >
                      <div className="d-flex justify-content-between align-items-center">
                        <div className="d-flex align-items-center gap-2 fw-bold">
                          <Sun size={20} className="text-warning" /> Light Theme
                        </div>
                        {theme === 'light' && <CheckCircle2 size={19} className="text-primary" />}
                      </div>
                      <div className="theme-preview-bar light-preview">
                        <span className="preview-dot bg-danger" />
                        <span className="preview-dot bg-warning" />
                        <span className="preview-dot bg-success" />
                        <small className="text-muted ms-auto" style={{ fontSize: '0.72rem' }}>Clean Daylight</small>
                      </div>
                    </div>

                    {/* Dark Theme Option */}
                    <div
                      onClick={() => toggleTheme('dark')}
                      className={`theme-option-box ${theme === 'dark' ? 'active-theme' : ''}`}
                    >
                      <div className="d-flex justify-content-between align-items-center">
                        <div className="d-flex align-items-center gap-2 fw-bold">
                          <Moon size={20} className="text-info" /> Dark Theme
                        </div>
                        {theme === 'dark' && <CheckCircle2 size={19} className="text-primary" />}
                      </div>
                      <div className="theme-preview-bar dark-preview">
                        <span className="preview-dot bg-danger" />
                        <span className="preview-dot bg-warning" />
                        <span className="preview-dot bg-success" />
                        <small className="text-white-50 ms-auto" style={{ fontSize: '0.72rem' }}>Midnight Slate</small>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Right 8 Cols: Profile Form + Notifications + Reset */}
            <motion.div
              className="col-lg-8 d-flex flex-column gap-4"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.35 }}
            >
              {/* Edit Profile Form */}
              <div className="set-panel-card">
                <h6 className="fw-bold mb-3 d-flex align-items-center gap-2">
                  <User size={18} className="text-primary" /> Personal Information
                </h6>

                <form onSubmit={handleSaveProfile}>
                  <div className="row g-3 mb-3">
                    <div className="col-md-6">
                      <label className="form-label small fw-semibold">Full Name</label>
                      <div className="input-group">
                        <span className="input-group-text bg-light">
                          <User size={16} className="text-muted" />
                        </span>
                        <input
                          type="text"
                          className="form-control"
                          value={profile.name}
                          onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                          required
                        />
                      </div>
                    </div>

                    <div className="col-md-6">
                      <label className="form-label small fw-semibold">Email Address</label>
                      <div className="input-group">
                        <span className="input-group-text bg-light">
                          <Mail size={16} className="text-muted" />
                        </span>
                        <input
                          type="email"
                          className="form-control"
                          value={profile.email}
                          onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <div className="mb-3">
                    <label className="form-label small fw-semibold">Workspace Role</label>
                    <div className="input-group">
                      <span className="input-group-text bg-light">
                        <Briefcase size={16} className="text-muted" />
                      </span>
                      <input
                        type="text"
                        className="form-control"
                        value={profile.role}
                        onChange={(e) => setProfile({ ...profile, role: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="mb-4">
                    <label className="form-label small fw-semibold">Short Bio</label>
                    <textarea
                      rows="2"
                      className="form-control rounded-3"
                      value={profile.bio}
                      onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                    />
                  </div>

                  <div className="d-flex justify-content-end">
                    <button type="submit" className="btn-tf-primary">
                      <Save size={17} /> Save Changes
                    </button>
                  </div>
                </form>
              </div>

              {/* Notification Preferences */}
              <div className="set-panel-card">
                <h6 className="fw-bold mb-2 d-flex align-items-center gap-2">
                  <Bell size={18} className="text-primary" /> Notification Preferences
                </h6>

                <div className="set-pref-row">
                  <div>
                    <div className="fw-semibold text-dark">Email Task Assignments</div>
                    <small className="text-muted">Receive an email when a team member assigns a task to you.</small>
                  </div>
                  <div className="form-check form-switch">
                    <input
                      className="form-check-input set-switch"
                      type="checkbox"
                      checked={prefs.emailAlerts}
                      onChange={() => setPrefs({ ...prefs, emailAlerts: !prefs.emailAlerts })}
                    />
                  </div>
                </div>

                <div className="set-pref-row">
                  <div>
                    <div className="fw-semibold text-dark">Deadline Reminders</div>
                    <small className="text-muted">Get notified 24 hours before a project or task due date.</small>
                  </div>
                  <div className="form-check form-switch">
                    <input
                      className="form-check-input set-switch"
                      type="checkbox"
                      checked={prefs.deadlineReminders}
                      onChange={() => setPrefs({ ...prefs, deadlineReminders: !prefs.deadlineReminders })}
                    />
                  </div>
                </div>

                <div className="set-pref-row">
                  <div>
                    <div className="fw-semibold text-dark">Weekly Analytics Digest</div>
                    <small className="text-muted">Receive a summary of team sprint velocity every Monday.</small>
                  </div>
                  <div className="form-check form-switch">
                    <input
                      className="form-check-input set-switch"
                      type="checkbox"
                      checked={prefs.weeklyDigest}
                      onChange={() => setPrefs({ ...prefs, weeklyDigest: !prefs.weeklyDigest })}
                    />
                  </div>
                </div>
              </div>

              {/* Workspace Data Reset */}
              <div className="set-danger-box d-flex flex-wrap justify-content-between align-items-center gap-3">
                <div>
                  <div className="fw-bold text-danger d-flex align-items-center gap-2">
                    <ShieldCheck size={18} /> Reset LocalStorage Workspace Data
                  </div>
                  <small className="text-muted">
                    Restore all default demo projects, tasks, and team members if you cleared them.
                  </small>
                </div>
                <button
                  type="button"
                  onClick={handleResetDemoData}
                  className="btn btn-danger rounded-3 fw-semibold d-flex align-items-center gap-2"
                >
                  <RotateCcw size={16} /> Reset Demo Data
                </button>
              </div>
            </motion.div>
          </div>
        </main>
      </div>

      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
    </div>
  );
}

export default Settings;