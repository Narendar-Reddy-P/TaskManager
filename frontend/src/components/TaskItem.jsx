function TaskItem({ task, onDelete, onStatusChange }) {
  const priorityColors = {
    low: "#4caf50",
    medium: "#ff9800",
    high: "#f44336",
  };

  return (
    <div className="task-card">
      <div className="task-header">
        <h3>{task.title}</h3>
        <span
          className="priority-badge"
          style={{ backgroundColor: priorityColors[task.priority] }}
        >
          {task.priority}
        </span>
      </div>
      {task.description && <p className="task-desc">{task.description}</p>}
      {task.dueDate && (
        <p className="task-due">Due: {new Date(task.dueDate).toLocaleDateString()}</p>
      )}
      <div className="task-footer">
        <select
          value={task.status}
          onChange={(e) => onStatusChange(task._id, e.target.value)}
        >
          <option value="todo">To Do</option>
          <option value="in-progress">In Progress</option>
          <option value="done">Done</option>
        </select>
        <button className="btn-delete" onClick={() => onDelete(task._id)}>
          Delete
        </button>
      </div>
    </div>
  );
}

export default TaskItem;
