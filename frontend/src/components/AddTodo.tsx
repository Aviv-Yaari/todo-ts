import { Button, InputLabel } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import { useState } from 'react';
import { ImportanceEnum, TodoMini } from '../services/todo.service';
import { utilService } from '../services/util.service';

interface Props {
  onAddTodo: Function;
}

export function AddTodo({ onAddTodo }: Props) {
  const [values, setValues] = useState<TodoMini>({
    info: '',
    importance: 2,
  });

  const handleSubmit = (ev: React.FormEvent) => {
    ev.preventDefault();
    onAddTodo(values);
  };

  const handleChange = (ev: any) => {
    const { name, value } = ev.target;
    setValues(values => ({ ...values, [name]: value }));
  };

  const renderImportanceItems = () => {
    let res = [];
    for (const key in ImportanceEnum) {
      const value = ImportanceEnum[key];
      res.push(
        <MenuItem key={key} value={key.toString()}>
          {value}
        </MenuItem>
      );
    }
    return res;
  };

  return (
    <form className="add-todo container" onSubmit={handleSubmit}>
      <h2>Add a Task</h2>
      <TextField name="info" label="Info" value={values.info} onChange={handleChange} fullWidth required />
      <FormControl className="field" fullWidth margin="normal">
        <InputLabel id="importance">Importance</InputLabel>
        <Select
          name="importance"
          labelId="importance"
          label="Importance"
          required
          value={values.importance}
          onChange={handleChange}>
          {renderImportanceItems()}
        </Select>
      </FormControl>
      <Button type="submit" variant="outlined">
        Submit
      </Button>
    </form>
  );
}
