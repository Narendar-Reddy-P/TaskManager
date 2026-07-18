import { useEffect, useState } from "react";
import api from "../api/axios";
import { useAuth } from "../context/AuthContext";
import TaskForm from "../components/TaskForm";
import TaskItem from "../components/TaskItem";

function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { user, logout } = useAuth();

  const fetchTasks = async () => {
    try {
      const { data } = await api.get("/tasks");
      setTasks(data);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load tasks");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleCreate = async (taskData) => {
    const { data } = await api.post("/tasks", taskData);
    setTasks([data, ...tasks]);
  };

  const handleDelete = async (id) => {
    await api.delete(`/tasks/${id}`);
    setTasks(tasks.filter((t) => t._id !== id));
  };

  const handleStatusChange = async (id, status) => {
    const { data } = await api.put(`/tasks/${id}`, { status });
    setTasks(tasks.map((t) => (t._id === id ? data : t)));
  };

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <h1>Task Manager</h1>
        <div>
          <span>Hi, {user?.name}</span>
          <button className="btn-logout" onClick={logout}>
            Logout
          </button>
        </div>
      </header>

      <TaskForm onCreate={handleCreate} />

      {loading && <p>Loading tasks...</p>}
      {error && <p className="error-text">{error}</p>}

      <div className="task-list">
        {!loading && tasks.length === 0 && <p>No tasks yet. Add one above!</p>}
        {tasks.map((task) => (
          <TaskItem
            key={task._id}
            task={task}
            onDelete={handleDelete}
            onStatusChange={handleStatusChange}
          />
        ))}
      </div>
    </div>
  );
}

export default Dashboard;
