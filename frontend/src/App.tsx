import './styles/main.scss';
import { AddTodo } from './components/AddTodo';
import { TodoList } from './components/TodoList';
import { useEffect, useState } from 'react';
import { Todo, todoService } from './services/todo.service';

export default function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);

  useEffect(() => {
    const loadTodos = async () => {
      try {
        const todos = await todoService.query();
        setTodos(todos);
      } catch (err) {
        console.error('Error in get todos:', err);
      }
    };
    loadTodos();
  }, []);

  const handleAddTodo = async (todo: Todo) => {
    try {
      const addedId = await todoService.add(todo);
      setTodos(prev => [...prev, { ...todo, _id: addedId }]);
    } catch (err) {
      console.error(err);
    }
  };

  const handleEdit = (id: string) => {
    setEditingId(id);
  };

  const handleSaveEdit = (todo: Todo) => {
    try {
      todoService.update(todo);
      setTodos(prev => prev.map(item => (item._id === todo._id ? todo : item)));
      setEditingId(null);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = (id: string) => {
    try {
      todoService.remove(id);
      setTodos(prev => prev.filter(todo => todo._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <h1>TodoApp</h1>
      <AddTodo onAddTodo={handleAddTodo} />
      <TodoList
        onEdit={handleEdit}
        onSaveEdit={handleSaveEdit}
        onDelete={handleDelete}
        todos={todos}
        editingId={editingId}
      />
    </>
  );
}
