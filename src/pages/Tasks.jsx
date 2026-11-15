import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Plus,
  Calendar,
  User,
  Trash2,
  ArrowRight,
  ArrowLeft,
  X,
  Flag
} from 'lucide-react';
import Sidebar from '../components/Sidebar';
import Topbar from '../components/Topbar';
import { useTask } from '../context/TaskContext';

function Tasks() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { tasks, projects, team, addTask, updateTaskStatus, deleteTask } = useTask();

  const [showModal, setShowModal] = useState(false);
  const [newTask, setNewTask] = useState({
    title: '',
    project: projects[0]?.title || 'Website Redesign',
    status: 'To Do',
    priority: 'Medium',
    dueDate: '',
    assignee: team[0]?.name || 'Manisha'
  });

  const columns = [
    { id: 'To Do', title: 'To Do', accent: '#f59e0b', bg: '#fffbeb' },
    { id: 'In Progress', title: 'In Progress', accent: '#4f46e5', bg: '#eef2ff' },
    { id: 'Completed', title: 'Completed', accent: '#10b981', bg: '#ecfdf5' },
  ];

  const handleAddTask = (e) => {
    e.preventDefault();
    if (!newTask.title.trim() || !newTask.dueDate) return;
    addTask(newTask);
    setNewTask({
      title: '',
      project: projects[0]?.title || 'Website Redesign',
      status: 'To Do',
      priority: 'Medium',
      dueDate: '',
      assignee: team[0]?.name || 'Manisha'
    });
    setShowModal(false);
  };

  const getPriorityBadge = (priority) => {
    if (priority === 'High') return 'bg-danger bg-opacity-10 text-danger';
    if (priority === 'Medium') return 'bg-warning bg-opacity-10 text-warning';
    return 'bg-info bg-opacity-10 text-info';
  };

  return (
    <div className="app-layout">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="tf-main-wrapper">
        <Topbar pageTitle="Kanban Task Board" onMenuClick={() => setSidebarOpen(true)} />

        <main className="container-fluid p-4">
          <div className="d-flex flex-wrap justify-content-between align-items-center gap-3 mb-4">
            <div>
              <h4 className="fw-bold mb-1">Task Workflow Board</h4>
              <p className="text-muted mb-0 small">
                Move tasks across stages and keep your sprint on schedule.
              </p>
            </div>

            <button className="btn-tf-primary" onClick={() => setShowModal(true)}>
              <Plus size={18} /> Add New Task
            </button>
          </div>

          {/* 3-Column Kanban Grid */}
          <div className="row g-4">
            {columns.map((col) => {
              const colTasks = tasks.filter((t) => t.status === col.id);

              return (
                <div key={col.id} className="col-lg-4">
                  <div
                    className="rounded-4 p-3 h-100"
                    style={{ backgroundColor: '#f1f5f9', border: '1px solid #e2e8f0' }}
                  >
                    {/* Column Header */}
                    <div className="d-flex align-items-center justify-content-between mb-3 px-1">
                      <div className="d-flex align-items-center gap-2">
                        <span
                          className="rounded-circle"
                          style={{ width: 10, height: 10, backgroundColor: col.accent }}
                        />
                        <h6 className="fw-bold mb-0">{col.title}</h6>
                      </div>
                      <span
                        className="badge rounded-pill fw-bold"
                        style={{ backgroundColor: col.bg, color: col.accent }}
                      >
                        {colTasks.length}
                      </span>
                    </div>

                    {/* Task Cards */}
                    <div className="d-flex flex-column gap-3">
                      <AnimatePresence>
                        {colTasks.map((task) => (
                          <motion.div
                            key={task.id}
                            layout
                            initial={{ opacity: 0, y: 12 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            transition={{ duration: 0.22 }}
                            className="bg-white rounded-4 p-3 shadow-sm border"
                          >
                            <div className="d-flex justify-content-between align-items-center mb-2">
                              <span className={`badge rounded-pill px-2 py-1 ${getPriorityBadge(task.priority)}`}>
                                <Flag size={11} className="me-1" />
                                {task.priority}
                              </span>

                              <button
                                onClick={() => deleteTask(task.id)}
                                className="btn btn-sm text-muted p-0"
                                title="Delete Task"
                              >
                                <Trash2 size={15} />
                              </button>
                            </div>

                            <h6 className="fw-bold text-dark mb-1">{task.title}</h6>
                            <small className="text-primary fw-medium d-block mb-3">
                              {task.project}
                            </small>

                            <div className="d-flex justify-content-between align-items-center text-muted small pt-2 border-top">
                              <span className="d-flex align-items-center gap-1">
                                <User size={13} /> {task.assignee}
                              </span>
                              <span className="d-flex align-items-center gap-1">
                                <Calendar size={13} /> {task.dueDate}
                              </span>
                            </div>

                            {/* Quick Stage Move Buttons */}
                            <div className="d-flex justify-content-between gap-2 mt-3 pt-2 border-top">
                              {col.id !== 'To Do' ? (
                                <button
                                  onClick={() =>
                                    updateTaskStatus(
                                      task.id,
                                      col.id === 'Completed' ? 'In Progress' : 'To Do'
                                    )
                                  }
                                  className="btn btn-sm btn-light border flex-grow-1 d-flex align-items-center justify-content-center gap-1"
                                >
                                  <ArrowLeft size={14} /> Move Back
                                </button>
                              ) : (
                                <div />
                              )}

                              {col.id !== 'Completed' && (
                                <button
                                  onClick={() =>
                                    updateTaskStatus(
                                      task.id,
                                      col.id === 'To Do' ? 'In Progress' : 'Completed'
                                    )
                                  }
                                  className="btn btn-sm btn-outline-primary flex-grow-1 d-flex align-items-center justify-content-center gap-1 fw-semibold"
                                >
                                  Advance <ArrowRight size={14} />
                                </button>
                              )}
                            </div>
                          </motion.div>
                        ))}
                      </AnimatePresence>

                      {colTasks.length === 0 && (
                        <div className="text-center py-4 text-muted small border border-dashed rounded-3">
                          No tasks in {col.title}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </main>
      </div>

      {/* ADD TASK MODAL */}
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
              <h5 className="fw-bold mb-0">Add New Task</h5>
              <button className="btn btn-light rounded-circle p-1" onClick={() => setShowModal(false)}>
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleAddTask}>
              <div className="mb-3">
                <label className="form-label small fw-semibold">Task Title</label>
                <input
                  type="text"
                  className="form-control rounded-3"
                  placeholder="e.g., Fix mobile navbar responsiveness"
                  value={newTask.title}
                  onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                  required
                />
              </div>

              <div className="row g-3 mb-3">
                <div className="col-6">
                  <label className="form-label small fw-semibold">Project</label>
                  <select
                    className="form-select rounded-3"
                    value={newTask.project}
                    onChange={(e) => setNewTask({ ...newTask, project: e.target.value })}
                  >
                    {projects.map((p) => (
                      <option key={p.id} value={p.title}>{p.title}</option>
                    ))}
                  </select>
                </div>

                <div className="col-6">
                  <label className="form-label small fw-semibold">Priority</label>
                  <select
                    className="form-select rounded-3"
                    value={newTask.priority}
                    onChange={(e) => setNewTask({ ...newTask, priority: e.target.value })}
                  >
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                  </select>
                </div>
              </div>

              <div className="row g-3 mb-4">
                <div className="col-6">
                  <label className="form-label small fw-semibold">Assignee</label>
                  <select
                    className="form-select rounded-3"
                    value={newTask.assignee}
                    onChange={(e) => setNewTask({ ...newTask, assignee: e.target.value })}
                  >
                    {team.map((m) => (
                      <option key={m.id} value={m.name}>{m.name}</option>
                    ))}
                  </select>
                </div>

                <div className="col-6">
                  <label className="form-label small fw-semibold">Due Date</label>
                  <input
                    type="date"
                    className="form-control rounded-3"
                    value={newTask.dueDate}
                    onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="d-flex justify-content-end gap-2">
                <button type="button" className="btn btn-light rounded-3 px-3" onClick={() => setShowModal(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn-tf-primary">
                  Create Task
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
}

export default Tasks;