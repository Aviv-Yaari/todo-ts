import EditIcon from '@mui/icons-material/Edit';
import { IconButton, ListItemIcon, ListItemText, Menu, MenuItem } from '@mui/material';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import EditOffIcon from '@mui/icons-material/EditOff';
import DeleteIcon from '@mui/icons-material/Delete';
import { useState } from 'react';

interface Props {
  onEdit: React.MouseEventHandler<HTMLButtonElement>;
  onDelete: React.MouseEventHandler<HTMLLIElement>;
  isEdit: Boolean;
}

export function TodoActions({ isEdit, onEdit, onDelete }: Props) {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const isOpen = Boolean(anchorEl);

  const handleOpenMenu = (ev: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    setAnchorEl(ev.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  return (
    <div className="actions">
      <IconButton className="btn-edit" onClick={onEdit}>
        {isEdit ? <EditOffIcon fontSize="small" /> : <EditIcon fontSize="small" />}
      </IconButton>
      <IconButton onClick={handleOpenMenu}>
        <MoreHorizIcon fontSize="small" />
      </IconButton>
      <Menu anchorEl={anchorEl} open={isOpen} onClose={handleCloseMenu}>
        <MenuItem onClick={onDelete}>
          <ListItemIcon>
            <DeleteIcon />
          </ListItemIcon>
          <ListItemText>Delete</ListItemText>
        </MenuItem>
      </Menu>
    </div>
  );
}
