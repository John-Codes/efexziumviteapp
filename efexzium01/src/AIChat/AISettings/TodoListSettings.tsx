import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
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
  const { t } = useTranslation();
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
    }, 1000);
  };

  const handleExportCSV = () => {
    const csvContent = "data:text/csv;charset=utf-8," 
      + `${t('todoList.task')},${t('todoList.dueDate')},${t('todoList.priority')},${t('todoList.status')},${t('todoList.notes')}\n`
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
      <h2 className="setting-title">{t('todoList.title')}</h2>
      <div className="toggle-container">
        <span className="toggle-label">{t('todoList.activate')}</span>
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
      <p className="setting-status">
        {t('todoList.status', { status: todoListActive ? t('todoList.active') : t('todoList.inactive') })}
      </p>
      {todoListActive && (
        <div className="todo-list-container">
          <div className="todo-table-container">
            <table className="todo-table">
              <thead>
                <tr>
                  <th>{t('todoList.task')}</th>
                  <th>{t('todoList.dueDate')}</th>
                  <th>{t('todoList.priority')}</th>
                  <th>{t('todoList.status')}</th>
                  <th>{t('todoList.notes')}</th>
                  <th>{t('todoList.action')}</th>
                </tr>
              </thead>
              <tbody>
                {todos.map((todo, index) => (
                  <tr key={index}>
                    <td>{todo.task}</td>
                    <td>{t(`todoList.dueDates.${todo.dueDate}`)}</td>
                    <td>{todo.priority}</td>
                    <td>{t(`todoList.statuses.${todo.status}`)}</td>
                    <td>{todo.notes}</td>
                    <td>
                      <button className="delete-button" onClick={() => handleDeleteTodo(index)}>
                        {t('todoList.delete')}
                      </button>
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
              placeholder={t('todoList.enterTask')}
              value={newTodo.task}
              onChange={(e) => setNewTodo({...newTodo, task: e.target.value})}
            />
            <select
              className="text-input"
              value={newTodo.dueDate}
              onChange={(e) => setNewTodo({...newTodo, dueDate: e.target.value})}
            >
              <option value="this week">{t('todoList.dueDates.this week')}</option>
              <option value="next week">{t('todoList.dueDates.next week')}</option>
              <option value="this month">{t('todoList.dueDates.this month')}</option>
              <option value="next month">{t('todoList.dueDates.next month')}</option>
            </select>
            <select
              className="text-input"
              value={newTodo.priority}
              onChange={(e) => setNewTodo({...newTodo, priority: e.target.value})}
            >
              {[1, 2, 3, 4, 5].map((priority) => (
                <option key={priority} value={priority.toString()}>{priority}</option>
              ))}
            </select>
            <select
              className="text-input"
              value={newTodo.status}
              onChange={(e) => setNewTodo({...newTodo, status: e.target.value})}
            >
              <option value="in progress">{t('todoList.statuses.in progress')}</option>
              <option value="complete">{t('todoList.statuses.complete')}</option>
              <option value="blocked">{t('todoList.statuses.blocked')}</option>
            </select>
            <textarea
              className="text-input"
              placeholder={t('todoList.addNotes')}
              value={newTodo.notes}
              onChange={(e) => setNewTodo({...newTodo, notes: e.target.value})}
            ></textarea>
            <div className="button-container">
              <button className="save-button" onClick={handleAddTodo}>{t('todoList.addTodo')}</button>
              <button 
                className={`save-button ${isSaving ? 'saving' : ''}`} 
                onClick={handleSaveLocally}
              >
                {isSaving ? t('todoList.saved') : t('todoList.saveToLocalStorage')}
              </button>
              <button className="save-button" onClick={handleExportCSV}>{t('todoList.exportToCSV')}</button>
              <input
                type="file"
                accept=".csv"
                style={{ display: 'none' }}
                ref={fileInputRef}
                onChange={handleImportCSV}
              />
              <button className="save-button" onClick={() => fileInputRef.current?.click()}>
                {t('todoList.importFromCSV')}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TodoListSettings;