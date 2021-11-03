import { TextField } from '@mui/material';
import { ImportanceEnum, Todo } from '../services/todo.service';
import { TodoActions } from './TodoActions';
import { Overlay } from './shared/Overlay';
import React, { useState } from 'react';
import { ImportancePicker } from './ImportancePicker';

interface Props {
  todo: Todo;
  isEdit: boolean;
  onEdit: Function;
  onSaveEdit: Function;
  onDelete: Function;
}

export function TodoDetails({ todo, isEdit, onEdit, onDelete, onSaveEdit }: Props) {
  const [info, setInfo] = useState(todo.info);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleOpenPicker = (ev: any) => {
    setAnchorEl(anchorEl ? null : ev.currentTarget);
  };

  const handleClosePicker = () => {
    setAnchorEl(null);
  };

  const handleSave = (field: {}) => {
    onSaveEdit({ ...todo, ...field });
    isPickerOpen && handleClosePicker();
  };

  const isPickerOpen = Boolean(anchorEl);

  return (
    <li className="todo-details">
      <div
        className={`importance importance-${todo.importance} ${isPickerOpen ? 'picker-open' : ''}`}
        onClick={handleOpenPicker}>
        <span>{ImportanceEnum[todo.importance]}</span>
      </div>
      {isEdit ? (
        <>
          <TextField
            className="info info-edit"
            size="small"
            value={info}
            onChange={ev => setInfo(ev.target.value)}
            onKeyPress={ev => ev.key === 'Enter' && handleSave({ info })}
          />
          <Overlay onClick={() => handleSave({ info })} />
        </>
      ) : (
        <span className="info">{todo.info}</span>
      )}
      <TodoActions isEdit={isEdit} onEdit={() => onEdit(todo._id)} onDelete={() => onDelete(todo._id)} />
      {isPickerOpen && (
        <ImportancePicker
          anchorEl={anchorEl}
          onClose={handleClosePicker}
          onSelect={(importance: string) => handleSave({ importance })}
        />
      )}
    </li>
  );
}
