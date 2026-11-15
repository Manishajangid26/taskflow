import { Link, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  CheckCircle2,
  Users,
  CalendarDays,
  ArrowRight,
  Sparkles,
  TrendingUp
} from 'lucide-react';
import PublicNavbar from '../components/PublicNavbar';
import './home.css';

function Home() {
  const navigate = useNavigate();

  const features = [
    {
      icon: LayoutDashboard,
      title: 'Project Management',
      desc: 'Organize all your projects in one place and manage your workflow effortlessly.',
      color: 'blue',
      route: '/projects'
    },
    {
      icon: CheckCircle2,
      title: 'Task Tracking',
      desc: 'Track your daily tasks, monitor progress and complete work on time.',
      color: 'green',
      route: '/tasks'
    },
    {
      icon: Users,
      title: 'Team Collaboration',
      desc: 'Connect with your team, assign tasks and work together efficiently.',
      color: 'purple',
      route: '/team'
    },
    {
      icon: CalendarDays,
      title: 'Smart Planning',
      desc: 'Manage deadlines, schedule activities and never miss important tasks.',
      color: 'orange',
      route: '/calendar'
    }
  ];

  return (
    <div className="taskflow-home">

      {/* SINGLE FIXED NAVBAR */}
      <PublicNavbar />

      {/* HERO SECTION */}
      <section className="hero-section" id="home">
        <div className="container">
          <div className="row align-items-center min-vh-75 py-5">

            <div className="col-lg-6 hero-content">

              <div className="hero-badge">
                <Sparkles size={15} />
                SMARTER PROJECT MANAGEMENT
              </div>

              <h1>
                Manage Work.
                <br />
                <span>Achieve More.</span>
                <br />
                Stay Ahead.
              </h1>

              <p className="hero-description">
                Bring your projects, tasks and team together
                in one powerful workspace. Plan smarter,
                collaborate better and get more done.
              </p>

              <div className="d-flex flex-wrap gap-3 mt-4">
                <Link to="/register" className="btn btn-primary hero-btn">
                  Get Started Free <ArrowRight size={18} />
                </Link>

                <Link to="/dashboard" className="btn demo-btn">
                  Live Workspace Demo
                </Link>
              </div>

              <div className="hero-trust mt-4">
                <CheckCircle2 size={17} />
                <span>Simple to use. Powerful to manage.</span>
              </div>

            </div>

            {/* DASHBOARD PREVIEW */}
            <div className="col-lg-6 mt-5 mt-lg-0">

              <div className="hero-dashboard">

                <div className="dashboard-heading">
                  <div>
                    <small>OVERVIEW</small>
                    <h4>My Dashboard</h4>
                  </div>

                  <span className="live-status">
                    <span></span> Live Preview
                  </span>
                </div>

                <div className="row g-3 mt-2">

                  <div className="col-6">
                    <div className="stat-card">
                      <div className="stat-icon blue-stat">
                        <LayoutDashboard size={20} />
                      </div>
                      <small>Total Projects</small>
                      <h3>12</h3>
                      <span className="growth">
                        <TrendingUp size={13} /> +12% this month
                      </span>
                    </div>
                  </div>

                  <div className="col-6">
                    <div className="stat-card">
                      <div className="stat-icon green-stat">
                        <CheckCircle2 size={20} />
                      </div>
                      <small>Completed Tasks</small>
                      <h3>48</h3>
                      <span className="growth">
                        <TrendingUp size={13} /> +18% this month
                      </span>
                    </div>
                  </div>

                </div>

                <div className="dashboard-progress mt-4">
                  <div className="d-flex justify-content-between">
                    <strong>Project Progress</strong>
                    <strong className="text-primary">75%</strong>
                  </div>

                  <div className="progress mt-3">
                    <div className="progress-bar" style={{ width: '75%' }}></div>
                  </div>
                </div>

                <div className="dashboard-activity mt-4">
                  <div className="d-flex justify-content-between mb-3">
                    <strong>Recent Activities</strong>
                    <Link to="/dashboard" className="text-decoration-none">
                      <span>View All</span>
                    </Link>
                  </div>

                  {[
                    ['Website Redesign', 'Completed', 'green'],
                    ['Mobile App UI', 'In Progress', 'blue'],
                    ['Marketing Campaign', 'Pending', 'orange']
                  ].map(([name, status, color]) => (
                    <div className="activity-item" key={name}>
                      <div className="activity-icon">
                        <CheckCircle2 size={17} />
                      </div>

                      <div className="flex-grow-1">
                        <strong>{name}</strong>
                        <small>Updated recently</small>
                      </div>

                      <span className={`activity-status ${color}`}>
                        {status}
                      </span>
                    </div>
                  ))}

                </div>

              </div>

            </div>
          </div>
        </div>
      </section>

      {/* FEATURES SECTION */}
      <section className="features-section py-5" id="features">
        <div className="container py-5">

          <div className="text-center features-heading mb-5">

            <span className="section-tag">
              <Sparkles size={14} /> WHAT WE OFFER
            </span>

            <h2>
              Everything You Need to
              <span> Stay Productive</span>
            </h2>

            <p>
              Everything you need to plan, organize and
              accomplish your goals in one place.
            </p>

          </div>

          <div className="row g-4">

            {features.map((feature, index) => {
              const Icon = feature.icon;

              return (
                <div className="col-md-6 col-lg-3" key={feature.title}>

                  <div
                    className="feature-card h-100"
                    style={{ '--card-index': index, cursor: 'pointer' }}
                    onClick={() => navigate(feature.route)}
                  >

                    <div className="feature-icon-wrapper">
                      <div className={`feature-icon ${feature.color}`}>
                        <Icon size={29} strokeWidth={1.8} />
                      </div>

                      <span className="feature-arrow">
                        <ArrowRight size={19} />
                      </span>
                    </div>

                    <h5>{feature.title}</h5>

                    <p>{feature.desc}</p>

                    <div className="feature-link">
                      Explore Feature <ArrowRight size={16} />
                    </div>

                  </div>

                </div>
              );
            })}

          </div>

        </div>
      </section>

      {/* FOOTER */}
      <footer className="taskflow-footer" id="contact">
        <div className="container text-center">
          <h3>TaskFlow<span>.</span></h3>
          <p>Plan Better. Work Smarter. Achieve More.</p>
          <small>© 2026 TaskFlow. All rights reserved.</small>
        </div>
      </footer>

    </div>
  );
}

export default Home;