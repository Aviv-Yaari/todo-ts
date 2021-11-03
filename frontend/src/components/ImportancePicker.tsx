import { Popover } from '@mui/material';
import { ImportanceEnum } from '../services/todo.service';

interface Props {
  anchorEl: HTMLElement | null;
  onClose: (event: {}, reason: 'backdropClick' | 'escapeKeyDown') => void;
  onSelect: Function;
}

export function ImportancePicker({ anchorEl, onClose, onSelect }: Props) {
  const renderOptions = () => {
    const options = [];
    for (const key in ImportanceEnum) {
      const item = ImportanceEnum[key];
      options.push(
        <div key={key} className="option" onClick={() => onSelect(key)}>
          {item}
        </div>
      );
    }
    return options;
  };

  return (
    <Popover open anchorEl={anchorEl} onClose={onClose}>
      <section className="importance-options">{renderOptions()}</section>
    </Popover>
  );
}
