import { createContext, useContext, useState, useEffect } from 'react';

const TaskContext = createContext();

const initialData = {
  user: null,
  projects: [
    { id: 1, title: 'Website Redesign', category: 'Design', status: 'In Progress', progress: 75, deadline: '2026-11-25', teamCount: 4 },
    { id: 2, title: 'Mobile App UI', category: 'Development', status: 'Completed', progress: 100, deadline: '2026-11-10', teamCount: 3 },
    { id: 3, title: 'Marketing Campaign', category: 'Marketing', status: 'Pending', progress: 30, deadline: '2026-12-05', teamCount: 5 },
    { id: 4, title: 'E-Commerce Backend API', category: 'Development', status: 'In Progress', progress: 60, deadline: '2026-12-12', teamCount: 2 },
  ],
  tasks: [
    { id: 101, title: 'Design Hero Section', project: 'Website Redesign', status: 'Completed', priority: 'High', dueDate: '2026-11-14', assignee: 'Aarav Sharma' },
    { id: 102, title: 'Setup React Router & Context', project: 'Website Redesign', status: 'In Progress', priority: 'High', dueDate: '2026-11-16', assignee: 'Manisha' },
    { id: 103, title: 'Create Kanban Board UI', project: 'Mobile App UI', status: 'To Do', priority: 'Medium', dueDate: '2026-11-18', assignee: 'Priya Verma' },
    { id: 104, title: 'Write Q4 Ad Copy', project: 'Marketing Campaign', status: 'To Do', priority: 'Low', dueDate: '2026-11-22', assignee: 'Rohan Das' },
    { id: 105, title: 'Integrate Recharts Analytics', project: 'Website Redesign', status: 'In Progress', priority: 'Medium', dueDate: '2026-11-20', assignee: 'Manisha' },
  ],
  team: [
    { id: 1, name: 'Manisha', role: 'Project Lead & Full Stack Dev', email: 'manisha@taskflow.io', status: 'Active', tasksAssigned: 8 },
    { id: 2, name: 'Aarav Sharma', role: 'UI/UX Designer', email: 'aarav@taskflow.io', status: 'Active', tasksAssigned: 5 },
    { id: 3, name: 'Priya Verma', role: 'Frontend Developer', email: 'priya@taskflow.io', status: 'In Meeting', tasksAssigned: 6 },
    { id: 4, name: 'Rohan Das', role: 'Marketing Strategist', email: 'rohan@taskflow.io', status: 'Offline', tasksAssigned: 4 },
  ]
};

export function TaskProvider({ children }) {
  const [user, setUser] = useState(() => JSON.parse(localStorage.getItem('tf_user')) || null);
  const [projects, setProjects] = useState(() => JSON.parse(localStorage.getItem('tf_projects')) || initialData.projects);
  const [tasks, setTasks] = useState(() => JSON.parse(localStorage.getItem('tf_tasks')) || initialData.tasks);
  const [team, setTeam] = useState(() => JSON.parse(localStorage.getItem('tf_team')) || initialData.team);
  const [theme, setTheme] = useState(() => localStorage.getItem('tf_theme') || 'light');

  useEffect(() => { localStorage.setItem('tf_user', JSON.stringify(user)); }, [user]);
  useEffect(() => { localStorage.setItem('tf_projects', JSON.stringify(projects)); }, [projects]);
  useEffect(() => { localStorage.setItem('tf_tasks', JSON.stringify(tasks)); }, [tasks]);
  useEffect(() => { localStorage.setItem('tf_team', JSON.stringify(team)); }, [team]);

  useEffect(() => {
    localStorage.setItem('tf_theme', theme);
    document.body.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = (selectedTheme) => {
    if (selectedTheme) {
      setTheme(selectedTheme);
    } else {
      setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
    }
  };

  const loginUser = (userData) => setUser(userData);
  const logoutUser = () => {
    setUser(null);
    localStorage.removeItem('tf_user');
  };

  const addProject = (newProj) => {
    setProjects([{ ...newProj, id: Date.now(), progress: 0, teamCount: 1 }, ...projects]);
  };

  const deleteProject = (projectId) => {
    setProjects(projects.filter((p) => p.id !== projectId));
  };

  const addTask = (newTask) => {
    setTasks([{ ...newTask, id: Date.now() }, ...tasks]);
  };

  const updateTaskStatus = (taskId, newStatus) => {
    setTasks(tasks.map((t) => (t.id === taskId ? { ...t, status: newStatus } : t)));
  };

  const deleteTask = (taskId) => {
    setTasks(tasks.filter((t) => t.id !== taskId));
  };

  return (
    <TaskContext.Provider
      value={{
        user,
        loginUser,
        logoutUser,
        projects,
        addProject,
        deleteProject,
        tasks,
        addTask,
        updateTaskStatus,
        deleteTask,
        team,
        setTeam,
        theme,
        toggleTheme,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
}

export const useTask = () => useContext(TaskContext);