import React from 'react'
import DeleteIcon from '@mui/icons-material/Delete'
import {
  Checkbox,
  IconButton,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material'

interface TodoItemProps {
  task: {
    id: number
    text: string
    completed: boolean
  }
  deleteTask: (id: number) => void
  toggleCompleted: (id: number) => void
}

const TodoItem: React.FC<TodoItemProps> = ({
  task,
  deleteTask,
  toggleCompleted,
}) => {
  function handleChange() {
    toggleCompleted(task.id)
  }

  return (
    <ListItem
      sx={{
        backgroundColor: 'white',
        borderBottom: '1px solid rgba(0, 0, 0, 0.23)',
      }}
      secondaryAction={
        <IconButton
          edge='end'
          aria-label='delete'
          onClick={() => deleteTask(task.id)}
        >
          <DeleteIcon />
        </IconButton>
      }
      disablePadding
    >
      <ListItemButton onClick={handleChange}>
        <ListItemIcon>
          <Checkbox
            edge='start'
            checked={task.completed}
            disableRipple
            data-testid='checkbox-input'
          />
        </ListItemIcon>
        <ListItemText
          sx={
            task.completed
              ? {
                  textDecoration: 'line-through',
                  color: 'grey',
                  wordWrap: 'break-word',
                }
              : {
                  wordWrap: 'break-word',
                }
          }
        >
          {task.text}
        </ListItemText>
      </ListItemButton>
    </ListItem>
  )
}

export { TodoItem }
