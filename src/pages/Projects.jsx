import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Plus,
  Search,
  FolderKanban,
  Calendar,
  Users,
  Trash2,
  X,
  Filter
} from 'lucide-react';
import Sidebar from '../components/Sidebar';
import Topbar from '../components/Topbar';
import { useTask } from '../context/TaskContext';

function Projects() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { projects, addProject, deleteProject } = useTask();

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [showModal, setShowModal] = useState(false);

  const [formData, setFormData] = useState({
    title: '',
    category: 'Development',
    status: 'In Progress',
    deadline: '',
  });

  const filteredProjects = projects.filter((proj) => {
    const matchesSearch =
      proj.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      proj.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'All' || proj.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleCreate = (e) => {
    e.preventDefault();
    if (!formData.title.trim() || !formData.deadline) return;
    addProject(formData);
    setFormData({ title: '', category: 'Development', status: 'In Progress', deadline: '' });
    setShowModal(false);
  };

  const getBadgeStyle = (status) => {
    if (status === 'Completed') return 'pill-completed';
    if (status === 'In Progress') return 'pill-progress';
    return 'pill-todo';
  };

  return (
    <div className="app-layout">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="tf-main-wrapper">
        <Topbar pageTitle="My Projects" onMenuClick={() => setSidebarOpen(true)} />

        <main className="container-fluid p-4">
          {/* Header & Controls */}
          <div className="d-flex flex-wrap justify-content-between align-items-center gap-3 mb-4">
            <div>
              <h4 className="fw-bold mb-1">All Workspace Projects</h4>
              <p className="text-muted mb-0 small">
                Manage, track progress, and organize your team deliverables.
              </p>
            </div>

            <button className="btn-tf-primary" onClick={() => setShowModal(true)}>
              <Plus size={18} /> Create Project
            </button>
          </div>

          {/* Search & Filter Bar */}
          <div className="tf-card mb-4 p-3">
            <div className="row g-3 align-items-center">
              <div className="col-md-6">
                <div className="tf-search-box w-100">
                  <Search size={18} className="text-muted" />
                  <input
                    type="text"
                    placeholder="Search by project name or category..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>

              <div className="col-md-6 d-flex flex-wrap align-items-center justify-content-md-end gap-2">
                <Filter size={16} className="text-muted me-1" />
                {['All', 'In Progress', 'Completed', 'Pending'].map((status) => (
                  <button
                    key={status}
                    onClick={() => setStatusFilter(status)}
                    className={`btn btn-sm rounded-pill px-3 fw-semibold ${
                      statusFilter === status
                        ? 'btn-primary'
                        : 'btn-light border text-secondary'
                    }`}
                  >
                    {status}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Project Cards Grid */}
          <div className="row g-4">
            <AnimatePresence>
              {filteredProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.25, delay: index * 0.04 }}
                  className="col-md-6 col-xl-4"
                >
                  <div className="tf-card h-100 d-flex flex-column justify-content-between">
                    <div>
                      <div className="d-flex justify-content-between align-items-start mb-3">
                        <div className="stat-badge-icon icon-indigo">
                          <FolderKanban size={22} />
                        </div>
                        <div className="d-flex align-items-center gap-2">
                          <span className={`tf-pill ${getBadgeStyle(project.status)}`}>
                            {project.status}
                          </span>
                          <button
                            onClick={() => deleteProject(project.id)}
                            className="btn btn-sm btn-light text-danger rounded-circle p-1"
                            title="Delete Project"
                          >
                            <Trash2 size={15} />
                          </button>
                        </div>
                      </div>

                      <span className="badge bg-light text-primary border mb-2">
                        {project.category}
                      </span>
                      <h5 className="fw-bold text-dark mb-3">{project.title}</h5>
                    </div>

                    <div>
                      <div className="d-flex justify-content-between small mb-1">
                        <span className="text-muted fw-medium">Completion</span>
                        <span className="fw-bold text-primary">{project.progress}%</span>
                      </div>
                      <div className="progress mb-3" style={{ height: '8px', borderRadius: '99px' }}>
                        <div
                          className="progress-bar"
                          style={{
                            width: `${project.progress}%`,
                            background: 'linear-gradient(90deg, #4f46e5, #0ea5e9)'
                          }}
                        />
                      </div>

                      <div className="d-flex justify-content-between align-items-center pt-3 border-top text-muted small">
                        <span className="d-flex align-items-center gap-1">
                          <Calendar size={14} /> {project.deadline}
                        </span>
                        <span className="d-flex align-items-center gap-1">
                          <Users size={14} /> {project.teamCount} Members
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {filteredProjects.length === 0 && (
              <div className="col-12 text-center py-5">
                <h5 className="text-muted">No matching projects found.</h5>
                <p className="small text-muted">Try clearing filters or create a new project.</p>
              </div>
            )}
          </div>
        </main>
      </div>

      {/* CREATE PROJECT MODAL */}
      {showModal && (
        <div
          className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center p-3"
          style={{ backgroundColor: 'rgba(15, 23, 42, 0.55)', zIndex: 1060, backdropFilter: 'blur(4px)' }}
        >
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            className="bg-white rounded-4 p-4 shadow-lg w-100"
            style={{ maxWidth: '460px' }}
          >
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h5 className="fw-bold mb-0">Create New Project</h5>
              <button className="btn btn-light rounded-circle p-1" onClick={() => setShowModal(false)}>
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleCreate}>
              <div className="mb-3">
                <label className="form-label small fw-semibold">Project Name</label>
                <input
                  type="text"
                  className="form-control rounded-3"
                  placeholder="e.g., SaaS Analytics Portal"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  required
                />
              </div>

              <div className="row g-3 mb-3">
                <div className="col-6">
                  <label className="form-label small fw-semibold">Category</label>
                  <select
                    className="form-select rounded-3"
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  >
                    <option value="Development">Development</option>
                    <option value="Design">Design</option>
                    <option value="Marketing">Marketing</option>
                    <option value="Research">Research</option>
                  </select>
                </div>

                <div className="col-6">
                  <label className="form-label small fw-semibold">Initial Status</label>
                  <select
                    className="form-select rounded-3"
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                  >
                    <option value="Pending">Pending</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Completed">Completed</option>
                  </select>
                </div>
              </div>

              <div className="mb-4">
                <label className="form-label small fw-semibold">Target Deadline</label>
                <input
                  type="date"
                  className="form-control rounded-3"
                  value={formData.deadline}
                  onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
                  required
                />
              </div>

              <div className="d-flex justify-content-end gap-2">
                <button type="button" className="btn btn-light rounded-3 px-3" onClick={() => setShowModal(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn-tf-primary">
                  Save Project
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
}

export default Projects;