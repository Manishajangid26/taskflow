import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Download,
  TrendingUp,
  CheckCircle2,
  AlertCircle,
  Target,
  Award
} from 'lucide-react';
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from 'recharts';
import Sidebar from '../components/Sidebar';
import Topbar from '../components/Topbar';
import { useTask } from '../context/TaskContext';
import './Reports.css';

const monthlyVelocity = [
  { month: 'Jun', efficiency: 68, target: 75 },
  { month: 'Jul', efficiency: 74, target: 78 },
  { month: 'Aug', efficiency: 79, target: 80 },
  { month: 'Sep', efficiency: 85, target: 82 },
  { month: 'Oct', efficiency: 88, target: 85 },
  { month: 'Nov', efficiency: 94, target: 90 },
];

function Reports() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { projects, tasks, team } = useTask();

  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((t) => t.status === 'Completed').length;
  const highPriorityTasks = tasks.filter((t) => t.priority === 'High').length;
  const completionRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  // Dynamic Project vs Task Breakdown for BarChart
  const projectChartData = projects.map((proj) => {
    const pTasks = tasks.filter((t) => t.project === proj.title);
    const done = pTasks.filter((t) => t.status === 'Completed').length;
    const pending = pTasks.length - done;
    return {
      name: proj.title.length > 14 ? proj.title.slice(0, 14) + '…' : proj.title,
      Completed: done,
      Pending: pending,
    };
  });

  // Dynamic Team Output Data
  const teamChartData = team.map((member) => {
    const mTasks = tasks.filter((t) => t.assignee === member.name);
    return {
      name: member.name.split(' ')[0],
      Assigned: mTasks.length,
      Completed: mTasks.filter((t) => t.status === 'Completed').length,
    };
  });

  // Export live data as CSV file
  const handleExportCSV = () => {
    const headers = ['Task ID,Task Title,Project,Status,Priority,Assignee,Due Date'];
    const rows = tasks.map(
      (t) => `${t.id},"${t.title}","${t.project}",${t.status},${t.priority},"${t.assignee}",${t.dueDate}`
    );
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers, ...rows].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'TaskFlow_Analytics_Report.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const kpis = [
    {
      label: 'Task Completion Rate',
      value: `${completionRate}%`,
      sub: `${completedTasks} of ${totalTasks} tasks done`,
      icon: CheckCircle2,
      iconBg: 'icon-emerald',
    },
    {
      label: 'On-Time Sprint Score',
      value: '94%',
      sub: '+6% vs last month',
      icon: Target,
      iconBg: 'icon-indigo',
    },
    {
      label: 'High Priority Items',
      value: highPriorityTasks,
      sub: 'Requires immediate focus',
      icon: AlertCircle,
      iconBg: 'icon-amber',
    },
    {
      label: 'Top Contributor',
      value: team[0]?.name || 'Manisha',
      sub: 'Highest task velocity',
      icon: Award,
      iconBg: 'icon-sky',
    },
  ];

  return (
    <div className="dashboard-layout">
      <div className="dashboard-main-wrapper">
        <Topbar pageTitle="Reports & Analytics" onMenuClick={() => setSidebarOpen(true)} />

        <main className="container-fluid p-4">
          {/* Header */}
          <div className="d-flex flex-wrap justify-content-between align-items-center gap-3 mb-4">
            <div>
              <h4 className="fw-bold mb-1">Performance & Productivity Insights</h4>
              <p className="text-muted mb-0 small">
                Real-time analytics across all workspace projects, sprints, and team members.
              </p>
            </div>

            <button className="rep-export-btn" onClick={handleExportCSV}>
              <Download size={17} /> Export CSV Report
            </button>
          </div>

          {/* 4 KPI Cards */}
          <div className="row g-4 mb-4">
            {kpis.map((item, idx) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.label}
                  className="col-sm-6 col-xl-3"
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.07, duration: 0.35 }}
                >
                  <div className="rep-kpi-card">
                    <div className="d-flex justify-content-between align-items-start mb-3">
                      <div className={`stat-badge-icon ${item.iconBg}`}>
                        <Icon size={22} />
                      </div>
                      <TrendingUp size={16} className="text-success" />
                    </div>
                    <div className="text-muted small fw-medium">{item.label}</div>
                    <h3 className="fw-bold text-dark my-1">{item.value}</h3>
                    <small className="text-muted">{item.sub}</small>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Charts Row 1 */}
          <div className="row g-4 mb-4">
            {/* Project Tasks Comparison Bar Chart */}
            <motion.div
              className="col-lg-6"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="rep-chart-box">
                <div className="mb-3">
                  <h6 className="fw-bold mb-0">Project-Wise Task Breakdown</h6>
                  <small className="text-muted">Completed vs Pending tasks per project</small>
                </div>

                <div style={{ width: '100%', height: 290 }}>
                  <ResponsiveContainer>
                    <BarChart data={projectChartData} barGap={6}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
                      <XAxis dataKey="name" stroke="#64748b" fontSize={12} tickLine={false} />
                      <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} allowDecimals={false} />
                      <Tooltip
                        contentStyle={{
                          borderRadius: '12px',
                          border: '1px solid #e2e8f0',
                          boxShadow: '0 10px 25px rgba(0,0,0,0.08)'
                        }}
                      />
                      <Legend />
                      <Bar dataKey="Completed" fill="#10b981" radius={[6, 6, 0, 0]} />
                      <Bar dataKey="Pending" fill="#4f46e5" radius={[6, 6, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </motion.div>

            {/* Monthly Efficiency Line Chart */}
            <motion.div
              className="col-lg-6"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 }}
            >
              <div className="rep-chart-box">
                <div className="mb-3">
                  <h6 className="fw-bold mb-0">Workspace Efficiency Trend</h6>
                  <small className="text-muted">Actual sprint efficiency vs target benchmark (%)</small>
                </div>

                <div style={{ width: '100%', height: 290 }}>
                  <ResponsiveContainer>
                    <LineChart data={monthlyVelocity}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
                      <XAxis dataKey="month" stroke="#64748b" fontSize={12} tickLine={false} />
                      <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} domain={[50, 100]} />
                      <Tooltip
                        contentStyle={{
                          borderRadius: '12px',
                          border: '1px solid #e2e8f0',
                          boxShadow: '0 10px 25px rgba(0,0,0,0.08)'
                        }}
                      />
                      <Legend />
                      <Line
                        type="monotone"
                        dataKey="efficiency"
                        name="Actual Efficiency %"
                        stroke="#4f46e5"
                        strokeWidth={3}
                        dot={{ r: 5, fill: '#4f46e5' }}
                      />
                      <Line
                        type="monotone"
                        dataKey="target"
                        name="Target %"
                        stroke="#0ea5e9"
                        strokeWidth={2}
                        strokeDasharray="5 5"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Bottom Row: Team Productivity Chart + Project Summary Table */}
          <div className="row g-4">
            <div className="col-lg-5">
              <div className="rep-chart-box">
                <div className="mb-3">
                  <h6 className="fw-bold mb-0">Team Workload Distribution</h6>
                  <small className="text-muted">Assigned vs Completed tasks by member</small>
                </div>

                <div style={{ width: '100%', height: 260 }}>
                  <ResponsiveContainer>
                    <BarChart data={teamChartData} layout="vertical">
                      <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" horizontal={false} />
                      <XAxis type="number" stroke="#64748b" fontSize={12} allowDecimals={false} />
                      <YAxis dataKey="name" type="category" stroke="#0f172a" fontSize={12} width={70} />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="Assigned" fill="#94a3b8" radius={[0, 6, 6, 0]} />
                      <Bar dataKey="Completed" fill="#4f46e5" radius={[0, 6, 6, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>

            <div className="col-lg-7">
              <div className="rep-table-card h-100">
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <div>
                    <h6 className="fw-bold mb-0">Project Health Summary</h6>
                    <small className="text-muted">Live status & deadline audit</small>
                  </div>
                </div>

                <div className="table-responsive">
                  <table className="table rep-table mb-0">
                    <thead>
                      <tr>
                        <th>Project</th>
                        <th>Category</th>
                        <th>Deadline</th>
                        <th>Status</th>
                        <th>Progress</th>
                      </tr>
                    </thead>
                    <tbody>
                      {projects.map((p) => (
                        <tr key={p.id}>
                          <td className="fw-bold text-dark">{p.title}</td>
                          <td>
                            <span className="badge bg-light text-primary border">{p.category}</span>
                          </td>
                          <td className="text-muted">{p.deadline}</td>
                          <td>
                            <span
                              className={`tf-pill ${
                                p.status === 'Completed'
                                  ? 'pill-completed'
                                  : p.status === 'In Progress'
                                  ? 'pill-progress'
                                  : 'pill-todo'
                              }`}
                            >
                              {p.status}
                            </span>
                          </td>
                          <td style={{ width: '140px' }}>
                            <div className="d-flex align-items-center gap-2">
                              <div className="progress flex-grow-1" style={{ height: '6px' }}>
                                <div
                                  className="progress-bar bg-primary"
                                  style={{ width: `${p.progress}%` }}
                                />
                              </div>
                              <small className="fw-bold">{p.progress}%</small>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>

      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
    </div>
  );
}

export default Reports;