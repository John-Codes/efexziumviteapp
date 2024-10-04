import React, { useState, useEffect, useRef } from 'react';
import './TodoListSettings.css';

interface Todo {
  task: string;
  dueDate: string;
  priority: string;
  status: string;
  notes: string;
}

interface TodoListSettingsProps {
  todoListActive: boolean;
  setTodoListActive: React.Dispatch<React.SetStateAction<boolean>>;
}

const TodoListSettings: React.FC<TodoListSettingsProps> = ({ todoListActive, setTodoListActive }) => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState<Todo>({
    task: '',
    dueDate: 'this week',
    priority: '1',
    status: 'in progress',
    notes: '',
  });
  const [isSaving, setIsSaving] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const storedTodos = localStorage.getItem('todos');
    if (storedTodos) {
      setTodos(JSON.parse(storedTodos));
    }
  }, []);

  const handleAddTodo = () => {
    setTodos([...todos, newTodo]);
    setNewTodo({
      task: '',
      dueDate: 'this week',
      priority: '1',
      status: 'in progress',
      notes: '',
    });
  };

  const handleDeleteTodo = (index: number) => {
    const updatedTodos = todos.filter((_, i) => i !== index);
    setTodos(updatedTodos);
    localStorage.setItem('todos', JSON.stringify(updatedTodos));
  };

  const handleSaveLocally = () => {
    setIsSaving(true);
    localStorage.setItem('todos', JSON.stringify(todos));
    setTimeout(() => {
      setIsSaving(false);
    }, 1000); // Reset after 1 second
  };

  const handleExportCSV = () => {
    const csvContent = "data:text/csv;charset=utf-8," 
      + "Task,Due Date,Priority,Status,Notes\n"
      + todos.map(todo => 
          `"${todo.task}","${todo.dueDate}","${todo.priority}","${todo.status}","${todo.notes}"`
        ).join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "todos.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleImportCSV = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target?.result as string;
        const lines = content.split('\n');
        const newTodos: Todo[] = [];
        
        // Skip the header row
        for (let i = 1; i < lines.length; i++) {
          const values = lines[i].split(',').map(value => value.trim().replace(/^"|"$/g, ''));
          if (values.length === 5) {
            newTodos.push({
              task: values[0],
              dueDate: values[1],
              priority: values[2],
              status: values[3],
              notes: values[4]
            });
          }
        }
        
        setTodos(newTodos);
        localStorage.setItem('todos', JSON.stringify(newTodos));
      };
      reader.readAsText(file);
    }
  };

  return (
    <div className="setting-card">
      <h2 className="setting-title">Todo List</h2>
      <div className="toggle-container">
        <span className="toggle-label">Activate Todo List</span>
        <div className="switch-container">
          <label className="switch">
            <input
              type="checkbox"
              checked={todoListActive}
              onChange={() => setTodoListActive(!todoListActive)}
            />
            <span className="slider"></span>
          </label>
        </div>
      </div>
      <p className="setting-status">Todo List is {todoListActive ? 'ACTIVE' : 'INACTIVE'}</p>
      {todoListActive && (
        <div className="todo-list-container">
          <div className="todo-table-container">
            <table className="todo-table">
              <thead>
                <tr>
                  <th>Task</th>
                  <th>Due Date</th>
                  <th>Priority</th>
                  <th>Status</th>
                  <th>Notes</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {todos.map((todo, index) => (
                  <tr key={index}>
                    <td>{todo.task}</td>
                    <td>{todo.dueDate}</td>
                    <td>{todo.priority}</td>
                    <td>{todo.status}</td>
                    <td>{todo.notes}</td>
                    <td>
                      <button className="delete-button" onClick={() => handleDeleteTodo(index)}>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="todo-input-container">
            <input
              type="text"
              className="text-input"
              placeholder="Enter task"
              value={newTodo.task}
              onChange={(e) => setNewTodo({...newTodo, task: e.target.value})}
            />
            <select
              className="text-input"
              value={newTodo.dueDate}
              onChange={(e) => setNewTodo({...newTodo, dueDate: e.target.value})}
            >
              <option value="this week">This Week</option>
              <option value="next week">Next Week</option>
              <option value="this month">This Month</option>
              <option value="next month">Next Month</option>
            </select>
            <select
              className="text-input"
              value={newTodo.priority}
              onChange={(e) => setNewTodo({...newTodo, priority: e.target.value})}
            >
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
            <select
              className="text-input"
              value={newTodo.status}
              onChange={(e) => setNewTodo({...newTodo, status: e.target.value})}
            >
              <option value="in progress">In Progress</option>
              <option value="complete">Complete</option>
              <option value="blocked">Blocked</option>
            </select>
            <textarea
              className="text-input"
              placeholder="Add notes (optional)"
              value={newTodo.notes}
              onChange={(e) => setNewTodo({...newTodo, notes: e.target.value})}
            ></textarea>
            <div className="button-container">
              <button className="save-button" onClick={handleAddTodo}>Add Todo</button>
              <button 
                className={`save-button ${isSaving ? 'saving' : ''}`} 
                onClick={handleSaveLocally}
              >
                {isSaving ? 'Saved!' : 'Save to Local Storage'}
              </button>
              <button className="save-button" onClick={handleExportCSV}>Export to CSV</button>
              <input
                type="file"
                accept=".csv"
                style={{ display: 'none' }}
                ref={fileInputRef}
                onChange={handleImportCSV}
              />
              <button className="save-button" onClick={() => fileInputRef.current?.click()}>
                Import from CSV
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TodoListSettings;