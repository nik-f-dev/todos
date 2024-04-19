import React, { useState } from 'react'
import {
  Box,
  Button,
  Container,
  Fab,
  List,
  TextField,
  Typography,
} from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import { TodoItem } from './TodoItem.tsx'

type Task = {
  id: number
  text: string
  completed: boolean
}

const initialTasks: Task[] = [
  {
    id: 1,
    text: 'Тестовое задание',
    completed: false,
  },
  {
    id: 2,
    text: 'Прекрасный код',
    completed: true,
  },
  {
    id: 3,
    text: 'Покрытие тестами',
    completed: false,
  },
]

const isTextTooShort = (text: string) => {
  return text.trim().length < 3
}

const TodoList: React.FC = () => {
  const [taskText, setTaskText] = useState('')
  const [tasks, setTasks] = useState(initialTasks)
  const [textError, setTextError] = useState(false)
  const [filter, setFilter] = useState('all')

  function addTask(text: string) {
    const newTask: Task = {
      id: Date.now(),
      text,
      completed: false,
    }
    setTasks([...tasks, newTask])
    setTaskText('')
  }

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newText = event.target.value
    setTaskText(newText)
    setTextError(isTextTooShort(newText))
  }

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && taskText.trim() !== '' && !textError) {
      addTask(taskText)
      setTaskText('')
    }
    if (event.key === 'Enter' && isTextTooShort(taskText)) {
      setTextError(true)
    }
  }

  function deleteTask(id: number) {
    setTasks(tasks.filter((task) => task.id !== id))
  }

  function toggleCompleted(id: number) {
    setTasks(
      tasks.map((task) => {
        if (task.id === id) {
          return { ...task, completed: !task.completed }
        } else {
          return task
        }
      }),
    )
  }

  const filteredTasks = tasks.filter((task) => {
    if (filter === 'all') {
      return true
    } else if (filter === 'active') {
      return !task.completed
    } else {
      return task.completed
    }
  })

  const clearCompleted = () => {
    const remainingTasks: Task[] = tasks.filter((task) => !task.completed)
    setTasks(remainingTasks)
  }

  const isAddButtonDisabled = isTextTooShort(taskText) || textError
  const activeTasksCount = tasks.filter((task) => !task.completed).length

  return (
    <Box
      sx={{
        bgcolor: 'rgb(245 245 245)',
        minHeight: 'calc(100vh - 30px)',
        maxWidth: '800px',
        margin: '0 auto',
        padding: '0 30px 30px',
      }}
    >
      <Typography
        variant='h1'
        component='h1'
        sx={{
          textAlign: 'center',
          marginBottom: '18px',
          fontSize: '4.4rem',
          color: '#757575',
        }}
      >
        todos
      </Typography>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          paddingLeft: '0px',
          position: 'relative',
        }}
      >
        <TextField
          id='add-field'
          label='What needs to be done?'
          variant='outlined'
          value={taskText}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          error={textError}
          helperText={
            isTextTooShort(taskText) && textError
              ? 'Minimum 3 characters required'
              : ''
          }
          sx={{
            width: '100%',
            backgroundColor: 'white',
            marginBottom: '1px',
          }}
        />
        <Fab
          color='default'
          aria-label='add'
          size='small'
          onClick={() => addTask(taskText)}
          disabled={isAddButtonDisabled}
          data-testid='button-add'
          sx={{
            position: 'absolute',
            right: '4px',
            top: '7px',
          }}
        >
          <AddIcon />
        </Fab>
      </Box>
      <List
        sx={{
          bgcolor: 'bisque',
          padding: '0',
        }}
        component='div'
        role='list'
      >
        {filteredTasks.map((task) => (
          <TodoItem
            key={task.id}
            task={task}
            deleteTask={deleteTask}
            toggleCompleted={toggleCompleted}
          />
        ))}
      </List>
      <Container
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          background: 'white',
          height: '50px',
        }}
      >
        <Typography
          sx={
            filter === 'completed' || activeTasksCount === 0
              ? { visibility: 'hidden', width: '200px' }
              : {
                  marginRight: '6px',
                  fontWeight: '500',
                  fontSize: '0.8125rem',
                  lineHeight: '1.75',
                  letterSpacing: '0.02857em',
                  textTransform: 'uppercase',
                  width: '200px',
                  textAlign: 'center',
                }
          }
        >
          <span
            style={{
              marginRight: '6px',
            }}
          >
            {activeTasksCount}
          </span>
          items left
        </Typography>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            width: '270px',
            padding: '0',
          }}
        >
          <Button
            sx={
              filter === 'all'
                ? {
                    border: '1px solid rgba(0, 0, 0, 0.23)',
                    color: '#1976d2',
                    background: 'rgb(245 245 245)',
                  }
                : { color: 'black' }
            }
            data-testid='button-all'
            variant='text'
            size='small'
            onClick={() => setFilter('all')}
          >
            All
          </Button>
          <Button
            sx={
              filter === 'active'
                ? {
                    border: '1px solid rgba(0, 0, 0, 0.23)',
                    color: '#1976d2',
                    background: 'rgb(245 245 245)',
                  }
                : { color: 'black' }
            }
            data-testid='button-active'
            variant='text'
            size='small'
            onClick={() => setFilter('active')}
          >
            Active
          </Button>
          <Button
            sx={
              filter === 'completed'
                ? {
                    border: '1px solid rgba(0, 0, 0, 0.23)',
                    color: '#1976d2',
                    background: 'rgb(245 245 245)',
                  }
                : { color: 'black' }
            }
            data-testid='button-completed'
            variant='text'
            size='small'
            onClick={() => setFilter('completed')}
          >
            Completed
          </Button>
        </Box>
        <Button
          data-testid='clear-completed-button'
          variant='text'
          size='small'
          onClick={clearCompleted}
          sx={{ color: 'black', width: '200px' }}
        >
          Clear completed
        </Button>
      </Container>
    </Box>
  )
}

export { TodoList }
