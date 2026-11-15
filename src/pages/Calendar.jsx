import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  ChevronLeft,
  ChevronRight,
  CalendarDays,
  Clock,
  FolderKanban,
  CheckCircle2,
  Plus,
  X
} from 'lucide-react';
import Sidebar from '../components/Sidebar';
import Topbar from '../components/Topbar';
import { useTask } from '../context/TaskContext';
import './Calendar.css';

function Calendar() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { tasks, projects, team, addTask } = useTask();

  // Default to November 2026 so initial dummy deadlines show immediately
  const [currentDate, setCurrentDate] = useState(new Date(2026, 10, 1));
  const [selectedDateStr, setSelectedDateStr] = useState('2026-11-16');
  const [showModal, setShowModal] = useState(false);

  const [newTask, setNewTask] = useState({
    title: '',
    project: projects[0]?.title || 'Website Redesign',
    status: 'To Do',
    priority: 'Medium',
    dueDate: '2026-11-16',
    assignee: team[0]?.name || 'Manisha'
  });

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const firstDayOfMonth = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const formatDateStr = (day) => {
    const m = String(month + 1).padStart(2, '0');
    const d = String(day).padStart(2, '0');
    return `${year}-${m}-${d}`;
  };

  const prevMonth = () => setCurrentDate(new Date(year, month - 1, 1));
  const nextMonth = () => setCurrentDate(new Date(year, month + 1, 1));

  // Get tasks & project deadlines for a specific YYYY-MM-DD
  const getEventsForDate = (dateStr) => {
    const dayTasks = tasks.filter((t) => t.dueDate === dateStr);
    const dayProjects = projects.filter((p) => p.deadline === dateStr);
    return { dayTasks, dayProjects };
  };

  const selectedEvents = getEventsForDate(selectedDateStr);

  // Upcoming deadlines sorted chronologically
  const upcomingTasks = [...tasks]
    .filter((t) => t.status !== 'Completed')
    .sort((a, b) => a.dueDate.localeCompare(b.dueDate))
    .slice(0, 4);

  const handleOpenAddModal = () => {
    setNewTask({ ...newTask, dueDate: selectedDateStr });
    setShowModal(true);
  };

  const handleCreateScheduledTask = (e) => {
    e.preventDefault();
    if (!newTask.title.trim()) return;
    addTask(newTask);
    setNewTask({ ...newTask, title: '' });
    setShowModal(false);
  };

  // Build calendar cells
  const calendarCells = [];
  for (let i = 0; i < firstDayOfMonth; i++) {
    calendarCells.push({ empty: true, key: `empty-${i}` });
  }
  for (let d = 1; d <= daysInMonth; d++) {
    const dateStr = formatDateStr(d);
    calendarCells.push({
      empty: false,
      day: d,
      dateStr,
      key: dateStr,
      ...getEventsForDate(dateStr)
    });
  }

  return (
    <div className="dashboard-layout">
      <div className="dashboard-main-wrapper">
        <Topbar pageTitle="Schedule & Calendar" onMenuClick={() => setSidebarOpen(true)} />

        <main className="container-fluid p-4">
          {/* Top Header */}
          <div className="d-flex flex-wrap justify-content-between align-items-center gap-3 mb-4">
            <div>
              <h4 className="fw-bold mb-1">Project & Task Timeline</h4>
              <p className="text-muted mb-0 small">
                Click any date to inspect scheduled tasks or add a new deadline.
              </p>
            </div>

            <button className="btn-tf-primary" onClick={handleOpenAddModal}>
              <Plus size={18} /> Schedule on {selectedDateStr}
            </button>
          </div>

          <div className="row g-4">
            {/* Left 8 Cols: Monthly Calendar Grid */}
            <motion.div
              className="col-lg-8"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35 }}
            >
              <div className="cal-grid-card">
                {/* Month Switcher */}
                <div className="d-flex justify-content-between align-items-center mb-4">
                  <div className="d-flex align-items-center gap-2">
                    <div className="stat-badge-icon icon-indigo" style={{ width: 40, height: 40 }}>
                      <CalendarDays size={20} />
                    </div>
                    <h5 className="fw-bold mb-0">
                      {monthNames[month]} {year}
                    </h5>
                  </div>

                  <div className="d-flex align-items-center gap-2">
                    <button className="cal-nav-btn" onClick={prevMonth} title="Previous Month">
                      <ChevronLeft size={18} />
                    </button>
                    <button
                      className="btn btn-sm btn-light border fw-semibold px-3"
                      onClick={() => {
                        setCurrentDate(new Date(2026, 10, 1));
                        setSelectedDateStr('2026-11-13');
                      }}
                    >
                      Today
                    </button>
                    <button className="cal-nav-btn" onClick={nextMonth} title="Next Month">
                      <ChevronRight size={18} />
                    </button>
                  </div>
                </div>

                {/* Weekday Names */}
                <div className="cal-weekdays">
                  {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((w) => (
                    <div key={w}>{w}</div>
                  ))}
                </div>

                {/* Days Grid */}
                <div className="cal-days-grid">
                  {calendarCells.map((cell) => {
                    if (cell.empty) {
                      return <div key={cell.key} className="cal-day-cell empty" />;
                    }

                    const isSelected = cell.dateStr === selectedDateStr;
                    const isToday = cell.dateStr === '2026-11-13';

                    return (
                      <div
                        key={cell.key}
                        onClick={() => setSelectedDateStr(cell.dateStr)}
                        className={`cal-day-cell ${isSelected ? 'selected' : ''} ${
                          isToday ? 'today' : ''
                        }`}
                      >
                        <div className="d-flex justify-content-between align-items-center">
                          <span className="cal-day-num">{cell.day}</span>
                          {(cell.dayTasks.length + cell.dayProjects.length) > 0 && (
                            <span className="badge bg-primary bg-opacity-10 text-primary rounded-pill" style={{ fontSize: '0.65rem' }}>
                              {cell.dayTasks.length + cell.dayProjects.length}
                            </span>
                          )}
                        </div>

                        <div className="mt-1">
                          {cell.dayProjects.map((p) => (
                            <div key={p.id} className="cal-event-dot project" title={`Deadline: ${p.title}`}>
                              🚀 {p.title}
                            </div>
                          ))}
                          {cell.dayTasks.slice(0, 2).map((t) => (
                            <div key={t.id} className="cal-event-dot task" title={t.title}>
                              • {t.title}
                            </div>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </motion.div>

            {/* Right 4 Cols: Selected Date Agenda + Upcoming Deadlines */}
            <motion.div
              className="col-lg-4"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.35 }}
            >
              <div className="cal-agenda-card d-flex flex-column justify-content-between">
                <div>
                  <div className="d-flex justify-content-between align-items-center pb-3 mb-3 border-bottom">
                    <div>
                      <small className="text-muted text-uppercase fw-bold" style={{ fontSize: '0.7rem' }}>
                        Selected Date
                      </small>
                      <h5 className="fw-bold mb-0 text-primary">{selectedDateStr}</h5>
                    </div>
                    <button
                      onClick={handleOpenAddModal}
                      className="btn btn-sm btn-outline-primary rounded-3 fw-semibold"
                    >
                      + Add
                    </button>
                  </div>

                  {/* Selected Date Events */}
                  <div className="d-flex flex-column gap-2 mb-4">
                    {selectedEvents.dayProjects.map((proj) => (
                      <div key={proj.id} className="cal-agenda-item border-warning">
                        <div className="d-flex align-items-center gap-2 text-warning fw-bold small mb-1">
                          <FolderKanban size={15} /> Project Deadline
                        </div>
                        <div className="fw-bold text-dark">{proj.title}</div>
                        <small className="text-muted">{proj.category} • {proj.progress}% complete</small>
                      </div>
                    ))}

                    {selectedEvents.dayTasks.map((task) => (
                      <div key={task.id} className="cal-agenda-item">
                        <div className="d-flex justify-content-between align-items-center mb-1">
                          <span className="badge bg-primary bg-opacity-10 text-primary">
                            {task.project}
                          </span>
                          <small className="text-muted fw-semibold">{task.status}</small>
                        </div>
                        <div className="fw-bold text-dark">{task.title}</div>
                        <small className="text-muted">Assigned to {task.assignee}</small>
                      </div>
                    ))}

                    {selectedEvents.dayProjects.length === 0 &&
                      selectedEvents.dayTasks.length === 0 && (
                        <div className="text-center py-4 rounded-4 bg-light border border-dashed">
                          <Clock size={24} className="text-muted mb-2" />
                          <div className="small fw-semibold text-muted">No deadlines on this date</div>
                          <small className="text-muted">Click "+ Add" to schedule a task.</small>
                        </div>
                      )}
                  </div>
                </div>

                {/* Upcoming Deadlines Summary */}
                <div className="pt-3 border-top">
                  <h6 className="fw-bold mb-3 d-flex align-items-center gap-2">
                    <CheckCircle2 size={17} className="text-success" />
                    Upcoming Deadlines
                  </h6>
                  <div className="d-flex flex-column gap-2">
                    {upcomingTasks.map((t) => (
                      <div
                        key={t.id}
                        onClick={() => setSelectedDateStr(t.dueDate)}
                        className="d-flex justify-content-between align-items-center p-2 rounded-3 bg-light"
                        style={{ cursor: 'pointer' }}
                      >
                        <div className="text-truncate pe-2">
                          <div className="small fw-bold text-dark text-truncate">{t.title}</div>
                          <small className="text-muted" style={{ fontSize: '0.72rem' }}>{t.project}</small>
                        </div>
                        <span className="badge bg-white text-dark border">{t.dueDate}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </main>
      </div>

      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* SCHEDULE TASK MODAL */}
      {showModal && (
        <div
          className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center p-3"
          style={{ backgroundColor: 'rgba(15, 23, 42, 0.55)', zIndex: 100000, backdropFilter: 'blur(4px)' }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-4 p-4 shadow-lg w-100"
            style={{ maxWidth: '430px' }}
          >
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h5 className="fw-bold mb-0">Schedule Task</h5>
              <button className="btn btn-light rounded-circle p-1" onClick={() => setShowModal(false)}>
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleCreateScheduledTask}>
              <div className="mb-3">
                <label className="form-label small fw-semibold">Task Title</label>
                <input
                  type="text"
                  className="form-control rounded-3"
                  placeholder="e.g., Client Demo Presentation"
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

              <div className="d-flex justify-content-end gap-2 mt-4">
                <button type="button" className="btn btn-light rounded-3 px-3" onClick={() => setShowModal(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn-tf-primary">
                  Add to Calendar
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
}

export default Calendar;