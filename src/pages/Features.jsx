import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  LayoutDashboard,
  Kanban,
  CalendarDays,
  BarChart3,
  Users,
  ShieldCheck,
  Check,
  ArrowRight,
  Sparkles
} from 'lucide-react';
import PublicNavbar from '../components/PublicNavbar';
import './home.css';
import './Features.css';

function Features() {
  const allFeatures = [
    {
      icon: LayoutDashboard,
      title: 'Unified Project Hub',
      desc: 'Track progress bars, deadlines, and team allocation across all ongoing projects from one clean workspace.',
      link: '/projects'
    },
    {
      icon: Kanban,
      title: 'Interactive Kanban Board',
      desc: 'Organize tasks into To Do, In Progress, and Completed columns with priority badges and instant status updates.',
      link: '/tasks'
    },
    {
      icon: CalendarDays,
      title: 'Smart Deadline Calendar',
      desc: 'Visualize every task due date and project launch milestone on an interactive monthly schedule.',
      link: '/calendar'
    },
    {
      icon: BarChart3,
      title: 'Real-Time Analytics & CSV',
      desc: 'Measure sprint efficiency, team workload charts, and export full workspace reports in one click.',
      link: '/reports'
    },
    {
      icon: Users,
      title: 'Team Workload Sync',
      desc: 'Monitor active vs completed tasks per team member and update live availability statuses.',
      link: '/team'
    },
    {
      icon: ShieldCheck,
      title: 'LocalStorage & Dark Mode',
      desc: 'Zero-latency local persistence with instant Light and Midnight Dark themes built for long work sessions.',
      link: '/settings'
    }
  ];

  return (
    <div className="taskflow-home">
      <PublicNavbar />

      {/* Hero Banner */}
      <section className="feat-page-hero text-center">
        <div className="container">
          <span className="badge bg-white bg-opacity-10 text-info px-3 py-2 rounded-pill mb-3">
            <Sparkles size={14} className="me-1" /> POWERFUL WORKSPACE TOOLS
          </span>
          <h1 className="fw-bold display-5 mb-3">
            Built for Modern Teams That Move Fast
          </h1>
          <p className="text-white-50 mx-auto mb-4" style={{ maxWidth: '620px' }}>
            Explore every module inside TaskFlow — from Kanban boards and deadline calendars to real-time sprint analytics.
          </p>
          <Link to="/dashboard" className="btn btn-light fw-bold px-4 py-2 rounded-3">
            Try Live Workspace <ArrowRight size={17} className="ms-1" />
          </Link>
        </div>
      </section>

      {/* 6 Feature Cards */}
      <section className="py-5 bg-light">
        <div className="container py-4">
          <div className="row g-4">
            {allFeatures.map((item, idx) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.title}
                  className="col-md-6 col-lg-4"
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.06 }}
                >
                  <div className="feat-detail-card d-flex flex-column justify-content-between">
                    <div>
                      <div className="feat-icon-pill">
                        <Icon size={25} />
                      </div>
                      <h5 className="fw-bold text-dark">{item.title}</h5>
                      <p className="text-muted small">{item.desc}</p>
                    </div>
                    <Link to={item.link} className="text-primary fw-bold text-decoration-none small mt-2">
                      Open Module →
                    </Link>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Plan Comparison */}
      <section className="py-5">
        <div className="container py-3" style={{ maxWidth: '860px' }}>
          <div className="text-center mb-4">
            <h3 className="fw-bold">Simple, Transparent Plans</h3>
            <p className="text-muted">Start free forever or scale with your growing team.</p>
          </div>

          <div className="feat-compare-card">
            <table className="table mb-0 align-middle">
              <thead className="table-light">
                <tr>
                  <th className="p-3">Capability</th>
                  <th className="p-3 text-center">Starter (Free)</th>
                  <th className="p-3 text-center text-primary">Pro Workspace</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['Projects & Kanban Task Boards', true, true],
                  ['Interactive Deadline Calendar', true, true],
                  ['Light & Dark Theme Switcher', true, true],
                  ['CSV Analytics Report Export', true, true],
                  ['Unlimited Team Members & Roles', false, true],
                ].map(([label, free, pro]) => (
                  <tr key={label}>
                    <td className="p-3 fw-medium">{label}</td>
                    <td className="p-3 text-center">
                      {free ? <Check size={18} className="text-success" /> : '—'}
                    </td>
                    <td className="p-3 text-center">
                      {pro ? <Check size={18} className="text-primary" /> : '—'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <footer className="taskflow-footer">
        <div className="container text-center">
          <h3>TaskFlow<span>.</span></h3>
          <p>Plan Better. Work Smarter. Achieve More.</p>
          <small>© 2026 TaskFlow. All rights reserved.</small>
        </div>
      </footer>
    </div>
  );
}

export default Features;