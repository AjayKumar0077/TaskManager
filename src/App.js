import React, { useState, useEffect } from 'react';
import Task from './Task';
import './App.css';

function App() {
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem('tasks');
    return saved ? JSON.parse(saved) : [];
  });
  const [input, setInput] = useState('');
  const [filter, setFilter] = useState('all');
  const [editingId, setEditingId] = useState(null);
  const [editInput, setEditInput] = useState('');
  const [priorityFilter, setPriorityFilter] = useState('all');

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (!input.trim()) return;
    const newTask = {
      id: Date.now(),
      title: input,
      completed: false,
      priority: 'medium',
      dueDate: null,
    };
    setTasks([newTask, ...tasks]);
    setInput('');
  };

  const toggleComplete = (id) => {
    setTasks(tasks.map((task) =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const startEditing = (id, currentTitle) => {
    setEditingId(id);
    setEditInput(currentTitle);
  };

  const saveEdit = (id) => {
    if (!editInput.trim()) return;
    setTasks(tasks.map((task) =>
      task.id === id ? { ...task, title: editInput } : task
    ));
    setEditingId(null);
    setEditInput('');
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditInput('');
  };

  const setTaskPriority = (id, priority) => {
    setTasks(tasks.map((task) =>
      task.id === id ? { ...task, priority } : task
    ));
  };

  const setTaskDueDate = (id, dueDate) => {
    setTasks(tasks.map((task) =>
      task.id === id ? { ...task, dueDate } : task
    ));
  };

  const clearCompleted = () => {
    setTasks(tasks.filter((task) => !task.completed));
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === 'active') return !task.completed;
    if (filter === 'completed') return task.completed;
    return true;
  }).filter((task) => {
    if (priorityFilter === 'high') return task.priority === 'high';
    if (priorityFilter === 'medium') return task.priority === 'medium';
    if (priorityFilter === 'low') return task.priority === 'low';
    return true;
  });

  return (
    <div className="App">
      <h1>📝 Task Manager</h1>
      <div className="input-section">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter new task..."
        />
        <button onClick={addTask}>Add</button>
      </div>

      <div className="filter-buttons">
        <button onClick={() => setFilter('all')}>All</button>
        <button onClick={() => setFilter('active')}>Active</button>
        <button onClick={() => setFilter('completed')}>Completed</button>
      </div>

      <div className="priority-filter">
        <label>Priority: </label>
        <select value={priorityFilter} onChange={(e) => setPriorityFilter(e.target.value)}>
          <option value="all">All</option>
          <option value="high">High</option>
          <option value="medium">Medium</option>
          <option value="low">Low</option>
        </select>
      </div>

      <div className="task-list">
        {filteredTasks.map((task) => (
          <Task
            key={task.id}
            task={task}
            toggleComplete={toggleComplete}
            deleteTask={deleteTask}
            startEditing={startEditing}
            saveEdit={saveEdit}
            cancelEdit={cancelEdit}
            setTaskPriority={setTaskPriority}
            setTaskDueDate={setTaskDueDate}
            editingId={editingId}
            editInput={editInput}
            setEditInput={setEditInput}
          />
        ))}
        {filteredTasks.length === 0 && <p>No tasks found</p>}
      </div>

      <button className="clear-completed" onClick={clearCompleted}>Clear Completed</button>
    </div>
  );
}

export default App;
