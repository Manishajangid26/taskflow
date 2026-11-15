import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Target, HeartHandshake, Zap, Award, ArrowRight } from 'lucide-react';
import PublicNavbar from '../components/PublicNavbar';
import './home.css';
import './About.css';

function About() {
  return (
    <div className="taskflow-home">
      <PublicNavbar />

      {/* About Hero */}
      <section className="about-hero">
        <div className="container">
          <div className="row align-items-center g-5">
            <motion.div
              className="col-lg-6"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <span className="section-tag">OUR MISSION</span>
              <h1 className="fw-bold display-5 mb-3">
                Making Project Management Effortless & Visual
              </h1>
              <p className="text-muted lead fs-6 mb-4">
                TaskFlow was built with a single belief: teams do their best work when tools stay out of the way. Instead of cluttered spreadsheets and endless status meetings, TaskFlow brings clarity to every task, deadline, and milestone.
              </p>
              <Link to="/register" className="btn btn-primary hero-btn">
                Join TaskFlow Today <ArrowRight size={18} />
              </Link>
            </motion.div>

            <div className="col-lg-6">
              <div className="row g-3">
                {[
                  ['10K+', 'Active Workspaces'],
                  ['99.9%', 'Uptime Reliability'],
                  ['4.9/5', 'User Satisfaction'],
                  ['50K+', 'Tasks Completed']
                ].map(([num, label]) => (
                  <div className="col-6" key={label}>
                    <div className="about-stat-box">
                      <h2 className="fw-bold text-primary mb-1">{num}</h2>
                      <small className="text-muted fw-semibold">{label}</small>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-5">
        <div className="container py-4">
          <div className="text-center mb-5">
            <h3 className="fw-bold">What Drives Us Every Day</h3>
            <p className="text-muted">The core principles behind every feature we craft.</p>
          </div>

          <div className="row g-4">
            {[
              {
                icon: Zap,
                title: 'Speed & Simplicity',
                desc: 'Every action—from creating a project to switching Kanban status—takes a single click.'
              },
              {
                icon: Target,
                title: 'Clarity Over Clutter',
                desc: 'Clean visual dashboards and charts help you spot bottlenecks before deadlines slip.'
              },
              {
                icon: HeartHandshake,
                title: 'Built for Collaboration',
                desc: 'Designed so designers, developers, and managers stay aligned on every deliverable.'
              },
              {
                icon: Award,
                title: 'Crafted with Precision',
                desc: 'Modern React architecture with smooth animations and responsive design across all screens.'
              }
            ].map((val) => {
              const Icon = val.icon;
              return (
                <div className="col-md-6 col-lg-3" key={val.title}>
                  <div className="about-value-card">
                    <div className="feat-icon-pill">
                      <Icon size={24} />
                    </div>
                    <h5 className="fw-bold">{val.title}</h5>
                    <p className="text-muted small mb-0">{val.desc}</p>
                  </div>
                </div>
              );
            })}
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

export default About;