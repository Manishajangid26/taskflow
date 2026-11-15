import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  UserPlus,
  Search,
  Mail,
  Briefcase,
  CheckCircle2,
  Clock,
  Trash2,
  X,
  Users
} from 'lucide-react';
import Sidebar from '../components/Sidebar';
import Topbar from '../components/Topbar';
import { useTask } from '../context/TaskContext';
import './Team.css';

function Team() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { team, setTeam, tasks } = useTask();

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [showModal, setShowModal] = useState(false);

  const [newMember, setNewMember] = useState({
    name: '',
    role: '',
    email: '',
    status: 'Active'
  });

  const filteredTeam = team.filter((member) => {
    const matchesSearch =
      member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.role.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'All' || member.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleAddMember = (e) => {
    e.preventDefault();
    if (!newMember.name.trim() || !newMember.role.trim()) return;
    setTeam([
      ...team,
      {
        ...newMember,
        id: Date.now(),
        tasksAssigned: 0
      }
    ]);
    setNewMember({ name: '', role: '', email: '', status: 'Active' });
    setShowModal(false);
  };

  const cycleMemberStatus = (member) => {
    const order = ['Active', 'In Meeting', 'Offline'];
    const next = order[(order.indexOf(member.status) + 1) % order.length];
    setTeam(team.map((m) => (m.id === member.id ? { ...m, status: next } : m)));
  };

  const removeMember = (id) => {
    setTeam(team.filter((m) => m.id !== id));
  };

  const getStatusClasses = (status) => {
    if (status === 'Active') return { pill: 'status-active', dot: 'dot-active' };
    if (status === 'In Meeting') return { pill: 'status-meeting', dot: 'dot-meeting' };
    return { pill: 'status-offline', dot: 'dot-offline' };
  };

  return (
    <div className="dashboard-layout">
      <div className="dashboard-main-wrapper">
        <Topbar pageTitle="Team Members" onMenuClick={() => setSidebarOpen(true)} />

        <main className="container-fluid p-4">
          {/* Header */}
          <div className="d-flex flex-wrap justify-content-between align-items-center gap-3 mb-4">
            <div>
              <h4 className="fw-bold mb-1">Workspace Team & Roles</h4>
              <p className="text-muted mb-0 small">
                Collaborate with your team, monitor workloads, and manage member roles.
              </p>
            </div>

            <button className="btn-tf-primary" onClick={() => setShowModal(true)}>
              <UserPlus size={18} /> Add Member
            </button>
          </div>

          {/* Search & Status Filter */}
          <div className="tf-card mb-4 p-3">
            <div className="row g-3 align-items-center">
              <div className="col-md-6">
                <div className="tf-search-box w-100">
                  <Search size={18} className="text-muted" />
                  <input
                    type="text"
                    placeholder="Search member by name or role..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>

              <div className="col-md-6 d-flex flex-wrap align-items-center justify-content-md-end gap-2">
                <Users size={16} className="text-muted me-1" />
                {['All', 'Active', 'In Meeting', 'Offline'].map((st) => (
                  <button
                    key={st}
                    onClick={() => setStatusFilter(st)}
                    className={`btn btn-sm rounded-pill px-3 fw-semibold ${
                      statusFilter === st
                        ? 'btn-primary'
                        : 'btn-light border text-secondary'
                    }`}
                  >
                    {st}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Team Cards Grid */}
          <div className="row g-4">
            <AnimatePresence>
              {filteredTeam.map((member, index) => {
                const statusStyle = getStatusClasses(member.status);
                const memberTasks = tasks.filter((t) => t.assignee === member.name);
                const completedCount = memberTasks.filter((t) => t.status === 'Completed').length;
                const activeCount = memberTasks.length - completedCount;

                return (
                  <motion.div
                    key={member.id}
                    layout
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.92 }}
                    transition={{ duration: 0.25, delay: index * 0.05 }}
                    className="col-md-6 col-xl-3"
                  >
                    <div className="team-member-card">
                      <div>
                        {/* Top Avatar & Status */}
                        <div className="d-flex justify-content-between align-items-start mb-3">
                          <div className={`team-avatar-ring avatar-grad-${index % 4}`}>
                            {member.name.charAt(0).toUpperCase()}
                            <span className={`team-status-dot ${statusStyle.dot}`} />
                          </div>

                          <div className="d-flex align-items-center gap-1">
                            <button
                              onClick={() => cycleMemberStatus(member)}
                              className={`team-status-pill ${statusStyle.pill}`}
                              title="Click to change status"
                            >
                              {member.status}
                            </button>
                            {team.length > 1 && (
                              <button
                                onClick={() => removeMember(member.id)}
                                className="btn btn-sm btn-light text-danger rounded-circle p-1"
                                title="Remove Member"
                              >
                                <Trash2 size={14} />
                              </button>
                            )}
                          </div>
                        </div>

                        {/* Name & Role */}
                        <h5 className="fw-bold text-dark mb-1">{member.name}</h5>
                        <div className="mb-3">
                          <span className="team-role-tag">
                            <Briefcase size={13} />
                            {member.role}
                          </span>
                        </div>

                        <div className="d-flex align-items-center gap-2 text-muted small mb-4">
                          <Mail size={14} />
                          <span className="text-truncate">{member.email}</span>
                        </div>
                      </div>

                      {/* Workload Stats */}
                      <div className="row g-2 pt-3 border-top">
                        <div className="col-6">
                          <div className="team-metric-box">
                            <div className="text-warning d-flex align-items-center justify-content-center gap-1 small fw-semibold">
                              <Clock size={13} /> Active
                            </div>
                            <div className="fw-bold fs-5 text-dark mt-1">{activeCount}</div>
                          </div>
                        </div>

                        <div className="col-6">
                          <div className="team-metric-box">
                            <div className="text-success d-flex align-items-center justify-content-center gap-1 small fw-semibold">
                              <CheckCircle2 size={13} /> Done
                            </div>
                            <div className="fw-bold fs-5 text-dark mt-1">{completedCount}</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>

            {filteredTeam.length === 0 && (
              <div className="col-12 text-center py-5">
                <h5 className="text-muted">No team members match your filter.</h5>
              </div>
            )}
          </div>
        </main>
      </div>

      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* ADD TEAM MEMBER MODAL */}
      {showModal && (
        <div
          className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center p-3"
          style={{ backgroundColor: 'rgba(15, 23, 42, 0.55)', zIndex: 100000, backdropFilter: 'blur(4px)' }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-4 p-4 shadow-lg w-100"
            style={{ maxWidth: '440px' }}
          >
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h5 className="fw-bold mb-0">Invite Team Member</h5>
              <button className="btn btn-light rounded-circle p-1" onClick={() => setShowModal(false)}>
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleAddMember}>
              <div className="mb-3">
                <label className="form-label small fw-semibold">Full Name</label>
                <input
                  type="text"
                  className="form-control rounded-3"
                  placeholder="e.g., Ananya Singh"
                  value={newMember.name}
                  onChange={(e) => setNewMember({ ...newMember, name: e.target.value })}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label small fw-semibold">Role / Designation</label>
                <input
                  type="text"
                  className="form-control rounded-3"
                  placeholder="e.g., Backend Developer"
                  value={newMember.role}
                  onChange={(e) => setNewMember({ ...newMember, role: e.target.value })}
                  required
                />
              </div>

              <div className="row g-3 mb-4">
                <div className="col-7">
                  <label className="form-label small fw-semibold">Work Email</label>
                  <input
                    type="email"
                    className="form-control rounded-3"
                    placeholder="ananya@taskflow.io"
                    value={newMember.email}
                    onChange={(e) => setNewMember({ ...newMember, email: e.target.value })}
                    required
                  />
                </div>

                <div className="col-5">
                  <label className="form-label small fw-semibold">Status</label>
                  <select
                    className="form-select rounded-3"
                    value={newMember.status}
                    onChange={(e) => setNewMember({ ...newMember, status: e.target.value })}
                  >
                    <option value="Active">Active</option>
                    <option value="In Meeting">In Meeting</option>
                    <option value="Offline">Offline</option>
                  </select>
                </div>
              </div>

              <div className="d-flex justify-content-end gap-2">
                <button type="button" className="btn btn-light rounded-3 px-3" onClick={() => setShowModal(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn-tf-primary">
                  Add to Workspace
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
}

export default Team;