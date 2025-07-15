import React from 'react';

function Task({
  task,
  toggleComplete,
  deleteTask,
  startEditing,
  saveEdit,
  cancelEdit,
  setTaskPriority,
  setTaskDueDate,
  editingId,
  editInput,
  setEditInput,
}) {
  const priorities = ['high', 'medium', 'low'];

  return (
    <div className="task">
      <input
        type="checkbox"
        checked={task.completed}
        onChange={() => toggleComplete(task.id)}
      />
      {editingId === task.id ? (
        <>
          <input
            type="text"
            value={editInput}
            onChange={(e) => setEditInput(e.target.value)}
          />
          <button onClick={() => saveEdit(task.id)}>Save</button>
          <button onClick={cancelEdit}>Cancel</button>
        </>
      ) : (
        <>
          <span
            style={{ textDecoration: task.completed ? 'line-through' : 'none' }}
            onDoubleClick={() => startEditing(task.id, task.title)}
          >
            {task.title}
          </span>
          <select
            value={task.priority}
            onChange={(e) => setTaskPriority(task.id, e.target.value)}
          >
            {priorities.map((priority) => (
              <option key={priority} value={priority}>
                {priority.charAt(0).toUpperCase() + priority.slice(1)}
              </option>
            ))}
          </select>
          <input
            type="date"
            value={task.dueDate || ''}
            onChange={(e) => setTaskDueDate(task.id, e.target.value)}
          />
          <button onClick={() => deleteTask(task.id)}>Delete</button>
        </>
      )}
    </div>
  );
}

export default Task;
