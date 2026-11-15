import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  FolderKanban,
  Clock,
  CheckCircle2,
  Users,
  TrendingUp,
  ArrowUpRight,
  CheckCircle
} from 'lucide-react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { Link } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Topbar from '../components/Topbar';
import { useTask } from '../context/TaskContext';

const weeklyData = [
  { day: 'Mon', completed: 4, created: 6 },
  { day: 'Tue', completed: 7, created: 8 },
  { day: 'Wed', completed: 5, created: 7 },
  { day: 'Thu', completed: 10, created: 9 },
  { day: 'Fri', completed: 12, created: 11 },
  { day: 'Sat', completed: 9, created: 6 },
  { day: 'Sun', completed: 14, created: 10 },
];

function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { projects, tasks, team, updateTaskStatus } = useTask();

  const completedTasks = tasks.filter((t) => t.status === 'Completed').length;
  const inProgressTasks = tasks.filter((t) => t.status === 'In Progress').length;
  const todoTasks = tasks.filter((t) => t.status === 'To Do').length;

  const pieData = [
    { name: 'Completed', value: completedTasks || 1, color: '#10b981' },
    { name: 'In Progress', value: inProgressTasks || 1, color: '#4f46e5' },
    { name: 'To Do', value: todoTasks || 1, color: '#f59e0b' },
  ];

  const stats = [
    {
      label: 'Total Projects',
      value: projects.length,
      trend: '+2 this week',
      icon: FolderKanban,
      iconClass: 'icon-indigo',
    },
    {
      label: 'Pending Tasks',
      value: todoTasks + inProgressTasks,
      trend: `${inProgressTasks} in progress`,
      icon: Clock,
      iconClass: 'icon-amber',
    },
    {
      label: 'Completed Tasks',
      value: completedTasks,
      trend: '+18% efficiency',
      icon: CheckCircle2,
      iconClass: 'icon-emerald',
    },
    {
      label: 'Active Team',
      value: team.length,
      trend: 'All synced',
      icon: Users,
      iconClass: 'icon-sky',
    },
  ];

  const cycleStatus = (task) => {
    const order = ['To Do', 'In Progress', 'Completed'];
    const next = order[(order.indexOf(task.status) + 1) % order.length];
    updateTaskStatus(task.id, next);
  };

  return (
    <div className="app-layout">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="tf-main-wrapper">
        <Topbar
          pageTitle="Workspace Overview"
          onMenuClick={() => setSidebarOpen(true)}
        />

        <main className="container-fluid p-4">
          {/* Welcome Banner */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="rounded-4 p-4 mb-4 text-white d-flex flex-wrap align-items-center justify-content-between gap-3"
            style={{
              background: 'linear-gradient(120deg, #0f172a 0%, #312e81 55%, #4f46e5 100%)',
              boxShadow: '0 14px 30px -8px rgba(79, 70, 229, 0.35)'
            }}
          >
            <div>
              <span className="badge bg-white bg-opacity-10 text-info mb-2 px-3 py-1 rounded-pill">
                ✨ TaskFlow Pro Workspace
              </span>
              <h3 className="fw-bold mb-1">Welcome back, Manisha! 👋</h3>
              <p className="mb-0 text-white-50">
                You have <strong className="text-white">{todoTasks + inProgressTasks} active tasks</strong> across {projects.length} ongoing projects.
              </p>
            </div>
            <div className="d-flex gap-2">
              <Link to="/tasks" className="btn btn-light fw-semibold rounded-3 px-3 py-2">
                Open Kanban Board <ArrowUpRight size={16} />
              </Link>
            </div>
          </motion.div>

          {/* 4 KPI Stat Cards */}
          <div className="row g-4 mb-4">
            {stats.map((item, idx) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.label}
                  className="col-sm-6 col-xl-3"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.08, duration: 0.35 }}
                >
                  <div className="tf-card h-100">
                    <div className="d-flex justify-content-between align-items-start mb-3">
                      <div className={`stat-badge-icon ${item.iconClass}`}>
                        <Icon size={23} />
                      </div>
                      <span className="badge bg-light text-success border fw-semibold">
                        <TrendingUp size={12} className="me-1" />
                        {item.trend}
                      </span>
                    </div>
                    <div className="text-muted small fw-medium">{item.label}</div>
                    <h2 className="fw-extrabold mb-0 mt-1">{item.value}</h2>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Charts Row */}
          <div className="row g-4 mb-4">
            {/* Weekly Productivity Area Chart */}
            <motion.div
              className="col-lg-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 }}
            >
              <div className="tf-card h-100">
                <div className="d-flex justify-content-between align-items-center mb-4">
                  <div>
                    <h6 className="fw-bold mb-0">Weekly Task Velocity</h6>
                    <small className="text-muted">Tasks created vs completed this week</small>
                  </div>
                  <span className="badge bg-primary bg-opacity-10 text-primary px-3 py-2 rounded-pill">
                    Live Analytics
                  </span>
                </div>

                <div style={{ width: '100%', height: 280 }}>
                  <ResponsiveContainer>
                    <AreaChart data={weeklyData}>
                      <defs>
                        <linearGradient id="colorCompleted" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.35} />
                          <stop offset="95%" stopColor="#4f46e5" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
                      <XAxis dataKey="day" stroke="#94a3b8" fontSize={12} tickLine={false} />
                      <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                      <Tooltip
                        contentStyle={{
                          borderRadius: '12px',
                          border: '1px solid #e2e8f0',
                          boxShadow: '0 10px 25px rgba(0,0,0,0.08)'
                        }}
                      />
                      <Area
                        type="monotone"
                        dataKey="completed"
                        stroke="#4f46e5"
                        strokeWidth={3}
                        fillOpacity={1}
                        fill="url(#colorCompleted)"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </motion.div>

            {/* Task Distribution Donut Chart */}
            <motion.div
              className="col-lg-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <div className="tf-card h-100 d-flex flex-column justify-content-between">
                <div>
                  <h6 className="fw-bold mb-0">Task Status Breakdown</h6>
                  <small className="text-muted">Real-time workspace distribution</small>
                </div>

                <div style={{ width: '100%', height: 210 }}>
                  <ResponsiveContainer>
                    <PieChart>
                      <Pie
                        data={pieData}
                        innerRadius={58}
                        outerRadius={82}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {pieData.map((entry) => (
                          <Cell key={entry.name} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>

                <div className="d-flex justify-content-around pt-2 border-top">
                  {pieData.map((d) => (
                    <div key={d.name} className="text-center">
                      <span
                        className="d-inline-block rounded-circle me-1"
                        style={{ width: 9, height: 9, backgroundColor: d.color }}
                      />
                      <small className="text-muted d-block">{d.name}</small>
                      <strong>{d.value}</strong>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>

          {/* Bottom Row: Active Projects & Interactive Tasks */}
          <div className="row g-4">
            <div className="col-lg-6">
              <div className="tf-card h-100">
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <h6 className="fw-bold mb-0">Active Projects</h6>
                  <Link to="/projects" className="text-decoration-none small fw-semibold text-primary">
                    View All →
                  </Link>
                </div>

                <div className="d-flex flex-column gap-3">
                  {projects.slice(0, 3).map((proj) => (
                    <div key={proj.id} className="p-3 rounded-3 border bg-light bg-opacity-50">
                      <div className="d-flex justify-content-between align-items-center mb-2">
                        <div>
                          <div className="fw-bold text-dark">{proj.title}</div>
                          <small className="text-muted">{proj.category} • Due {proj.deadline}</small>
                        </div>
                        <span className="fw-bold text-primary">{proj.progress}%</span>
                      </div>
                      <div className="progress" style={{ height: '7px', borderRadius: '99px' }}>
                        <div
                          className="progress-bar"
                          style={{
                            width: `${proj.progress}%`,
                            background: 'linear-gradient(90deg, #4f46e5, #0ea5e9)'
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="col-lg-6">
              <div className="tf-card h-100">
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <div>
                    <h6 className="fw-bold mb-0">Quick Task Tracker</h6>
                    <small className="text-muted">Click any status badge to update live</small>
                  </div>
                  <Link to="/tasks" className="text-decoration-none small fw-semibold text-primary">
                    Kanban →
                  </Link>
                </div>

                <div className="d-flex flex-column gap-2">
                  {tasks.slice(0, 4).map((task) => {
                    const pillClass =
                      task.status === 'Completed'
                        ? 'pill-completed'
                        : task.status === 'In Progress'
                        ? 'pill-progress'
                        : 'pill-todo';

                    return (
                      <div
                        key={task.id}
                        className="d-flex align-items-center justify-content-between p-3 rounded-3 border"
                      >
                        <div className="d-flex align-items-center gap-3">
                          <CheckCircle
                            size={19}
                            className={task.status === 'Completed' ? 'text-success' : 'text-muted'}
                          />
                          <div>
                            <div
                              className={`fw-semibold ${
                                task.status === 'Completed' ? 'text-decoration-line-through text-muted' : ''
                              }`}
                            >
                              {task.title}
                            </div>
                            <small className="text-muted">{task.project} • {task.assignee}</small>
                          </div>
                        </div>

                        <button
                          onClick={() => cycleStatus(task)}
                          className={`tf-pill border-0 ${pillClass}`}
                          style={{ cursor: 'pointer' }}
                          title="Click to cycle status"
                        >
                          {task.status}
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Dashboard;