import { Todo } from '../services/todo.service';
import { TodoDetails } from './TodoDetails';

interface Props {
  todos: Todo[];
  onEdit: Function;
  editingId: string | null;
  onSaveEdit: Function;
  onDelete: Function;
}
export function TodoList({ todos, onEdit, editingId, onSaveEdit, onDelete }: Props) {
  return (
    <section className="container">
      <h2>Tasks</h2>
      {todos?.length ? (
        <ul className="todo-list">
          {todos.map(todo => (
            <TodoDetails
              key={todo._id}
              todo={todo}
              isEdit={editingId === todo._id}
              onEdit={onEdit}
              onSaveEdit={onSaveEdit}
              onDelete={onDelete}
            />
          ))}
        </ul>
      ) : (
        <div>No tasks yet.</div>
      )}
    </section>
  );
}
